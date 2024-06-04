const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://crissanabriah3:Cristopher30@cluster0.y7ssvqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

const { teacherGet, teacherPost, teacherPatch, teacherDelete } = require('./controllers/teacherController');
const { coursePost, courseGet, coursePatch, courseDelete } = require('./controllers/courseController');
const { careerPost, careerGet, careerPatch, careerDelete } = require('./controllers/careerController');


// listen to the task request
app.post("/api/teachers", teacherPost);
app.get("/api/teachers/",teacherGet);
app.patch("/api/teachers/:id", teacherPatch);
app.put("/api/teachers/:id", teacherPatch);
app.delete("/api/teachers/:id", teacherDelete);


app.post("/api/courses", coursePost);
app.get("/api/courses/", courseGet);
app.patch("/api/courses/:id", coursePatch);
app.put("/api/courses/:id", coursePatch);
app.delete("/api/courses/:id", courseDelete);


app.post("/api/careers", careerPost);
app.get("/api/careers/", careerGet);
app.patch("/api/careers/:id", careerPatch);
app.put("/api/careers/:id", careerPatch);
app.delete("/api/careers/:id", careerDelete);


app.listen(3001, () => console.log(`Example app listening on port 3001!`))
