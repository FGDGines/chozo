const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('articulos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        art_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        art_referencia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        art_codbarra: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        art_imagen: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        art_ultimocosto: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
        },
        art_costopromedio: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
        },
        art_factorconversion: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        art_precioventa: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
        },
        art_impuestoventa: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        art_activo: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },

    },{tableName: 'articulos'},
    { timestamps: true });

};