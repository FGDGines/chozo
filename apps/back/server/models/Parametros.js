const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('parametros', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        para_codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        para_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        para_valor: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{tableName: 'parametros'},
    { timestamps: true });

};