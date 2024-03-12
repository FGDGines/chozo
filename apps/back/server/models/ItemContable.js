const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('itemcontable', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ite_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ite_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ite_debito: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
            allowNull: false,
        },
        ite_credito: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
            allowNull: false,
        },  
        ite_base: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
            allowNull: false,
        },  
        ite_saldo: {
            type: DataTypes.DOUBLE(14,2),
            defaultValue: 0,
            allowNull: false,
        },  
        ite_detalles: {
            type: DataTypes.STRING,
            allowNull: true,
        },      
        ite_anulado: {
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
        puc_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'puc',
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

    },{tableName: 'itemcontable'},
    { timestamps: false });

};
