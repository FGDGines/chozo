const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('carteraxpagar', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cxp_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cxp_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cxp_fechavence: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cxp_bruto: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
            allowNull: false,
        },
        cxp_impuesto: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
            allowNull: false,
        },
        cxp_total: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
            allowNull: false,
        },
        cxp_retenciones: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
            allowNull: false,
        },
        cxp_abonos: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
            allowNull: false,
        },
        cxp_anulada: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
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
        contable_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'contable',
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
        puc_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'puc',
                key: 'id'
            },
        },

    },{tableName: 'carteraxpagar'},
    { timestamps: true });

};
