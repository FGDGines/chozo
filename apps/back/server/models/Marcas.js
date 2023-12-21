const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('marcas', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        mar_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mar_activa: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },

    },{tableName: 'marcas'},
    { timestamps: false });

};