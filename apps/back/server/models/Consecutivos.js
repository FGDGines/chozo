const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('consecutivos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        conse_anual: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        conse_ultimograbado: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

    },{tableName: 'consecutivos'},
    { timestamps: false });

};