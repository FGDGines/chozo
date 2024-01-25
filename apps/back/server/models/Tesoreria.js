const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('tesoreria', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        tes_valor: {
            type: DataTypes.DOUBLE(14,2),
            allowNull: false,
            defaultValue: 0,
        },
        tes_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tes_detalles: {
           type: DataTypes.STRING,
           allowNull: true,
        },
        cuentabancaria_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        tes_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        contable_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'contable',
                key: 'id'
            },
        },
        caja_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'cajas',
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
        fuente_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'fuentes',
                key: 'id'
            },
        },

    },{tableName: 'tesoreria'},
    { timestamps: false });

};
