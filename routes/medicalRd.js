const express = require("express");
const db = require('../models/setup');
const medicalRds = db.models.MedicalRd;
const persons = db.models.Person;

const app = express.Router();

app.post('/new', function (req, res) {
  
  const {
    firstName,
    lastName,
    birthdate,
    medications,
    allergies,
    } = req.body;

  persons.findOne({
     where: {firstName: firstName, lastName: lastName} 
  })
  .then((data) => {
    if(data){
      medicalRds.create({ 
        firstName,
        lastName,
        birthdate,
        medications,
        allergies, 
        PersonIdPerson: data.id_person
       })
        .then((data) => {
          res.status(200).json(data)
        })
        .catch((err) => {
          res.status(400).json(err)
        });
    }
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

app.get('/', function (req, res) {
    medicalRds.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.post('/NoMedicalRd', function (req, res) {
  const {
    firstName,
    lastName,
    PersonIdPerson,
    } = req.body;
  
  medicalRds.findOne({
    where: {firstName: firstName, lastName: lastName, PersonIdPerson: PersonIdPerson}
  })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
  medicalRds.findOne({
    where: {id_medical_rd: req.params.id}
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
    firstName,
    lastName,
    birthdate,
    medications,
    allergies, 
    } = req.body;
     
    medicalRds.update(
    {
        firstName,
        lastName,
        birthdate,
        medications,
        allergies, 
    },
    {
      where: {id_medical_rd: req.params.id}
    }
  )
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

app.delete('/:id/delete', (req, res)=>{
  medicalRds.destroy({
    where: {id_medical_rd: req.params.id}
  })
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;