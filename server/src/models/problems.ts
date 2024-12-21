import Status from "@/enum/status";
import { file } from "bun";
import { Schema, model } from "mongoose";

const ProblemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },difficulty:{
        type:Number,
        required : true
    },type:[],clerkId:{
        type:String,
        required : true
    },submissions:{
        type:Number,
        required : true,
        default : 0
    },accpet:{
        type:Number,
        required : true,
        default : 0
    },point:{
        type:Number,
        required : true,
        default : 10
    },testcase:[]
    ,status:{
        type:Number,
        required : true,
        default : Status.NORMAL
    },filedocs:{
        type:String,
        required : false,
        default : null
    },hint:[]
},{timestamps:true});

interface IProblem{
    title: string,
    description : string,
    difficulty : number,
    type : Array<number>
    clerkId : string,
    point : number,
    testcase : Array<object>,
    filedocs?:string,
    hint?: Array<string>
}

export const ProblemModel = model("problems", ProblemSchema);

export const createProblem = (values:IProblem) =>
    new ProblemModel(values).save().then((problem) => problem.toObject());
export const getProblemsByType = (type: string) => ProblemModel.find({ type: type })
export const getProblems = () => ProblemModel.find();
export const getProblemById = (id :string) => ProblemModel.findById(id);
export const updateProblem = (id : string , values : object) => ProblemModel.findByIdAndUpdate(id, values);
export const deleteProblems = () => ProblemModel.deleteMany({});
export const deleteProblemByType = (type : string) => ProblemModel.deleteMany({ type: type });
export const deleteProblemById = (id : string) => ProblemModel.findByIdAndDelete(id);
export const deleteProblemBySolution = (solution : string) => ProblemModel.deleteMany({ solution: solution });