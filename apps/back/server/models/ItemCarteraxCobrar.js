const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('items_carteraxcobrar', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        ite_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codigo_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        ite_valorunitario: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
        },
        ite_impuesto: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        ite_preciocosto: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,            
        },
        ite_cantidad: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        },
        ite_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    },{tableName: 'items_carteraxcobrar'},
    { timestamps: true });

};
