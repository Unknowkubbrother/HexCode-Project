import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createChallenge } from "../models/challenges.model";
import { ProblemModel } from "@/models/problems.model";

export const ChallengeRoute = new Elysia({ prefix: "/challenge" })
  .use(clerkPlugin())

  .post("/create", async ({ body, auth, error }) => {
    try {

      console.log(body);
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { title, description, thumbnail, images, problem, viewer, reward, startTime, endTime } = body;

      if (startTime < Date.now() || startTime > Date.now() || endTime < Date.now() || endTime > Date.now()) {
        return error(404, "Invalid Time");
      }

      if (startTime > endTime) {
        return error(404, "Invalid Time");
      }

      if (viewer !== "public" && viewer !== "private") {
        return error(404, "Invalid Viewer");
      }

      const problemcount = await ProblemModel.countDocuments({ _id: { $in: problem }, status: "active" , clerkId: auth.userId });
      
      if (problemcount != problem.length&&problemcount>30) {
        return error(404, "problem incorrect");
      }

      const challengeCreated = await createChallenge({
        clerkId: auth.userId,
        title,
        description,
        thumbnail,
        images,
        problem,
        viewer,
        ...(viewer == "private" && {
          secret_code: Math.random().toString(36).substring(2, 8),
        }),
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

      console.log(body);
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { title, description, thumbnail, images, problem, viewer, reward, startTime, endTime } = body;

      if (startTime < Date.now() || startTime > Date.now() || endTime < Date.now() || endTime > Date.now()) {
        return error(404, "Invalid Time");
      }

      if (startTime > endTime) {
        return error(404, "Invalid Time");
      }

      if (viewer !== "public" && viewer !== "private") {
        return error(404, "Invalid Viewer");
      }

      const problemcount = await ProblemModel.countDocuments({ _id: { $in: problem }, status: "active" , clerkId: auth.userId });
      
      if (problemcount != problem.length&&problemcount>30) {
        return error(404, "problem incorrect");
      }

      const challengeCreated = await createChallenge({
        clerkId: auth.userId,
        title,
        description,
        thumbnail,
        images,
        problem,
        viewer,
        ...(viewer == "private" && {
          secret_code: Math.random().toString(36).substring(2, 8),
        }),
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
  );