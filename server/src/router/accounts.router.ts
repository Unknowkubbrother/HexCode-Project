import { Elysia } from 'elysia';
import { clerkPlugin, WebhookEvent} from "elysia-clerk";
export const AccountRoute = new Elysia({ prefix: '/account' })
    .use(clerkPlugin())
    .post('create', async (context) => {
        const webhook : WebhookEvent = await context.request.json();
        console.log(webhook);
        return { msg: 'account webhook!' }
        // if (!auth?.userId) {
        //     return { msg: 'Unauthorized' }
        // }

        
    });