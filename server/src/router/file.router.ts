import { Elysia } from 'elysia';

import { fileExtension } from '@lib/utils';
import { join } from 'node:path';
import { clerkPlugin } from "elysia-clerk";
import {getFileByProblemId} from "@/models/problems.model";

export const fileRoute = new Elysia({ prefix: '/file' })
    // .use(clerkPlugin())
    .get('docs/:problemId', async ({ params: { problemId }, set}) => {

        // if (!auth?.userId) {
        //     return { msg: 'Unauthorized' }
        // }

        const file = await getFileByProblemId(problemId);

        if (!file) {
            return { msg : 'file not found' }
        }

        const path = join(
            '.',
            'uploads',
            'problems',
            'docs',
            `${problemId}.${fileExtension[file.type]}`
        );

        const fileContent = Bun.file(path);
        set.headers['Content-Type'] = file.type;
        return fileContent;
    });