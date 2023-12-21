const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('sublineas', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        sub_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_activa: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },

    },{tableName: 'sublineas'},
    { timestamps: true });

};