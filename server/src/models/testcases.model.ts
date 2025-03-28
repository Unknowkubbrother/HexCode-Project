import { Schema, model } from "mongoose";
import { ITestCase } from "@/interface/testcases.interface";

const TestCaseSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    problemId: {
      type: String,
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
    points: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const TestCaseModel = model(
  "testcases",
  TestCaseSchema
);

export const createProblemTestcase = (values: ITestCase) =>
  new TestCaseModel(values).save().then((problem) => problem.toObject());

export const updateProblemTestcase = (id : string, problemId: string, values: ITestCase) =>
  TestCaseModel.findOneAndUpdate(
    { _id: id, problemId: problemId },
    { $set: values },
    { new: true }
  ).then((problem) => problem?.toObject()).catch(() => null);

export const deleteProblemTestcase = (id: string, problemId: string) =>
  TestCaseModel.findOneAndDelete({ _id: id, problemId: problemId })
    .then((problem) => problem?.toObject())
    .catch(() => null);

export const getTestCasesByProblemId = (problemId: string) => TestCaseModel.find({
    problemId: problemId,
}).then((testcases) => testcases.map((testcase) => testcase.toObject()));

export const getProblemByIdCaseAndProblemId = (
  idcase: number,
  problemId: string
) => TestCaseModel.findOne({
    problemId: problemId,
    id: idcase,
}).then((problem) => problem?.toObject()).catch(() => null);

export const getProblemByIdAndProblemId = (
  id: string,
  problemId: string
) => TestCaseModel.findOne({
    problemId: problemId,
    _id: id,
}).then((problem) => problem?.toObject()).catch(() => null);

export const getSumPointByProblemId = (problemId: string) =>
  TestCaseModel.aggregate([
    {
      $match: {
        problemId: problemId,
      },
    },
    {
      $group: {
        _id: "$problemId",
        total: {
          $sum: "$points",
        },
      },
    },
  ]);
