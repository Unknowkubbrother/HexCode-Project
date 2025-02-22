import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { ChallengeModel, createChallenge , getChallenges, updateChallenge } from "../models/challenges.model";
import { ProblemModel } from "@/models/problems.model";
import {getAccountbyClerkId} from "@/models/accounts.model";

export const ChallengeRoute = new Elysia({ prefix: "/challenge" })
  .use(clerkPlugin())

  .post("/create", async ({ body, auth, error }) => {
    try {

      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { title, description, thumbnail, images, problem, viewer, reward, startTime, endTime } = body;

      if (startTime < Date.now() || endTime < startTime) {
        return error(404, "Invalid Time");
      }

      console.log("pass");

      if (viewer !== "public" && viewer !== "private") {
        return error(404, "Invalid Viewer error");
      }

      const problemcount = await ProblemModel.countDocuments({ _id: { $in: problem }, status: "active" , clerkId: auth?.userId});
      
      if (problemcount != problem.length && problemcount>30) {
        return error(404, "problem incorrect");
      }
      let key
      let getkey

      do{
        key = Math.random().toString(36).substring(2, 8)
        getkey = await ChallengeModel.find({secret_code:key,status:"active"})
      }while(getkey.length>=1)

      const challengeCreated = await createChallenge({
        clerkId: auth?.userId,
        title,
        description,
        thumbnail,
        images,
        problem,
        viewer,
        secret_code:key,
        ...(reward && {
          reward
        }),
        startTime,
        endTime,
      });


      if (!challengeCreated) {
        return error(404, "create challenge error");
      }

      return {
        status: 200,
        message: "Create Challenge Success",
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
  {
    body: t.Object({
      title: t.String(),
      description: t.String(),
      thumbnail: t.String(),
      images: t.Array(t.String()),
      problem: t.Array(t.String()),
      viewer: t.String(),
      reward: t.Optional(t.Array(t.Number())),
      startTime: t.Number(),
      endTime: t.Number(),
    }),
  }
  )

  .post("/edit", async ({ body, auth, error }) => {
    try {

      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { challengeId,title, description, thumbnail, images, problem, viewer, reward, startTime, endTime } = body;

      if (startTime < Date.now() || endTime < startTime) {
        return error(404, "Invalid Time");
      }

      if (viewer !== "public" && viewer !== "private") {
        return error(404, "Invalid Viewer");
      }

      const problemcount = await ProblemModel.countDocuments({ _id: { $in: problem }, status: "active" , clerkId: "user_2rUiuozLxAsIaUw4LzORMyu5ZtJ" });
      
      if (problemcount != problem.length && problemcount > 30) {
        return error(404, "problem incorrect");
      }

      const challengecheck = await ChallengeModel.find({clerkId:auth.userId,_id:challengeId})
      if(!challengecheck.length){
        return error(404, "cant find challenge");
      }

      const challengeCreated = await updateChallenge(challengeId,{
        title,
        description,
        thumbnail,
        images,
        problem,
        viewer,
        ...(reward && {
          reward
        }),
        startTime,
        endTime,
      });


      if (!challengeCreated) {
        return error(404, "edit challenge error");
      }

      return {
        status: 200,
        message: "Edit Challenge Success",
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
  {
    body: t.Object({
      challengeId:t.String(),
      title: t.String(),
      description: t.String(),
      thumbnail: t.String(),
      images: t.Array(t.String()),
      problem: t.Array(t.String()),
      viewer: t.String(),
      reward: t.Optional(t.Array(t.Number())),
      startTime: t.Number(),
      endTime: t.Number(),
    }),
  })

  .get("/gets", async ({ auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const challenges = await getChallenges();

      if (!challenges) {
        return error(404, "List Challenge Error");
      }

      const account = await getAccountbyClerkId(auth.userId);

      if (!account) {
        return error(404, "Account not found");
      }

      const filterChallenges = challenges.map((challenge) => {
        return {
           _id: challenge._id,
           avatar: account.avatar,
            username: account.username,
            title: challenge.title,
            thumbnail: challenge.thumbnail,
            countPlayer: challenge.player?.length || 0,
            createdAt: challenge.createdAt,
            updatedAt: challenge.updatedAt,
        }
      });


      return {
        status: 200,
        message: "List Challenge Success",
        result: filterChallenges,
      }
      
    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  })

  .get("/remove/:id", async ({ params,auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { id } = params;

      const challenge = await ChallengeModel.findOne({_id:id,clerkId:auth.userId,status:"active"})

      if (!challenge) {
        return error(404, "challenge not found");
      }

      const challengeUpeate = await ChallengeModel.findByIdAndUpdate(id, { status: "deleted" });
      if (!challengeUpeate) {
        return error(404, "remove error");
      }


      return {
        status: 200,
        message: "Remove Challenge Success",
      }
      
    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  })

  .get("/join/:id", async ({ params,auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { id } = params;

      const challenge = await ChallengeModel.findOne({_id:id,status:"active"})
      
      if (!challenge) {
        return error(404, "challenge not found");
      }
      if(challenge.endTime<Date.now()){
        return error(404, "This challenge is ended");
      }
      if (challenge.player?.find(id=>id==auth.userId)) {
        return error(404, "You joined this challenge");
      }
      if(challenge.startTime<Date.now()){
        return error(404, "This challenge is started");
      }

      const challengeUpeate = await ChallengeModel.findByIdAndUpdate(id, { $push: { player: auth.userId } });
      if (!challengeUpeate) {
        return error(404, "join error");
      }

      return {
        status: 200,
        message: "Join Challenge Success",
      }
      
    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  })

  .get("/leave/:id", async ({ params,auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { id } = params;
      const challenge = await ChallengeModel.findOne({_id:id,player: {$in:auth.userId},status:"active"})
      
      if (!challenge) {
        return error(404, "challenge not found");
      }
      if(challenge.endTime<Date.now()){
        return error(404, "This challenge is ended");
      }
      if(challenge.startTime<Date.now()){
        return error(404, "This challenge is started");
      }

      const challengeUpeate = await ChallengeModel.findByIdAndUpdate(id, { $pull: { player: auth.userId } });
      if (!challengeUpeate) {
        return error(404, "leave error");
      }

      return {
        status: 200,
        message: "Leave Challenge Success",
      }
      
    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  });