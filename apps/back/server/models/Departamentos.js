const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('departamentos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        dpt_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dpt_codigo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pais_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'paises',
                key: 'id'
            },
        },

    },{tableName: 'departamentos'},
    { timestamps: false });

};
