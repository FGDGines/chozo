const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('proveedores', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        pro_plazo: {
            type: DataTypes.INTEGER,
            defaultValue: 30,
        },
        pro_activo: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },

    },{tableName: 'proveedores'},
    { timestamps: false });

};