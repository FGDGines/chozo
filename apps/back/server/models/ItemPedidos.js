const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('itempedidos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ite_cantidad: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
        },
        ite_impuesto: {
            type: DataTypes.DOUBLE(12,2),
            allowNull: false,
            defaultValue: 0,
        },
        ite_preciocosto: {
            type: DataTypes.DOUBLE(12,2),
            allowNull: false,
            defaultValue: 0,
        },
        ite_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        ite_despachado: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        },
        pedido_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'pedidos',
                key: 'id'
            },
        },
        articulo_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'articulos',
                key: 'id'
            },
        },
    },{tableName: 'itempedidos'},
    { timestamps: true });

};
