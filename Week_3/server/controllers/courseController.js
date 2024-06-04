const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course.save()
    .then(course => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/courses/?id=${course.id}`
      });
      res.json(course);
    })
    .catch( err => {
      res.status(422);
      console.log('error while saving the course', err);
      res.json({
        error: 'There was an error saving the course'
      });
    });
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific course is required
  if (req.query && req.query.id) {
    Course.findById(req.query.id)
      .then( (course) => {
        res.json(course);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      });
  } else {
    // get all courses
    Course.find()
      .then( courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};


 /**
 * @param {*} req
 * @param {*} res
 */
const coursePatch = async (req, res) => {
  if (req.params && req.params.id) {
    let id = req.params.id
    let updateData = {
      name: req.body.name,
      credits: req.body.credits,
      teacher: req.body.teacher
    }
    console.log("sdad")
    let response = await Course.findByIdAndUpdate( id, updateData );
    console.log(response)
    res.send(`Document with ${response.name} has been updated`)
  } else {
    res.status(404);
    res.json({ error: "Course doesnt exist" })
  }
};


 /**
 * @param {*} req
 * @param {*} res
 */

const courseDelete = async (req, res) => {

  if (req.params && req.params.id) {
    const response = await Course.findByIdAndDelete(req.params.id)
    res.send(`Document with ${ response.name } has been deleted`)
  } else {
    res.status(404);
    res.json({ error: "Course doesnt exist" })
  }
};

module.exports = {
  coursePost,
  courseGet,
  coursePatch,
  courseDelete
}