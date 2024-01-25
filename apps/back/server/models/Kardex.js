const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('kardex', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        kar_entradas: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            allowNull: false,
        },
        kar_salidas: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            allowNull: false,
        },
        kar_preciocosto: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
            allowNull: false,
        },
        kar_valorunitario: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
        },
        kar_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        kar_impuesto: {
            type: DataTypes.INTEGER,
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
        articulo_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'articulos',
                key: 'id'
            },
        },
 
    },{tableName: 'kardex'},
    { timestamps: true });

};
