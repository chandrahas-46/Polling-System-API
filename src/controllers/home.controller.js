import mongoose from "mongoose";
import {questionSchema} from '../models/question.schema.js'

// creating model from schema.
const QuestionModel = mongoose.model('Question', questionSchema);

export default class HomeController {
    async getAllQuestions(req, res) {
        try{
            let question = await QuestionModel.find({}).populate({
                path: "options",
            });
            if (question) {
                return res.status(200).send({
                  message: "Here, You can find all your Questions!",
                  Questions: question,
                });
            } 
            else {
                return res.status(400).send({ message: "Question not Found, You can add new Questions!!"});
            }
        }
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }
}

/*
export const homePage = async function (req, res) {
    // finding all the questions with Options
    try{
        let question = await QuestionModel.find({}).populate({
            path: "options",
        });
        if (question) {
            return res.status(200).send({
              message: "Here, You can find all your Questions!",
              data: question,
            });
        } 
        else {
            return res.status(400).send({ message: "Question not Found, You can add new Questions!!"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Something went wrong");
    }
}
*/

// module.exports.api = function(req , res){
//   res.send("<h1> Your Polling System API Successfull Run ! </h1>") ; 
// }