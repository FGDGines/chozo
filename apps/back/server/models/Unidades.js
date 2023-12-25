const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('unidades', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        uni_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uni_abreviatura: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{tableName: 'unidades'},
    { timestamps: false });

};