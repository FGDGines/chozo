const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('agencias_transporte', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

    },{tableName: 'agencias_transporte'},
    { timestamps: false });

};
