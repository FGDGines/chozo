const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('grupos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        gru_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gru_activo: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },

    },{tableName: 'grupos'},
    { timestamps: true });

};