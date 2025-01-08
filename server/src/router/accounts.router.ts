import { Elysia } from 'elysia';
import { clerkPlugin, WebhookEvent} from "elysia-clerk";
import { createAccount } from "@/models/accounts.model";
export const AccountRoute = new Elysia({ prefix: '/account' })
    .use(clerkPlugin())
    .post('create', async (context) => {
        const webhook : WebhookEvent = await context.request.json();
        const { data } = webhook;
        //@ts-ignore
        const UserData = {
            clerkId: data.id,
            //@ts-ignore
            username: data.username,
            //@ts-ignore
            email: data.email_addresses,
            //@ts-ignore
            avatar: data.image_url,
        }

        console.log(UserData);

        return { message: "Account created successfully"};
        
    })

    .post('update', async (context) => {
        const webhook : WebhookEvent = await context.request.json();

        console.log("Update Account", webhook.data);
    })

    .post('delete', async (context) => {
        const webhook : WebhookEvent = await context.request.json();

        console.log("Delete Account", webhook.data);

    });