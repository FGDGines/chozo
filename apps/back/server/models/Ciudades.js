const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('ciudades', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ciu_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ciu_codigo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        departamento_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'departamentos',
                key: 'id'
            },
        }

    },{tableName: 'ciudades'},
    { timestamps: false });

};
