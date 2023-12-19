const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('departamentos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        dpt_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dpt_codigo: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },{tableName: 'departamentos'},
    { timestamps: false });

};
