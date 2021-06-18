const persons = require('./data.json').persons;
const firestations = require('./data.json').firestations;
const medicalRds = require("./data.json").medicalrecords;
const db = require('../models/setup');
const modelPerson = db.models.Person;
const modelMedicalRd = db.models.MedicalRd;
const modelFirestation = db.models.Firestation;
const Sequelize = require('sequelize');

const personPopulateDb = ()=>{
	modelFirestation.findAll({})
	.then((dataF) => {
		dataF.forEach(firestation=>{
			persons.forEach(person=>{
				const{firstName, 
					lastName,
					address,
					city,
					zip,
					phone,
					email} = person
				if(person.address == firestation.address){
					modelPerson.create({
						firstName, 
						lastName,
						address,
						city,
						zip,
						phone,
						email,
						FirestationIdFirestation: firestation.id_firestation
					})
				}
			})
		})
	})
	.catch((err) => {
		console.log(400);
	});
	
}

const medicalRdPopulateDb = ()=>{
    medicalRds.forEach(medicalRd=>{
        const {
					firstName,
					lastName,
					birthdate,
					medications,
					allergies, 
        } = medicalRd
				modelPerson.findOne({
					where: {firstName: firstName, lastName: lastName} 
			 }).then((data)=>{
				 modelMedicalRd.create({
					 firstName,
					 lastName,
					 birthdate,
					 medications,
					 allergies,
					 PersonIdPerson: data.id_person
				 })
			 })
    })
}

const firestationPopulateDb = () =>{
	firestations.forEach(firestation=>{
		const {station, address} = firestation;
		modelFirestation.create({ station, address })
	})
}

const addFkeys = () => {
	let dataFirestation = [];
	let dataPerson = [];
	let dataMedicalRd = [];

	modelFirestation.findAll({})
	.then((dataF) => {
		dataFirestation = dataF;
		console.log("DATAFIRESTATION", datdataFirestation);
	})
	.catch((err) => {
		console.log(400);
	});
	
	modelPerson.findAll({})
	.then((dataP) => {
		dataPerson = dataP;
		console.log("DATAPERSON", dataPerson);
	})
	.catch((err) => {
		console.log(400);
	});

	modelMedicalRd.findAll({})
	.then((dataM) => {
		dataMedicalRd = dataM;
	})
	.catch((err) => {
		console.log(400);
	});

	setTimeout(()=>{
		dataFirestation.forEach(firestation=>{
			dataPerson.forEach(person=>{
				if(firestation.address == person.address){
					let FirestationIdFirestation = firestation.id_firestation;
					modelPerson.update({
						FirestationIdFirestation
					},
					{
						where: {address: person.address}
					})
				}
			})
		}	
	)
		dataMedicalRd.forEach(medicalRd=>{
			dataPerson.forEach(person=>{
				if(medicalRd.firstName == person.firstName && medicalRd.lastName == person.lastName){
					let fk_id_medical_rd = medicalRd.id_medical_rd;
					modelPerson.update({
						fk_id_medical_rd
					},
					{
						where: {
							lastName: person.lastName,
							firstName: person.firstName
						}
					})
				}
			})
		})
	 }, 500);
}

const addFkeysFromCreation = ({type, address, lastName, firstName}) => {
	let dataToReturn;

	switch (type) {
		case "firestation":
			modelFirestation.findOne({
				where:  {
					address: address,
				}
			})
			.then((dataF) => {
				// console.log("DATA  F  RETURNED",dataF)
				dataToReturn = dataF;
			})
			.catch((err) => {
				console.log(err);
			});
			
			break;

		case "medicalRd":
			modelMedicalRd.findAll({
				where:  {
					firstName: firstName,
					lastName: lastName
				}
			})
			.then((dataM) => {
				// console.log("DATA  M  RETURNED",dataM)
				dataToReturn = dataM;
			})
			.catch((err) => {
				console.log(err);
			});
			break;
	
		default:
			break;
	}

	setTimeout(() => {
		console.log("DATA TO RETURN", dataToReturn)
		return dataToReturn;
	}, 500);
}

addFkFirestationToPerson = () =>{
	let dataFirestation = [];
	let dataPerson = [];

	modelFirestation.findAll({})
	.then((dataF) => {
		dataFirestation = dataF;
		console.log("DATAFIRESTATION", dataFirestation);
	})
	.catch((err) => {
		console.log(400);
	});
	modelPerson.findAll({})
	.then((dataP) => {
		dataPerson = dataP;
		console.log("DATAFIRESTATION", dataPerson);
	})
	.catch((err) => {
		console.log(400);
	});

	dataFirestation.forEach(firestation =>{
		dataPerson.forEach(person =>{
			if(dataFirestation.address == dataPerson.address){
				modelFirestation.update({
					FirestationIdFirestation: firestation.id_firestation
				},
				{where: id_person == person.id_person}
				)
			}
		})
	})

}

module.exports ={
	addFkeysFromCreation,
	addFkeys,
	personPopulateDb,
	medicalRdPopulateDb,
	firestationPopulateDb,
	addFkFirestationToPerson,
}