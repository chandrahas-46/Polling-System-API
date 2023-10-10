// 1. Import express.
import express from 'express';
import HomeController from '../controllers/home.controller.js'

// 2. Initialize Express router.
const homeRouter = express.Router();
const homeController = new HomeController();

// All the paths to the controller methods.

homeRouter.get("/",(req,res)=>{
    res.render("home", {HostUrl: req.headers.host})
})
homeRouter.get("/allquestions", homeController.getAllQuestions);

export default homeRouter;
