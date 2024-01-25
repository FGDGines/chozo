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
        tercero_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'terceros',
                key: 'id'
            },
        },
        agencia_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'agencias_transporte',
                key: 'id'
            },
        },

    },{tableName: 'proveedores'},
    { timestamps: false });

};