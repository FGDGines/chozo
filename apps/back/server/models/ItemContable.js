const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('itemcontable', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ite_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ite_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ite_debito: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
            allowNull: false,
        },
        ite_credito: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
            allowNull: false,
        },  
        ite_detalles: {
            type: DataTypes.STRING,
            allowNull: true,
        },      
        ite_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'itemcontable'},
    { timestamps: false });

};
