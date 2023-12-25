const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('lineas', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        lin_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lin_activa: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },

    },{tableName: 'lineas'},
    { timestamps: true });

};
