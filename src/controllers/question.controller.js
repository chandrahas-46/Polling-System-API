import mongoose from "mongoose";
import {questionSchema} from '../models/question.schema.js'
import {optionSchema} from '../models/option.schema.js'

// creating model from schema.
const QuestionModel = mongoose.model('Question', questionSchema);
const OptionModel = mongoose.model('Option', optionSchema);

export default class QuestionController {
    // *********************************** Create a question ***************************************
    async createQuestion(req, res){
        try{
            const {title} = req.body;
            if(title == undefined){
                return res.status(400).send({message: "Question Can not be created, Please write a Valid Question's title"});
            }          
            let question = await QuestionModel.create({
                title: title,
            });
            return res.status(201).send({ message: "Question Created successfully", Question: question });
        } 
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    // *********************************** Add options to a specific question ***************************************
    async addOptions(req, res){
        try{
            const questionId = req.params.id;
            const {text} = req.body;
            if(!text){
                return res.status(400).send("Option can not be empty");
            }
            
            let question = await QuestionModel.findById(questionId);
            if(question){
                // question.options.push({text, votes:0});
                let option = await OptionModel.create({
                    question: questionId,
                    text: text,
                    votes: 0,
                });

                option.link_to_vote = `https://${req.headers.host}/options/${option._id.toString()}/add_vote`;
                await option.save();
                question.options.push(option);
                await question.save();
                return res.status(201).send({ message: "Option Created successfully", Option: option, Question: question });
            }
            else{
                throw new Error("No such question found");
            }   
        } 
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    // *********************************** Delete question ***************************************
    async deleteQuestion(req, res){
        try{
            const questionId = req.params.id;
            console.log("delete questionId: ", questionId);
            let question = await QuestionModel.findById(questionId);
            let options = await OptionModel.find({question: questionId});    //get all options related question
            // await QuestionModel.findByIdAndDelete(questionId);  //***********
            if(question){
                const isVotes = options.filter(
                    (option) => option.votes > 0
                );
                // const isVotes = option.find({votes: {$gt: 0}});

                if(isVotes.length > 0){
                    const result = "Question can not be deleted because atleast one option of this question have vote"
                    return res.status(200).send({message: result, "options who keep Votes": isVotes });
                }
                else{
                    await OptionModel.deleteMany({ question: questionId });
                    await QuestionModel.findByIdAndDelete(questionId);
                    return res.status(200).send({message: "Question and associated options removed successfully!" });
                }
            }
        } 
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }


    // *********************************** View a question with its options ***************************************
    async viewQuestion(req, res){
        try{
            const questionId = req.params.id;
            // const result = await this.questionRepository.viewQuestionWithOption(questionId);
            let question = await QuestionModel.findById(questionId).populate({
                path: "options",
            });
            if(question){
                return res.status(200).send({Question: question });
            }
            else{
                throw new Error("No such question found");
            }
        } 
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }
}

