const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('tesoreria', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        tes_valor: {
            type: DataTypes.DOUBLE(14,2),
            allowNull: false,
            defaultValue: 0,
        },
        tes_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tes_detalles: {
           type: DataTypes.STRING,
           allowNull: true,
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
