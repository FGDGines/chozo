const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('fuentes', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        fue_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fue_iniciales: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fue_mantieneconsecutivo: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'fuentes'},
    { timestamps: false });

};
