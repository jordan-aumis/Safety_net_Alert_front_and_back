const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Firestation = sequelize.define('Firestation', {
        id_firestation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        station: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Firestation;
}