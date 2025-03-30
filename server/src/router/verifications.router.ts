import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { ChallengeModel } from "../models/challenges.model";
import { ProblemModel } from "@/models/problems.model";
import { AccountModel, getAccountbyClerkId } from "@/models/accounts.model";
import { createVerify, getVerifies } from "@/models/verifications.model";
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
          username: account.username,
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

  .get("/history", async ({ auth, error }) => {
    try {
      //verify admin
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }
      const user = await AccountModel.findOne({ clerkId: auth.userId, role: "admin" });
      if (!user) {
        return error(401, "Unauthorized");
      }

      const verifies = await getVerifies();

      if (!verifies) {
        return error(404, "verifies not found");
      }

      const result = await Promise.all(verifies.map(async (v) => {

        const problem = await ProblemModel.findById(v.problemId);
        if (!problem) {
          return
        }

        const account = await getAccountbyClerkId(v?.verifiyby);

        if (!account) {
          return
        }

        return {
          _id: v._id,
          problemName: problem.title,
          verifiyby: account.username,
          detail: v.detail,
          success: v.success,
          createdAt: v.createdAt,
          updatedAt: v.updatedAt,
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
      const challenges = await ChallengeModel.countDocuments({ viewer: "public", status: "active" });

      return {
        status: 200,
        message: "success",
        problems: problems || 0,
        users: users || 0,
        challenges: challenges || 0
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
        const tempproblem = await ProblemModel.findById(problemId);

        if (!tempproblem) {
          return error(404, "problem not found");
        }

        const viewer = tempproblem.viewer == "private" ? "public" : "challenge";

        const updateproblem = await ProblemModel.findByIdAndUpdate(problemId, { viewer: viewer, status: "active" })


        if (!updateproblem) {
          return error(404, "update problem error");
        }

        if (viewer == "public") {
          const emails = await AccountModel.find({ clerkId: { $in: userproblem.followers }, status: "active" })
          emails.map((user) => {
            sendNotification(user.email, "New problem", `<p>ผู้ใช้ ${userproblem.username} ได้ทำการอัพโหลด Problem : ${problem.title} ใหม่แล้ว รีบเข้ามาดูเร็ว<p>`)
          })
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