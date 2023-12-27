const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('items_formasdepago', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ite_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cuentabanco_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        ite_valor: {
            type: DataTypes.DOUBLE(14,2),
            allowNull: false,
            defaultValue: 0,
        },
        ite_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'items_formasdepago'},
    { timestamps: true });

};
