const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('terceros', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ter_documento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ter_tercero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ter_apellidos: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ter_nombres: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ter_direccion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ter_telefono: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        ter_email: {
            type: DataTypes.STRING,
            allowNull: true,
        },  
        ter_celular: {
            type: DataTypes.STRING,
            allowNull: true,
        },     
 
    },{tableName: 'terceros'},
    { timestamps: true });

};
