import "./env.js";
import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import homeRouter from "./src/routes/home.routes.js";
import questionRouter from './src/routes/question.routes.js'
import optionRouter from './src/routes/option.routes.js'
import {connectToDB} from './src/config/mongooseConfig.js';
import bodyParser from "body-parser";


// create server
const app = express();
// app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set('views',path.join(path.resolve(), 'src', 'views'));

// use express router
app.use("/", homeRouter);
// app.get("/allquestions", homePage());
app.use("/questions", questionRouter);
app.use("/options", optionRouter);

// Middleware to handle 404 requests
app.use((req, res) => {
    res.status(404).send("API not found. Please check your documentation for more information");
    // [localhost:3200/api-docs]: swagger link
})

//server listening
app.listen(3000, (err) => {
    if(err) console.log("server error on port 3000");
    console.log('Server is running at 3000');
    connectToDB();
})
