import { Schema, model } from "mongoose";

const ProblemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export const ProblemModel = model("problems", ProblemSchema);

export const createProblem = (values: object) => ProblemModel.create(values);
export const getProblemsByType = (type: string) => ProblemModel.find({ type: type })
export const getProblems = () => ProblemModel.find();
export const getProblemById = (id :string) => ProblemModel.findById(id);
export const updateProblem = (id : string , values : object) => ProblemModel.findByIdAndUpdate(id, values);
export const deleteProblems = () => ProblemModel.deleteMany({});
export const deleteProblemByType = (type : string) => ProblemModel.deleteMany({ type: type });
export const deleteProblemById = (id : string) => ProblemModel.findByIdAndDelete(id);
export const deleteProblemBySolution = (solution : string) => ProblemModel.deleteMany({ solution: solution });