const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('paises', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        pai_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pai_codigo: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },{tableName: 'paises'},
    { timestamps: false });

};
