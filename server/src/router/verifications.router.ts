import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { ChallengeModel } from "../models/challenges.model";
import { getProblemById, ProblemModel } from "@/models/problems.model";
import { AccountModel, getAccountbyClerkId } from "@/models/accounts.model";
import { createVerify } from "@/models/verifications.model";
import { IVerify } from "@/interface/verifications.interface";
import { sendNotification } from "@lib/resendEmail";
import { getTestCasesByProblemId } from "@/models/testcases.model";
import { join } from 'node:path';

export const VerifyRoute = new Elysia({ prefix: "/verify" })
  .use(clerkPlugin())

  .get("/gets", async ({ auth, error }) => {
    try {
      //verify admin
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const user = await AccountModel.findOne({ clerkId: auth.userId, role: "admin" });

      if (!user) {
        return error(401, "Unauthorized");
      }

      const problems = await ProblemModel.find({ status: "pending" });

      if (!problems) {
        return error(404, "problems not found");
      }



      const result = await Promise.all(problems.map(async (problem) => {
        const account = await getAccountbyClerkId(problem.clerkId);

        if (!account) {
          return
        }

        const testcase = await getTestCasesByProblemId(problem._id.toString());

        if (!testcase) {
          return;
        }

        const path = join(
          '.',
          'uploads',
          'problems',
          'source_code',
          `${problem._id}.${problem.source_code.name.split('.').pop()}`
        );

        const source_code_Content = Bun.file(path);
        const source_code = await source_code_Content.text();

        if (!source_code) {
          return;
        }

        return {
          username : account.username,
          _id: problem._id,
          title: problem.title,
          description: problem.description,
          difficulty: problem.difficulty,
          status: problem.status,
          cpu_time_limit: problem.cpu_time_limit,
          memory_limit: problem.memory_limit,
          stack_limit: problem.stack_limit,
          max_file_size: problem.max_file_size,
          updatedAt: problem.updatedAt,
          createdAt: problem.createdAt,
          testcase: testcase,
          source_code: source_code,
        }
      }))

      return {
        status: 200,
        message: "success",
        result: result
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  }
  )

  .get("/status", async ({ auth, error }) => {
    try {
      //verify admin
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }
      const user = await AccountModel.findOne({ clerkId: auth.userId, role: "admin" });
      if (!user) {
        return error(401, "Unauthorized");
      }

      const problems = await ProblemModel.countDocuments({ viewer: "public", status: "active" });
      const users = await AccountModel.countDocuments({ status: "active" });
      const challenges = await ChallengeModel.countDocuments({ viewer: "public", status: "active" })

      if (!problems || !users || !challenges) {
        return error(404, "error cant count");
      }

      return {
        status: 200,
        message: "success",
        problems: problems,
        users: users,
        challenges: challenges
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  }
  )

  .post("/verifyproblem", async ({ body, auth, error }) => {
    try {
      //verify admin
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }
      const user = await AccountModel.findOne({ clerkId: auth.userId, role: "admin" });
      if (!user) {
        return error(401, "Unauthorized");
      }

      const { problemId, success, detail } = body;

      const problem = await ProblemModel.findById(problemId);

      if (!problem) {
        return error(404, "problem not found");
      }
      const userproblem = await getAccountbyClerkId(problem.clerkId);

      if (!userproblem) {
        return error(404, "user not found");
      }
      if (success) {
        const updateproblem = await ProblemModel.findByIdAndUpdate(problemId, { viewer: "public", status: "active" })

        if (!updateproblem) {
          return error(404, "update problem error");
        }

        sendNotification(userproblem.email, "Verify problem", `<p>เราขอแสดงความยินดีด้วย problem:${problem.title} ของคุณได้เข้าสู่สถานะ public แล้ว<br>เนื่องจาก<br>${detail}<br>ขอบคุณจาก HexCode</p>`)
      } else {
        
        const updateproblem = await ProblemModel.findByIdAndUpdate(problemId, { viewer: "private", status: "active" })
        
        if (!updateproblem) {
          return error(404, "update problem error");
        
        }
        sendNotification(userproblem.email, "Verify problem", `<p>เราขอแสดงความเสียใจด้วยเราไม่สามารถนำ problem: ${problem.title} ของคุณเข้าสู่สถานะ public ได้<br>เนื่องจาก<br>${detail}<br>ขอบคุณจาก HexCode</p>`)
      }

      const value: IVerify = { problemId: problemId, verifiyby: user.clerkId, detail: detail, success: Boolean(success) }
      
      const verify = await createVerify(value)
      
      if (!verify) {
        return error(404, "verify error");
      }

      return {
        status: 200,
        message: "success"
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
    {
      body: t.Object({
        problemId: t.String(),
        detail: t.String(),
        success: t.Boolean()
      }),
    }
  )