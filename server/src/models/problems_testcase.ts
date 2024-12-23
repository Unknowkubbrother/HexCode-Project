import { Schema, model } from "mongoose";
import { IProblemTestCase } from "@/interface/problems";

const ProblemsTestCaseSchema = new Schema(
  {
    problemId: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProblemTestCaseModel = model(
  "problems_testcase",
  ProblemsTestCaseSchema
);

export const createProblemTestcase = (values: IProblemTestCase) =>
  new ProblemTestCaseModel(values).save().then((problem) => problem.toObject());

export const getProblemByIdCaseAndProblemId = (
  idcase: number,
  problemId: string
) => ProblemTestCaseModel.findOne({
    problemId: problemId,
    id: idcase,
}).then((problem) => problem?.toObject()).catch(() => null);

export const getSumPointByProblemId = (problemId: string) =>
  ProblemTestCaseModel.aggregate([
    {
      $match: {
        problemId: problemId,
      },
    },
    {
      $group: {
        _id: "$problemId",
        total: {
          $sum: "$point",
        },
      },
    },
  ]);
