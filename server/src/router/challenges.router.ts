import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { ChallengeModel, createChallenge, getChallenges, updateChallenge, getChallengeById } from "../models/challenges.model";
import { ProblemModel } from "@/models/problems.model";
import { getAccountbyClerkId } from "@/models/accounts.model";
import { SubmissionModel,getTopSubmissionByProblemAndClerkId } from "@/models/submissions.model";
import { getSumPointByProblemId } from "@/models/testcases.model";

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

      if (viewer !== "public" && viewer !== "private") {
        return error(404, "Invalid Viewer error");
      }

      const problemcount = await ProblemModel.countDocuments({ _id: { $in: problem }, status: "active", clerkId: auth?.userId });

      if (problemcount != problem.length && problemcount > 30) {
        return error(404, "problem incorrect");
      }
      let key
      let getkey

      do {
        key = Math.random().toString(36).substring(2, 8)
        getkey = await ChallengeModel.find({ secret_code: key, status: "active" })
      } while (getkey.length >= 1)

      const challengeCreated = await createChallenge({
        clerkId: auth?.userId,
        title,
        description,
        thumbnail,
        images,
        problem,
        viewer,
        secret_code: key,
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
        reward: t.Optional(t.Array(t.String())),
        startTime: t.Number(),
        endTime: t.Number(),
      }),
    }
  )

  .post("/update", async ({ body, auth, error }) => {
    try {

      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { challengeId, title, description, thumbnail, images, problem, viewer, reward, startTime, endTime } = body;

      if (startTime < Date.now() || endTime < startTime) {
        return error(404, "Invalid Time");
      }

      if (viewer !== "public" && viewer !== "private") {
        return error(404, "Invalid Viewer");
      }

      const challenge = await getChallengeById(challengeId);

      if (!challenge) {
        return error(404, "Not found challenge");
      }

      if (challenge.clerkId !== auth.userId) {
        return error(401, "Unauthorized");
      }


      const challengeUpdated = await updateChallenge(challengeId, {
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


      if (!challengeUpdated) {
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
        challengeId: t.String(),
        title: t.String(),
        description: t.String(),
        thumbnail: t.String(),
        images: t.Array(t.String()),
        problem: t.Array(t.String()),
        viewer: t.String(),
        reward: t.Optional(t.Array(t.String())),
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

      const filterChallengeEndTime = challenges.filter((challenge) => challenge.endTime > Date.now());

      if (!filterChallengeEndTime) {
        return error(404, "List Challenge Error");
      }

      const account = await getAccountbyClerkId(auth.userId);

      if (!account) {
        return error(404, "Account not found");
      }

      const filterChallenges = filterChallengeEndTime.map((challenge) => {
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

  .get("/getedit/:challengeId", async ({ params, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { challengeId } = params;

      let challenge = await getChallengeById(challengeId);

      if (!challenge) {
        return error(404, "Not found challenge");
      }

      if (challenge.clerkId !== auth.userId) {
        return error(401, "Unauthorized");
      }

      return {
        status: 200,
        message: "GET EDIT Challenge Success",
        result : challenge
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
    {
      params: t.Object({
        challengeId: t.String(),
      }),
    })

  .get("/get/:challengeId", async ({ params, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { challengeId } = params;

      let challenge = await getChallengeById(challengeId);

      if (!challenge) {
        return error(404, "Not found challenge");
      }

      if (challenge.endTime < Date.now()) {
        return error(404, "This challenge is ended");
      }

      const isJoined = challenge.player?.includes(auth.userId);

      challenge.player = challenge.player ? await Promise.all(challenge.player.map(async (player) => {
        const account = await getAccountbyClerkId(String(player));
        if (!account) {
          return null;
        }
        return {
          clerkId: account.clerkId,
          username: account.username,
          avatar: account.avatar,
        };
      })) : [];


      challenge.problem = challenge.problem ? await Promise.all(challenge.problem.map(async (problem) => {
        const problemData = await ProblemModel.findOne({ _id: problem, status: "active" });
        const points = await getSumPointByProblemId(problem);
        const myPoints = await getTopSubmissionByProblemAndClerkId(problem, auth.userId);
        if (!problemData) {
          return null;
        }
        return {
          problemId: problemData._id,
          title: problemData.title,
          difficulty: problemData.difficulty,
          points: points[0]?.total || 0,
          solved: (Number(myPoints?.points || 0) == Number(points[0]?.total || 0)) ? 1 : 0,
        };

      })) : [];

      return {
        status: 200,
        message: "List Challenge Success",
        result: {
          _id: challenge._id,
          title: challenge.title,
          description: challenge.description,
          thumbnail: challenge.thumbnail,
          images: challenge.images,
          problem: challenge.problem,
          viewer: challenge.viewer,
          reward: challenge.reward,
          startTime: challenge.startTime,
          endTime: challenge.endTime,
          player: challenge.player,
        },
        isJoined: isJoined,
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
    {
      params: t.Object({
        challengeId: t.String(),
      }),
    })


  .get("/isJoined/:challengeId", async ({ params, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { challengeId } = params;

      let challenge = await getChallengeById(challengeId);

      if (!challenge) {
        return error(404, "Not found challenge");
      }

      const isJoined = challenge.player?.includes(auth.userId);

      return {
        status: 200,
        isJoined: isJoined,
      }

    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
  },
    {
      params: t.Object({
        challengeId: t.String(),
      }),
    })

  .get("/remove/:id", async ({ params, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { id } = params;

      const challenge = await ChallengeModel.findOne({ _id: id, clerkId: auth.userId, status: "active" })

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

  .post("/join/:id", async ({ params, auth, error, body }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { id } = params;

      const challenge = await ChallengeModel.findOne({ _id: id, status: "active" });

      if (!challenge) {
        return error(404, "challenge not found");
      }

      if (challenge.viewer === "private" && challenge.secret_code !== body.secret_code) {
        return error(404, "Invalid Secret Code");
      }

      if (challenge.viewer === "private" && challenge.secret_code !== body.secret_code) {
        return error(404, "Invalid Secret Code");
      }

      if (challenge.endTime < Date.now()) {
        return error(404, "This challenge is ended");
      }

      if (challenge.player?.includes(auth.userId)) {
        return error(404, "You joined this challenge");
      }

      if (challenge.startTime < Date.now()) {
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
      body: t.Object({
        secret_code: t.Optional(t.String())
      }),
    })

  .post("/leave/:id", async ({ params, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { id } = params;
      const challenge = await ChallengeModel.findOne({ _id: id, player: { $in: auth.userId }, status: "active" })

      if (!challenge) {
        return error(404, "challenge not found");
      }
      if (challenge.endTime < Date.now()) {
        return error(404, "This challenge is ended");
      }
      if (challenge.startTime < Date.now()) {
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
    })

  .get("/leaderboard/:id", async ({ params, auth, error }) => {
    try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }
      const { id } = params;
      const challenge = await ChallengeModel.findOne({ _id: id, status: "active" })
      if (!challenge) {
        return error(404, "challenge not found");
      }

      let result = await SubmissionModel.aggregate([
        {
          $match: {
            clerkId: { $in: challenge.player },
            problemId: { $in: challenge.problem }
          }
        },
        {
          $group: {
            _id: { clerkId: "$clerkId", problemId: "$problemId" },
            maxScore: { $max: "$points" }
          }
        },
        {
          $group: {
            _id: "$_id.clerkId",
            total: { $sum: "$maxScore" }
          }
        },
        {
          $sort: { total: -1 }
        },
        {
          $project: {
            clerkId: "$_id",
            total: 1,
            _id: 0
          }
        }
      ]);

      result = await Promise.all(result.map(async (item) => {
        const account = await getAccountbyClerkId(item.clerkId);
        if (!account) {
          return null;
        }

        return {
          clerkId: account.clerkId,
          username: account.username,
          avatar: account.avatar,
          total: item.total,
        }

      }));

      return {
        status: 200,
        result: result,
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