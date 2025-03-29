import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { ChallengeModel, createChallenge, getChallenges, updateChallenge, getChallengeById } from "../models/challenges.model";
import { ProblemModel } from "@/models/problems.model";
import { getAccountbyClerkId } from "@/models/accounts.model";
import { SubmissionModel,getTopSubmissionByProblemAndClerkId } from "@/models/submissions.model";
import { getSumPointByProblemId } from "@/models/testcases.model";
import { VerifyModel } from "@/models/verifications.model";

export const ChallengeRoute = new Elysia({ prefix: "/verify" })
  .use(clerkPlugin())

  .get("/get/:itemid", async ({ params, auth, error }) => {
    try {
      //verify admin
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { itemid } = params;

      const item = VerifyModel.findById(itemid);
      if(!item){
        return error(404, "item not found");
      }

      return {
        status: 200,
        message: "success",
        item:item
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
    {
      params: t.Object({
        itemid:t.String(),
      }),
    }
  )

  .get("/gets", async ({ auth, error }) => {
    try {
      //verify admin
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const items = VerifyModel.find({status:"pending"});

      if(!items){
        return error(404, "item not found");
      }

      return {
        status: 200,
        message: "success",
        items:items
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
    {
      params: t.Object({
        itemid:t.String(),
      }),
    }
  )