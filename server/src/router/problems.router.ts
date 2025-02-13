import { Elysia, t } from "elysia";
import { clerkPlugin } from "elysia-clerk";
import { createProblem,updateProblem,getProblemById,ProblemModel} from "@/models/problems.model";
import { getSubmitbyClerkId } from "@/models/submissions.model";
import { getSumPointByProblemId} from "@/models/testcases.model";
import { toArray } from "lodash";
import { fileExtension } from "@lib/utils";
import {getTopSubmissionByProblemAndClerkId } from "@/models/submissions.model";

/**
 * @description ProblemRoute
 */
export const ProblemRoute = new Elysia({ prefix: "/problem" })
  .use(clerkPlugin())

  /**
   * @description create problem
   */
  .post("/create", async ({ body, auth, error }) => {
      try {

        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const { title, description, difficulty,viewer, type, docs, hint , source_code, cpu_time_limit, memory_limit, stack_limit,max_file_size } = body;


        if (docs.type !== "application/pdf") {
          return error(400, "docs must be a pdf file");
        }

        const problemCreated = await createProblem({
          clerkId: auth.userId,
          title: title,
          description: description,
          viewer: viewer,
          difficulty: Number(difficulty),
          type: toArray(JSON.parse(type)),
          hint: toArray(JSON.parse(hint)),
          ...(cpu_time_limit && { cpu_time_limit: Number(cpu_time_limit) }),
          ...(memory_limit && { memory_limit: Number(memory_limit) }),
          ...(stack_limit && { stack_limit: Number(stack_limit) }),
          ...(max_file_size && { max_file_size: Number(max_file_size) }),
        });

        if (!problemCreated) {
          return error(404, "create problem error");
        }

        const id = problemCreated._id.toString();

        const docsData = {
          name: docs.name,
          size: docs.size,
          type: docs.type,
          pathName: `./uploads/problems/docs/${id}.${fileExtension[docs.type]}`,
        }

        const source_codeData = {
          name: source_code.name,
          size: source_code.size,
          type: source_code.type,
          pathName: `./uploads/problems/source_code/${id}.${source_code.name.split('.').pop()}`,
        };

        const FileCreated = await Bun.write(docsData.pathName, docs);
        const FileCreatedSourceCode = await Bun.write(source_codeData.pathName, source_code);

        if (!FileCreated || !FileCreatedSourceCode) {
          return error(404, "upload file error");
        }

        const problemUpeateFile = await updateProblem(id, {
          docs: docsData,
          source_code: source_codeData,
        });

        if (!problemUpeateFile) {
          return error(404, "update file error");
        }

        const resultProblem = await getProblemById(id);

        if (!resultProblem) {
          return error(404, "get problem error");
        }

        return {
          result: resultProblem,
          status: 200,
          message: "create problem success",
        };
 
      } catch (e) {
        console.log(e);
        return error(500, "Internal Server Error");
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        difficulty: t.String(),
        type: t.String(),
        viewer: t.String(),
        docs: t.File(),
        hint: t.String(),
        source_code: t.File(),
        cpu_time_limit: t.Optional(t.String()),
        memory_limit: t.Optional(t.String()),
        stack_limit: t.Optional(t.String()),
        max_file_size: t.Optional(t.String()),
      }),
    }
  )

  /**
   * @description get problems and filter problems
   */
  .get("/gets", async ({ query, clerk, auth, error }) => {
      try {
        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const sizepage = query?.pagesize || 10;
        const page = query?.page || 1;
        const difficulty = query.difficulty ? JSON.parse(query.difficulty) : [];
        const type = query.type ? JSON.parse(query.type) : [];

        const filter = {
          ...(difficulty.length && { difficulty: { $in: difficulty } }),
          ...(type.length && { type: { $in: type } }),
        };

        const submissions = await getSubmitbyClerkId(auth.userId);

        if (query.solve && query.unsolve) {
          const solvedProblemIds = submissions
            .filter(sub => sub.success)
            .map(sub => sub.problemId);
          const unsolvedProblemIds = submissions
            .filter(sub => !sub.success)
            .map(sub => sub.problemId);
          filter['_id'] = { $in: [...solvedProblemIds, ...unsolvedProblemIds] };
        } else {
          if (query.solve) {
            const solvedProblemIds = submissions
              .filter(sub => sub.success)
              .map(sub => sub.problemId);
            filter['_id'] = { $in: solvedProblemIds };
          }

          if (query.unsolve) {
            const unsolvedProblemIds = submissions
              .filter(sub => !sub.success)
              .map(sub => sub.problemId);
            filter['_id'] = { $in: unsolvedProblemIds };
          }
        }

        const problems = await ProblemModel.find(filter)
          .skip((page - 1) * sizepage)
          .limit(sizepage);

        const totalCounts = await ProblemModel.countDocuments(filter);

        const resultProblem = await Promise.all(
          problems.map(async (problem) => {
            const userbyid = await clerk.users.getUser(problem.clerkId);
            const point = await getSumPointByProblemId(problem._id.toString());

            return {
              id: problem._id.toString(),
              title: problem.title,
              difficulty: problem.difficulty,
              submissions: problem.submissions,
              accepted: problem.accepted,
              successRate: (problem.accepted / problem.submissions) * 100 || 0,
              type: problem.type,
              author: {
                name: userbyid.username,
                avatar: userbyid.imageUrl,
              },
              points: point[0]?.total || 0,
            };
          })
        );

        return {
          result: resultProblem,
          totalCounts,
        };
      } catch (e) {
        console.log(e);
        return error(500, "Internal Server Error");
      }
    },
    {
      query: t.Optional(
        t.Object({
          page: t.Optional(t.Number()),
          pagesize: t.Optional(t.Number()),
          solve: t.Optional(t.Boolean()),
          unsolve: t.Optional(t.Boolean()),
          type: t.Optional(t.String()),
          difficulty: t.Optional(t.String()),
        })
      ),
    }
  )

  /**
   * @description get problem by id
   */

  .get("get/:id", async ({ params, error , auth}) => {
      try {

        if (!auth?.userId) {
          return error(401, "Unauthorized");
        }

        const { id } = params;

        const problem = await getProblemById(id);

        if (!problem) {
          return error(404, "problem not found");
        }

        const point = await getSumPointByProblemId(problem._id.toString());
        const TopPointMySubmission = await getTopSubmissionByProblemAndClerkId(problem._id.toString(),auth.userId);

        return {
          result: {
            _id: problem._id,
            title: problem.title,
            description: problem.description,
            difficulty: problem.difficulty,
            submissions: problem.submissions,
            accepted: problem.accepted,
            hint: problem.hint,
            type: problem.type,
            cpu_time_limit: problem.cpu_time_limit,
            memory_limit: problem.memory_limit,
            stack_limit: problem.stack_limit,
            max_file_size: problem.max_file_size,
            maxPoints: point[0]?.total || 0,
            myMaxPoints: TopPointMySubmission?.points || 0,
          },
        };
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

    .post("update",async({body, auth, error})=>{
      try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const {id,title, description, difficulty, type, docs, hint , source_code,viewer}= body;

      const problem = await ProblemModel.findOne({_id:id,clerkId:auth.userId,status:"active"})

      if (!problem) {
        return error(404, "problem not found");
      }

      if(docs){
        if (docs.type !== "application/pdf") {
          return error(400, "docs must be a pdf file");
        }
        const docsData = {
          name: docs.name,
          size: docs.size,
          type: docs.type,
          pathName : problem.docs.pathName
        }

        const FileCreated = await Bun.write(problem.docs.pathName, docs);
        if (!FileCreated) {
          return error(404, "upload file error");
        }
        problem.docs = docsData
      }

      if(source_code){
        const sourceData = {
          name: source_code.name,
          size: source_code.size,
          type: source_code.type,
          pathName : problem.source_code.pathName
        }

        const FileCreated = await Bun.write(problem.source_code.pathName, source_code);
        if (!FileCreated) {
          return error(404, "upload file error");
        }
        problem.source_code = sourceData
      }

      problem.title = title?title:problem.title
      problem.description = description?description:problem.description
      problem.difficulty = difficulty?Number(difficulty):problem.difficulty
      problem.type = type?toArray(JSON.parse(type)):problem.type
      problem.hint = hint?toArray(JSON.parse(hint)):problem.hint

      if(viewer){
        if(viewer=="private"){
          problem.viewer=viewer
        }else if(viewer=="public"){
          //send to authenication
        }else{
          return error(404, "update view wrror");
        }
      }

      const problemUpeate = await updateProblem(id, problem);
      if (!problemUpeate) {
        return error(404, "update error");
      }

      return {
        status: 200,
        message: "update problem success",
      };
    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
    },{
      body: t.Object({
        id: t.String(),
        title: t.Optional(t.String()),
        description: t.Optional(t.String()),
        difficulty: t.Optional(t.String()),
        type: t.Optional(t.String()),
        docs: t.Optional(t.File()),
        hint: t.Optional(t.String()),
        source_code: t.Optional(t.File()),
        viewer:t.Optional(t.String())
      }),
    })

    .get("remove/:id",async({params, auth, error})=>{
      try {
      if (!auth?.userId) {
        return error(401, "Unauthorized");
      }

      const { id } = params;

      const problem = await ProblemModel.findOne({_id:id,clerkId:auth.userId,status:"active"})

      if (!problem) {
        return error(404, "problem not found");
      }

      const problemUpeate = await updateProblem(id, {status:"deleted"});
      if (!problemUpeate) {
        return error(404, "remove error");
      }

      return {
        status: 200,
        message: "remove problem success",
      };
    } catch (e) {
      console.log(e);
      return error(500, "Internal Server Error");
    }
    },{
      params: t.Object({
        id: t.String(),
      }),
    });
