const express = require("express");
const db = require('../models/setup');
const persons = db.models.Person;
const modelMedicalRd = db.models.MedicalRd;
const modelFirestation = db.models.Firestation;
const app = express.Router();

app.post('/new', function (req, res) {
  let FirestationIdFirestation;
  const {
    firstName, 
    lastName,
    address,
    city,
    zip,
    phone,
    email,
    } = req.body;

    modelFirestation.findOne({
      where:  {
        address: address,
      }
    })
    .then((dataF) => {
      FirestationIdFirestation = dataF.id_firestation || null;
    })
    .catch((err) => {

    });

    setTimeout(() => {
      persons.create({ 
        firstName, 
        lastName,
        address,
        city,
        zip,
        phone,
        email,
        FirestationIdFirestation,
       })
        .then((data) => {
          res.status(200).json({data})
        })
        .catch((err) => {
          res.status(400).json(err)
        });
    }, 500);
});

app.get('/', function (req, res) {
  persons.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.get('/:id', function (req, res) {
  persons.findOne({
    where: {id_person: req.params.id}
  })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
});

app.patch('/:id/update', (req, res)=>{

  const { 
    firstName, 
    lastName,
    address,
    city,
    zip,
    phone,
    email,
    FirestationIdFirestation,
    } = req.body;
     
  persons.update(
    {
      firstName, 
      lastName,
      address,
      city,
      zip,
      phone,
      email,
      FirestationIdFirestation,
    },
    {
      where: {id_person: req.params.id}
    }
  )
  .then((dataPerson) => {
    modelMedicalRd.update({
      firstName, 
      lastName,
    },
    {
      where: {PersonIdPerson: req.params.id}
    }).then((dataMedicalRd)=>{
      res.status(200).json({dataPerson, dataMedicalRd})
    })
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

app.delete('/:id/delete', (req, res)=>{
  persons.destroy({
    where: {PersonIdPerson: req.params.id}
  })
  .then((dataPerson) => {
    modelMedicalRd.destroy({
      where: {id_person: req.params.id}
    }).then((dataMedicalRd)=>{
      res.status(200).json({dataPerson, dataMedicalRd})
    })
  })
  .catch((err) => {
    res.status(400).json(err)
  });
});

module.exports = app;