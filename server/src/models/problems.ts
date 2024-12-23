import { IProblem } from "@/interface/problems";
import { Schema, model } from "mongoose";

const ProblemSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    type: [],
    submissions: {
      type: Number,
      required: true,
      default: 0,
    },
    accepted: {
      type: Number,
      required: true,
      default: 0,
    },
    filedocs: {
      type: String,
      required: false,
      default: null,
    },
    hint: {
      type: Array,
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

export const ProblemModel = model("problems", ProblemSchema);

export const createProblem = (values: IProblem) =>
  new ProblemModel(values).save().then((problem) => problem.toObject());
export const getProblemsByType = (type: string) =>
  ProblemModel.find({ type: type });
export const getProblems = () => ProblemModel.find();
export const getProblemById = (id: string) => ProblemModel.findById(id).then((problem) => problem?.toObject());
export const updateProblem = (id: string, values: object) =>
  ProblemModel.findByIdAndUpdate(id, values);
export const deleteProblems = () => ProblemModel.deleteMany({});
export const deleteProblemByType = (type: string) =>
  ProblemModel.deleteMany({ type: type });
export const deleteProblemById = (id: string) =>
  ProblemModel.findByIdAndDelete(id);
export const deleteProblemBySolution = (solution: string) =>
  ProblemModel.deleteMany({ solution: solution });
