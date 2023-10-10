import mongoose from "mongoose";
import {questionSchema} from '../models/question.schema.js'
import {optionSchema} from '../models/option.schema.js'

// creating model from schema.
const QuestionModel = mongoose.model('Question', questionSchema);
const OptionModel = mongoose.model('Option', optionSchema);


export default class OptionController {
    // *********************************** Delete an option ***************************************
    async deleteOption(req, res){
        try{
            const optionId = req.params.id;
            console.log("optionId: ", optionId);
            let question = await QuestionModel.find({'options' :optionId});
            
            if(question){
                // console.log(question);
                const isVotes = await OptionModel.find({_id: optionId, "votes": {$gt: 0}});
                // console.log(isVotes.length, " ", isVotes);

                if(isVotes.length > 0){
                    const result = "Option can not be deleted because option have atleast one vote"
                    return res.status(200).send({message: result, "options who keep Votes": isVotes });
                }
                else{
                    let quesId = question[0]._id;
                    let ques = await QuestionModel.findById(quesId);
                    let optionIndex = ques.options.indexOf(optionId);
                    if (optionIndex !== -1) {
                        ques.options.splice(optionIndex, 1);
                    }
                    await ques.save();

                    await OptionModel.findByIdAndDelete(optionId);
                    return res.status(200).send({message: "Option and associated Question's options removed successfully!" });
                }
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

    // *********************************** Add a vote to an option ***************************************
    async addVote(req, res){
        try{
            const optionId = req.params.id;
            let option = await OptionModel.findById(optionId);
            option.votes += 1;
            await option.save();
            return res.status(200).send({message: "Vote added successfully!", Option: option });
        } 
        catch(err){
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }
}

