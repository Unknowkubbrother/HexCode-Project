import { Elysia, t } from 'elysia';
import { clerkPlugin, WebhookEvent } from "elysia-clerk";
import { createAccount, getAccountbyClerkId, updateAccount, deleteAccount, getAccounts } from "@/models/accounts.model";

export const AccountRoute = new Elysia({ prefix: '/account' })
    .use(clerkPlugin())

    .get("gets", async ({ error, auth }) => {
        try {

            if (!auth?.userId) {
                return error(401, "Unauthorized");
            }

            const account = await getAccountbyClerkId(auth.userId);

            if (!account) {
                return error(404, "Account not found");
            }


            if (account.role !== "admin") {
                return error(403, "Unauthorized");
            }

            if (account.status !== "active") {
                return error(403, "Account is banned");
            }

            const accounts = await getAccounts();

            return {
                accounts: accounts.map((account) => ({
                    clerkId: account.clerkId,
                    username: account.username,
                    email: account.email,
                    avatar: account.avatar,
                    status: account.status,
                    role: account.role,
                })),
                status: 200,
                msg: "Get accounts successfully",
            }

        } catch (e) {
            console.log(e);
            return error(500, "Internal Server Error");
        }
    })

    .post('webhookCreate', async (context) => {
        const webhook: WebhookEvent = await context.request.json();
        const { data }: any = webhook;
        const UserData = {
            clerkId: String(data.id),
            username: String(data.username),
            email: String(data.email_addresses[0].email_address),
            avatar: String(data.image_url),
        }

        const account = await createAccount(UserData);

        if (!account) {
            context.set.status = 400;
            return {
                message: "Account created failed",
                status: 400
            };
        }


        context.set.status = 201;
        return {
            msg: "Account created successfully",
            status: 201
        };

    })

    .post('webhookUpdate', async (context) => {
        const webhook: WebhookEvent = await context.request.json();
        const { data }: any = webhook;

        const account = await getAccountbyClerkId(String(data.id));

        if (!account) {
            context.set.status = 404;
            return {
                message: "Account not found",
                status: 404
            };
        }

        const UserData = {
            clerkId: String(data.id),
            username: String(data.username),
            email: String(data.email_addresses[0].email_address),
            avatar: String(data.image_url),
            status: Boolean(data.banned) ? "banned" : "active",
        }

        const updatedData = await updateAccount(String(data.id), UserData);

        if (!updatedData) {
            context.set.status = 400;
            return {
                message: "Account updated failed",
                status: 400
            };
        }

        context.set.status = 200;
        return {
            msg: "Account updated successfully",
            status: 200
        };
    })

    .post('webhookDelete', async (context) => {
        const webhook: WebhookEvent = await context.request.json();
        const { data }: any = webhook;

        const account = await getAccountbyClerkId(String(data.id));

        if (!account) {
            context.set.status = 404;
            return {
                message: "Account not found",
                status: 404
            };
        }

        const deletedData = await deleteAccount(String(data.id));

        if (!deletedData) {
            context.set.status = 400;
            return {
                message: "Account delete failed",
                status: 400
            };
        }

        context.set.status = 200;
        return {
            msg: "Account deleted successfully",
            status: 200
        };
    })

    .put('updateAccount', async ({ body, error, auth, clerk }) => {

        if (!auth?.userId) {
            return error(401, "Unauthorized");
        }

        const { clerkId, username, email, role, status, avatar } = body;

        const account = await getAccountbyClerkId(String(clerkId));

        if (!account) {
            return error(404, "Account not found");
        }

        const UserData = {
            clerkId: String(clerkId),
            avatar: String(avatar),
            username: String(username),
            email: String(email),    
            status: String(status),
            role: String(role),
        }

        const updatedData = await updateAccount(String(clerkId), UserData);

        if (!updatedData) {
            return error(400, "Account updated failed");
        }

        if (UserData.status === "banned") {
            await clerk.users.banUser(clerkId);
        }

        if (UserData.status === "active") {
            await clerk.users.unbanUser(clerkId);
        }
        
        return {
            msg: "Account updated successfully",
            status: 200
        };
    }, {
        body: t.Object({
            clerkId: t.String(),
            avatar: t.String(),
            username: t.String(),
            email: t.String(),
            role: t.String(),
            status: t.String(),
        }),
    });