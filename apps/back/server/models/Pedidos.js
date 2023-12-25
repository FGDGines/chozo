const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('pedidos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ped_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ped_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ped_estado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        ped_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        ped_valor: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
        },
        factura_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        ped_solicitante: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },{tableName: 'pedidos'},
    { timestamps: false });

};
