const mockChildrenAndPArents = [{ "firstName":"John", "lastName":"Boyd", "address":"1509 Culver St", },{ "firstName":"Jacob", "lastName":"Boyd", "address":"1509 Culver St" },
    {"firstName":"Tenley", "lastName":"Boyd", "address":"1509 Culver St" },
    { "firstName":"Roger", "lastName":"Boyd", "address":"1509 Culver St" },
    { "firstName":"Felicia", "lastName":"Boyd", "address":"1509 Culver St" },];

const mockMedicalReport = [{ "firstName":"John", "lastName":"Boyd", "birthdate":"1984-06-03"},
{ "firstName":"Jacob", "lastName":"Boyd", "birthdate":"1989-06-03"},
{ "firstName":"Tenley", "lastName":"Boyd", "birthdate":"2012-18-02"},
{ "firstName":"Roger", "lastName":"Boyd", "birthdate":"2017-06-09"},
{ "firstName":"Felicia", "lastName":"Boyd","birthdate":"1986-08-01"}]

const mockOnePerson = { "firstName":"John", "lastName":"Boyd", "address":"1509 Culver St", };

const mockOneFireStation = { "address":"1509 Culver St", "station":"3" };

const mockPersonToAdd =  { "id_person":1, "firstName":"TITOUAN", "lastName":"MUGIWARA", "address":"rue test", "city":"Test-city", "zip":"test93", "phone":"0000000000", "email":"test@email.com" }

const mockListFilled = [
    { "id_person":1, "firstName":"SIMON", "lastName":"JOBA", "address":"rue test", "city":"Test-city", "zip":"test93", "phone":"0000000000", "email":"test@email.com" }, 
    { "id_person":2, "firstName":"SIMON", "lastName":"JOBA", "address":"rue test", "city":"Test-city", "zip":"test93", "phone":"0000000000", "email":"test@email.com" }, 
    { "id_person":2, "firstName":"SIMON", "lastName":"JOBA", "address":"rue test", "city":"Test-city", "zip":"test93", "phone":"0000000000", "email":"test@email.com" }, 
    { "id_person":2, "firstName":"SIMON", "lastName":"JOBA", "address":"rue test", "city":"Test-city", "zip":"test93", "phone":"0000000000", "email":"test@email.com" }]

module.exports = { mockChildrenAndPArents, mockMedicalReport, mockOnePerson, mockOneFireStation, mockPersonToAdd, mockListFilled}