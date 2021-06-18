
const Sequelize = require('sequelize');

const sequelize = new Sequelize('safetyNet', process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const persons = require('./persons')(sequelize);
const firestations = require('./firestations')(sequelize);
const medicalRds = require('./medicalRecords')(sequelize);

persons.hasOne(medicalRds, {
    onDelete: 'cascade',
});

firestations.hasMany(persons, {
    onDelete: 'cascade'
});

const models = {
    Person: persons,
    MedicalRd: medicalRds,
    Firestation: firestations
}

exports.sequelize = sequelize

exports.models = models