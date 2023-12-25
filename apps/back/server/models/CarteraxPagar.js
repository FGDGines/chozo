const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('carteraxpagar', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cxp_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cxp_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cxp_fechavence: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cxp_bruto: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        },
        cxp_impuesto: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        },
        cxp_total: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        },
        cxp_retenciones: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        },
        cxp_abonos: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        },
        cxp_anulada: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'carteraxpagar'},
    { timestamps: true });

};
