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
        linea_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'lineas',
                key: 'id'
            },
        },
        pucinventario_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'puc',
                key: 'id'
            },
        },
        pucingresos_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'puc',
                key: 'id'
            },
        },
        puccostoventa_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'puc',
                key: 'id'
            },
        },

    },{tableName: 'sublineas'},
    { timestamps: true });

};