const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('items_formasdepago', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ite_fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cuentabanco_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        ite_valor: {
            type: DataTypes.DOUBLE(14,2),
            allowNull: false,
            defaultValue: 0,
        },
        ite_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        formapago_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'formasdepago',
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
        usuario_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'usuarios',
                key: 'id'
            },
        },

    },{tableName: 'items_formasdepago'},
    { timestamps: true });

};
