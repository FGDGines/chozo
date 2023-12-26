const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('contable', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        con_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        con_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        con_valor: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        con_detalles: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        con_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'contable'},
    { timestamps: false });

};
