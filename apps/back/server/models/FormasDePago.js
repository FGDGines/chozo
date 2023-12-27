const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('formasdepago', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fpag_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fpag_manejabanco: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'formasdepago'},
    { timestamps: false });

};
