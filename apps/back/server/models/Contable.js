const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('contable', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        con_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        con_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        con_valor: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
        },
        con_detalles: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        con_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        fuente_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'fuentes',
                key: 'id'
            },
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
        usuario_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'usuarios',
                key: 'id'
            },
        },

    },{tableName: 'contable'},
    { timestamps: false });

};
