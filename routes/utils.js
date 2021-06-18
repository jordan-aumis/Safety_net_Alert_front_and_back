

const seperateAdultChild = (people, medicalRds) => {
	let firstName;
	let lastName;
	const personList = [];
	let adult = [];
	let child = [];

	if (people == null || medicalRds == null || people == undefined || medicalRds == undefined) {
		let noOneToSeparate = "Il n'y a pas de persones à séparer."
		return noOneToSeparate;
	};
	if (!Array.isArray(people)) {
		people = [people];
	};
	if (!Array.isArray(medicalRds)) {
		medicalRds = [medicalRds];
	};

	people.forEach(person => {
		medicalRds.forEach(medicalRd => {
			if (person.firstName == medicalRd.firstName && person.lastName == medicalRd.lastName) {
				firstName = person.firstName;
				lastName = person.lastName;
				let age = convertDate(medicalRd.birthdate);
				personList.push({ firstName, lastName, age });
			}
		})
	});

	personList.forEach(person => {
		if (person.age > 18) {
			firstName = person.firstName;
			lastName = person.lastName;
			adult.push({ firstName, lastName });
		}
		else
			child.push(person);
	});

	if (child.length > 0) {
		child.push(adult);
	}
	return { child };
};

const replaceAll = (string, search, replace) => {
	return string.split(search).join(replace);
}

const addFirstation = (persons, firestations) => {

	if (persons == null || firestations == null || persons == undefined || firestations == undefined) {
		let noOneToSeparate = "aucune persones ou station definie"
		return noOneToSeparate;
	};
	const putInarray = [];
	const personsTofirestation = [];

	if (!Array.isArray(firestations)) {
		firestations = [firestations];
	}
	if (!Array.isArray(persons)) {
		persons = [persons];
	}
	persons.forEach(person => {
		firestations.forEach(firestation => {
			if (person.address == firestation.address) {
				let firstName = person.firstName;
				let lastName = person.lastName;
				let address = person.address;
				let phone = person.phone;
				personsTofirestation.push({ firstName, lastName, address, phone })
			}
		})
	})

	return personsTofirestation;
};

const convertDate = (date) => {
	const year = date.split('-')[0]
	const currentYear = new Date().getFullYear();
	return currentYear - Number(year)
};

const countingAge = (people, medicalRds) => {
	const ages = [];
	let adult = 0;
	let child = 0;

	if (!Array.isArray(people)) {
		people = [people];
	};
	if (!Array.isArray(medicalRds)) {
		medicalRds = [medicalRds];
	};

	people.forEach(person => {
		medicalRds.forEach(medicalRd => {
			if (person.firstName == medicalRd.firstName && person.lastName == medicalRd.lastName) {
				ages.push(convertDate(medicalRd.birthdate))
			}
		})
	})

	ages.forEach(age => {
		if (age > 18) {
			adult += 1;
		}
		else
			child += 1;
	})

	return { adult, child };
};

const deleteData = (type, oldlist, params) => {
	let newlist = oldlist.filter(x => `id_${type}` != params);
	return newlist;
};

const newData = (type, data, oldlist) => {

	switch (type) {
		case "person":
			console.log(data);
			if (!data.firstName || !data.lastName || !data.address || !data.city || !data.zip || !data.phone || !data.email) {
				return "mauvais format verifiez que tous les champs de la personne soient remplis"
			}
			if (!oldlist || !Array.isArray(oldlist)) {
				oldlist = [oldlist];
			}
			let {
				id_person,
				firstName,
				lastName,
				PersonAddress,
				city,
				zip,
				phone,
				email,
				FirestationIdFirestation,
				fk_id_medical_rd,
			} = data;

			oldlist.push({
				id_person,
				firstName,
				lastName,
				PersonAddress,
				city,
				zip,
				phone,
				email,
				FirestationIdFirestation,
				fk_id_medical_rd,
			});
			break;

		case "firestation":

			if (!oldlist || !Array.isArray(oldlist)) {
				oldlist = [oldlist];
			}
			let { firestationAddress, station } = data;

			oldlist.push({
				firestationAddress,
				station
			});
			break;

		case "medicalRd":

			if (!oldlist || !Array.isArray(oldlist)) {
				oldlist = [oldlist];
			}

			let {
				firstNameMdR,
				lastNameMdR,
				birthdate,
				medications,
				allergies
			} = data;

			oldlist.push({
				firstNameMdR,
				lastNameMdR,
				birthdate,
				medications,
				allergies
			});
			break;

		default:
			break;
	}
	return oldlist;
};


const updateData = (type, newdata, oldlist, params) => {

	switch (type) {
		case "person":
			if (!newdata.id_person || !newdata.firstName || !newdata.lastName || !newdata.address || !newdata.city || !newdata.zip || !newdata.phone || !newdata.email) {
				return "mauvais format verifiez que tous les champs de la personne soient remplis"
			}
			let dataPersonsId = oldlist.find(x => x.id_person == params);
			let {
				firstName,
				lastName,
				personAddress,
				city,
				zip,
				phone,
				email,
				FirestationIdFirestation,
				fk_id_medical_rd,
			} = newdata;

			dataPersonsId.firstName = firstName;
			dataPersonsId.lastName = lastName;
			dataPersonsId.address = personAddress;
			dataPersonsId.city = city;
			dataPersonsId.zip = zip;
			dataPersonsId.phone = phone;
			dataPersonsId.email = email;
			dataPersonsId.FirestationIdFirestation = FirestationIdFirestation;
			dataPersonsId.fk_id_medical_rd = fk_id_medical_rd;

			oldlist.map(obj => [dataPersonsId].find(o => o.id_person === obj.id_person) || obj);
			break;

		case "firestation":

			let dataFirestationId = oldlist.find(x => x.id_firestation == params);
			const { address, number } = newdata;
			dataFirestationId.address = address;
			dataFirestationId.number = number;

			oldlist.map(obj => [dataFirestationId].find(o => o.id_firestation === obj.id_firestation) || obj);
			break;

		case "medicalRd":
			let dataMedicalRdId = oldlist.find(x => x.id_medical_rd == params);
			let {
				firstNameMdR,
				lastNameMdR,
				birthdate,
				medications,
				allergies } = newdata;

			dataMedicalRdId.firstName = firstNameMdR;
			dataMedicalRdId.lastName = lastNameMdR;
			dataMedicalRdId.birthdate = birthdate;
			dataMedicalRdId.medications = medications;
			dataMedicalRdId.allergies = allergies;

			oldlist.map(obj => [dataMedicalRdId].find(o => o.id_medical_rd === obj.id_medical_rd) || obj);
			break;

		default:
			break;
	}

	return oldlist;
};

module.exports = { seperateAdultChild, addFirstation, countingAge, replaceAll, convertDate, deleteData, newData, updateData };