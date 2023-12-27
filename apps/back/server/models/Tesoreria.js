const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('tesoreria', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        tes_debitos: {
            type: DataTypes.DOUBLE(14,2),
            allowNull: false,
            defaultValue: 0,
        },
        tes_creditos: {
            type: DataTypes.DOUBLE(14,2),
            allowNull: false,
            defaultValue: 0,
        },
        tes_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cuentabancaria_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        tes_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'tesoreria'},
    { timestamps: false });

};
