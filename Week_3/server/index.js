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
const { coursePost, courseGet } = require('./controllers/courseController');


// listen to the task request
app.post("/api/teachers", teacherPost);
app.get("/api/teachers/",teacherGet);
app.post("/api/courses", coursePost);
app.get("/api/courses/", courseGet);
// app.patch("/api/teachers", teacherPatch);
// app.put("/api/teachers", teacherPatch);
// app.delete("/api/teachers", teacherDelete);


app.listen(3001, () => console.log(`Example app listening on port 3001!`))
