const express = require('express')

const router = express.Router();

const Model = require('../model/model')

router.post('/user', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        lastname: req.body.lastname
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json({"response": "El usuario " + dataToSave.name + " " + dataToSave.lastname + " fue creado"})
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
})


router.get('/hello', async (req, res) => {
    let data;
    try {
        if (req.query.message) {
            data = {"response": "Hello " + req.query.message};
        } else {
            data = {"response":"Hello Word"};
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


module.exports = router