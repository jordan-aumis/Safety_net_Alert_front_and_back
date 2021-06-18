const express = require("express");
const db = require('../models/setup');
const firestations = db.models.Firestation;
var  dataFirestation  = require('./data.json').firestations
const app = express.Router();
const  {deleteData, newData, updateData } = require('./utils');

app.post('/new', function (req, res) {
  const {
    address, 
    station,
    } = req.body;
  
  let dataToShow = newData("firestation", req.body, dataFirestation)
  firestations.create({ 
    address,
    station
   })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/', function (req, res) {
  firestations.findAll()
    .then((data) => {
      res.status(200).json({data, dataFirestation})
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
  let dataFirestationsId = dataFirestation.find(x => x.id_firestation == req.params.id);
  firestations.findOne({
    where: {id_firestation: req.params.id}
  })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.patch('/:id/update', (req, res)=>{
  
  // let dataToshow = updateData("firestation", req.body, dataFirestation, req.params.id);
  const { 
    station
    } = req.body;
     
		firestations.update(
    {
			station
    },
    {
      where: {id_firestation: req.params.id}
    }
  )
  .then((data) => {
    res.status(200).json({data})
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

app.delete('/:id/delete', (req, res)=>{
  firestations.destroy({
    where: {id_firestation: req.params.id}
  })
  .then((data) => {
    res.status(200).json({data, dataToShow})
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;