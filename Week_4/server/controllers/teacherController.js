const Teacher = require("../models/teacherModel");

/**
 * Creates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = (req, res) => { 
  let teacher = new Teacher();

  teacher.first_name = req.body.first_name;
  teacher.last_name = req.body.last_name;
  teacher.cedula = req.body.cedula;
  teacher.age = req.body.age;

  if (teacher.first_name && teacher.last_name) {
    teacher.save()
      .then(() => {
        res.status(201); // CREATED
        res.header({
          'location': `/api/teachers/?id=${teacher.id}`
        });
        res.json(teacher);
      })
      .catch((err) => {
        res.status(422);
        console.log('error while saving the teacher', err);
        res.json({
          error: 'There was an error saving the teacher'
        });
    });
  } else {
    res.status(422);
    console.log('error while saving the teacher')
    res.json({
      error: 'No valid data provided for teacher'
    });
  }
};

/**
 * Get all teachers
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = (req, res) => {
  // if an specific teacher is required
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id)
      .then(teacher => {
        res.json(teacher);
      })
      .catch( () => {
        res.status(404);
        console.log('error while queryting the teacher', err)
        res.json({ error: "Teacher doesnt exist" })
      });
  } else {
    // get all teachers
    Teacher.find()
      .then(teachers => {
        res.json(teachers);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

/**
 * Updates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPatch = async (req, res) => {
  // get teacher by id
  if (req.params && req.params.id) {
    let id = req.params.id
    let teacher = teacherGet(id)
    let updateData = {
      first_name: req.body.first_name ? req.body.first_name : teacher.first_name,
      last_name: req.body.last_name ? req.body.last_name : teacher.last_name,
      cedula: req.body.cedula ? req.body.cedula : teacher.cedula,
      age: req.body.age ? req.body.age : teacher.age
    }
    let response = await Teacher.findByIdAndUpdate(id, updateData)
    res.send(`Document with ${response.first_name} was updated`)
  } else {
    res.status(404);
    res.json({ error: "Teacher doesnt exist" })
  }
};

/**
 * Deletes a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherDelete = (req, res) => {
  // get teacher by id
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('error while queryting the teacher', err)
        res.json({ error: "Teacher doesnt exist" })
      }

      teacher.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log('error while deleting the teacher', err)
          res.json({
            error: 'There was an error deleting the teacher'
          });
        }
        res.status(204); //No content
        res.json({});
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Teacher doesnt exist" })
  }
};

module.exports = {
  teacherGet,
  teacherPost,
  teacherPatch,
  teacherDelete
}