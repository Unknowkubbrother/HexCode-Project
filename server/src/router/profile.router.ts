import { ProblemModel } from "@/models/problems.model";
import { Elysia,t } from "elysia";
import { clerkPlugin } from "elysia-clerk";

export const ProfileRoute = new Elysia({'prefix':'/profile'})
.use(clerkPlugin())

.get("get/:id",async({params, auth, error})=>{
  try {
    if (!auth?.userId) {
      return error(401, "Unauthorized");
    }

    const { id } = params;

    const problem = await ProblemModel.find({clerkId:id,status:"active"});
    let itself = 0;
    if(id==auth.userId){
      itself=1;
    }

    return {
      status: 200,
      problem: problem,
      itself: itself,
    };
  } catch (e) {
    console.log(e);
    return error(500, "Internal Server Error");
  }
  },{
    params: t.Object({
      id: t.String(),
    }),
  })

