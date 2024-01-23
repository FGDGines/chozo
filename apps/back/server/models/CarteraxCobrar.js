const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('carteraxcobrar', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cxc_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cxc_fechafac: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cxc_fechavenc: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cxc_bruto: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        cxc_impuesto: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        cxc_valor: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        cxc_retenciones: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        cxc_descuentos: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        cxc_abonos: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        cxc_metodopago: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },
        cxc_anulada: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'carteraxcobrar'},
    { timestamps: true });

};
