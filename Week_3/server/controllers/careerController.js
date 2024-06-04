const Career = require("../models/careerModel");

/**
 * Creates a career
 *
 * @param {*} req
 * @param {*} res
 */
const careerPost = async (req, res) => {
  let career = new Career(req.body);
  await career.save()
    .then(career => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/careers/?id=${career.id}`
      });
      res.json(career);
    })
    .catch( err => {
      res.status(422);
      console.log('error while saving the career', err);
      res.json({
        error: 'There was an error saving the career'
      });
    });
};

/**
 * Get all careers or one
 *
 * @param {*} req
 * @param {*} res
 */
const careerGet = (req, res) => {
  // if an specific career is required
  if (req.query && req.query.id) {
    Career.findById(req.query.id)
      .then( (career) => {
        res.json(career);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the career', err)
        res.json({ error: "Career doesnt exist" })
      });
  } else {
    // get all careers
    Career.find()
      .then( careers => {
        res.json(careers);
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
const careerPatch = async (req, res) => {
  if (req.params && req.params.id) {
    let id = req.params.id
    let updateData = {
      name: req.body.name,
      code: req.body.code,
      description: req.body.description
  }

  let response = await Career.findByIdAndUpdate( id, updateData)
  res.send(`Document with ${response.name} updated`)
  } else {
    res.status(404);
    res.json({ error: "Career doesnt exist" })
  }
};


 /**
 * @param {*} req
 * @param {*} res
 */

const careerDelete = async (req, res) => {
  console.log(req.params)
  if (req.params && req.params.id) {
    const response = await Career.findByIdAndDelete(req.params.id)
    res.send(`Document with ${ response.name } has been deleted`)
  } else {
    res.status(404);
    res.json({ error: "Career doesnt exist" })
  }
};

module.exports = {
  careerPost,
  careerGet,
  careerPatch,
  careerDelete
}