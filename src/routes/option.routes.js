// 1. Import express.
import express from 'express';
import OptionController from '../controllers/option.controller.js'

// 2. Initialize Express router.
const optionRouter = express.Router();
const optionController = new OptionController();


// All the paths to the controller methods.

optionRouter.delete('/:id/delete', (req, res)=>{
    optionController.deleteOption(req, res)
});

optionRouter.post('/:id/add_vote', (req, res)=>{
    optionController.addVote(req, res)
});


export default optionRouter;
