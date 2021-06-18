const express = require("express");
const app = express.Router();
const db = require('../models/setup');
const persons = require('./data.json').persons;
const firestations = require('./data.json').firestations;
const medicalRd = require("./data.json").medicalrecords;
const modelPerson = db.models.Person;
const modelMedicalRd = db.models.MedicalRd;
const modelFirestation = db.models.Firestation;

const { seperateAdultChild, addFirstation, countingAge, replaceAll, convertDate } = require('./utils')

app.get('/stationNumber=:id?', (req, res) =>{
    const newData = {};
    let stationId = firestations.filter(x => x.station == req.params.id);
    const personToShow = addFirstation(persons, stationId);
    const {adult, child} = countingAge(personToShow, medicalRd);

    modelFirestation.findAll({
        where: {station: req.params.id},
        include: [ {model: modelPerson, include: [{model: modelMedicalRd}] } ]
    }
    )
    .then((data) => {
        let dataToShow = [];
        data.forEach(element => {
            element.People.forEach(person => {
                dataToShow.push({lastName: person.lastName, firstName:  person.firstName, address: person.address, phone: person.phone, age: convertDate(person.MedicalRd.birthdate)})
            })
        });
        res.status(200).json(dataToShow)
      })
      .catch((err) => {
        res.status(400).json(err)
      });
})

app.get('/childAlert:address?', (req, res) => {
    modelPerson.findAll({
        where:{ address: req.params["address"]},
        include: [ {model: modelMedicalRd }]
    }).then((data) => {
        let dataToShow = [];
        data.forEach(element=>{
            if(convertDate(element.MedicalRd.birthdate) < 18){
                dataToShow.push({lastName: element.lastName, firstName:  element.firstName, address: element.address, phone: element.phone, age: convertDate(element.MedicalRd.birthdate)})
            }
        })
        res.status(200).json(dataToShow)
    })
})

app.get('/phoneAlert/firestation=:id?', (req, res) =>{
    const newData = {};
    let stationId = firestations.filter(x => x.station == req.params.id);
    const personToShow = addFirstation(persons, stationId);
    const {adult, child} = countingAge(personToShow, medicalRd);

    modelFirestation.findAll({
        where: {station: req.params.id},
        include: [ {model: modelPerson, include: [{model: modelMedicalRd}] } ]
    }
    )
    .then((data) => {
        let dataToShow = [];
        data.forEach(element => {
            if( element.People.length > 0){
                dataToShow.push({phone: element.People[0].phone})
            }
        });
        res.status(200).json(dataToShow)
      })
      .catch((err) => {
        res.status(400).json(err)
      });
})

app.get('/fire/address=:address', (req, res) =>{
    modelFirestation.findAll({
        where: {address: req.params.address},
        include: [ {model: modelPerson, include: [{model: modelMedicalRd}] } ]
    }
    )
    .then((data) => {
        let dataToShow = [];
        data.forEach(element => {
            element.People.forEach(person => {
                dataToShow.push({firestation: person.station, lastName: person.lastName, firstName:  person.firstName, phone: person.phone, age: convertDate(person.MedicalRd.birthdate), medication: person.MedicalRd.medications, allegies: person.MedicalRd.allergies })
            });
            dataToShow.push({firestation: element.station})
        });
        res.status(200).json(dataToShow)
    })
    .catch((err) => {
        res.status(400).json(err)
      });
})

app.get('/communityEmail/city=:city', (req, res) =>{
    modelPerson.findAll({
        where: {city: req.params.city},
    }
    )
    .then((data) => {
        let dataToShow = [];
        data.forEach(element => {
            dataToShow.push({email: element.email})
        });
        res.status(200).json(dataToShow)
    })
    .catch((err) => {
        res.status(400).json(err)
      });
})

module.exports = app;