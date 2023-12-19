const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('ciudades', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ciu_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ciu_codigo: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },{tableName: 'ciudades'},
    { timestamps: false });

};
