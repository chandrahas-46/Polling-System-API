# Polling-System-API
Polling System API is a Node.js web application, which helps user to make a call with different api like create and delete question/options and add vote features.
It is built using Javascript, Bootstrap, Node.js, Express.js, and MongoDB for data storage.
### Local Server Url: http://localhost:3000/

## Features
  - Create a question (you can add as many questions as you want)
  - Add options to a question
  - Add a vote to an option of question
  - Delete a question → (A question can't be deleted if one of it's options has votes)
  - Delete an option → (An option can't be deleted if it has even one vote given to it)
  - View a question with it's options and all the votes given to it
  - View all question with it's options and all the votes given to it

## Required Routes
1. `/questions/create` (To create a question)
2. `/questions/:id/options/create` (To add options to a specific question)
3. `/questions/:id/delete` (To delete a question)
4. `/options/:id/delete` (To delete an option)
5. `/options/:id/add_vote` (To increment the count of votes)
6. `/questions/:id` (To view a question and it's options)
7. `/allquestions` (To view all question and it's options)

## Packages dependencies :
  - express
  - ejs
  - express-ejs-layouts
  - dotenv
  - mongoose
