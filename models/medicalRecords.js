const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const MedicalRd = sequelize.define('MedicalRd', {
        id_medical_rd: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        medications: {
            type: DataTypes.JSON,
            allowNull: true
        },
        allergies: {
            type: DataTypes.JSON,
            allowNull: true
        },
    });
    return MedicalRd;
}