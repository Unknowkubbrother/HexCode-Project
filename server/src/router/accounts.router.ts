import { Elysia } from 'elysia';
import { clerkPlugin, WebhookEvent} from "elysia-clerk";
import { createAccount,getAccountbyClerkId , updateAccount , deleteAccount} from "@/models/accounts.model";

export const AccountRoute = new Elysia({ prefix: '/account' })
    .use(clerkPlugin())
    .post('webhookCreate', async (context) => {
        const webhook : WebhookEvent = await context.request.json();
        const { data } : any = webhook;
        const UserData = {
            clerkId: String(data.id),
            username: String(data.username),
            email: String(data.email_addresses.email_address),
            avatar: String(data.avatar),
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
        const webhook : WebhookEvent = await context.request.json();
        const {data} : any = webhook;

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
            email: String(data.email_addresses.email_address),
            avatar: String(data.avatar),
            status: Boolean(data.banned) ? "banned" : "active",
        }

        const updatedData = await updateAccount(String(data.id),UserData);

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
        const webhook : WebhookEvent = await context.request.json();
        const {data} : any = webhook;

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
    });