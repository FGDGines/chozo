const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('items_tesoreria', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ite_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ite_tipo: {
            type: DataTypes.TINYINT(1),
            defaultValue: 1,
        },
        carteraxcobrar_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        carteraxpagar_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        ite_valor: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        ite_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'items_tesoreria'},
    { timestamps: false });

};
