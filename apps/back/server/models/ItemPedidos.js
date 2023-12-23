const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('itempedidos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ite_cantidad: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
        },
        ite_impuesto: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        ite_preciocosto: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        ite_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        ite_despachado: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        },
    },{tableName: 'itempedidos'},
    { timestamps: true });

};
