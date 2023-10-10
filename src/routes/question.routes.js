// 1. Import express.
import express from 'express';
import QuestionController from '../controllers/question.controller.js'

// 2. Initialize Express router.
const questionRouter = express.Router();
const questionController = new QuestionController();


// All the paths to the controller methods.
questionRouter.post('/create', questionController.createQuestion);
questionRouter.post('/:id/options/create', questionController.addOptions);
questionRouter.delete('/:id/delete', questionController.deleteQuestion);

questionRouter.get('/:id', (req, res)=>{
    questionController.viewQuestion(req, res)
});


export default questionRouter;
