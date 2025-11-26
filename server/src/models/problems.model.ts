import { IProblem } from "@/interface/problems.interface";
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
      required: false,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    type: {
      type: Array,
      required: true,
      default: [],
    },
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
    docs: {
      type: Object,
      required: true,
      default: {},
    },
    hint: {
      type: Array,
      required: false,
      default: [],
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    viewer : {
      type: String,
      required: true,
      default: "private",
    },
    secret_code: {
      type: String,
      required: false,
    },
    source_code:{
      type: Object,
      required: true,
      default: {},
    },
    cpu_time_limit: {
      type: Number,
      required: false,
    },
    memory_limit: {
      type: Number,
      required: false,
    },
    stack_limit: {
      type: Number,
      required: false,
    },
    max_file_size: {
      type: Number,
      required: false,
    }
  },
  { timestamps: true }
);

export const ProblemModel = model("problems", ProblemSchema);

export const createProblem = (values: IProblem) =>
  new ProblemModel(values).save().then((problem) => problem.toObject());
export const getProblemsByType = (type: string) =>
  ProblemModel.find({ type: type });
export const getProblems = () => ProblemModel.find();
export const getProblemById = (id: string) => ProblemModel.findById(id).then((problem) => problem?.toObject()).catch(() => null);
export const updateProblem = (id: string, values: object) =>
  ProblemModel.findByIdAndUpdate(id, values);
export const deleteProblems = () => ProblemModel.deleteMany({});
export const deleteProblemByType = (type: string) =>
  ProblemModel.deleteMany({ type: type });
export const deleteProblemById = (id: string) =>
  ProblemModel.findByIdAndDelete(id);
export const deleteProblemBySolution = (solution: string) =>
  ProblemModel.deleteMany({ solution: solution });
export const getFileByProblemId = (id: string) =>
  ProblemModel.findById(id).then((problem) => problem?.docs);
export const getProblemByClerkIdAndStatus = (clerkId: string, status: string) =>
  ProblemModel.find({ clerkId: clerkId, status: status });

export const updateCountSubmissionByProblemId = (id: string, values: object) =>
  ProblemModel.findByIdAndUpdate(id, values);

export const updateCountAcceptedByProblemId = (id: string, values: object) =>
  ProblemModel.findByIdAndUpdate(id, values);
