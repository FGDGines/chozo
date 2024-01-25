const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('usuarios', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        usu_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usu_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usu_admin: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        usu_activo: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },
        tercero_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'terceros',
                key: 'id'
            },
        },

    },{tableName: 'usuarios'},
    { timestamps: true });

};
