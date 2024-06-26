const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('item_carteraxpagar', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        item_pedidoid: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false,
        },
        ite_cantidad: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0,
            allowNull: false,
        },
        ite_valorunitario: {
            type: DataTypes.DOUBLE(12,2),
            defaultValue: 0.00,
            allowNull: false,            
        },
        ite_detalles: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ite_anulado: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false,
        },
        carteraxp_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'carteraxpagar',
                key: 'id'
            },
        },

    },{tableName: 'item_carteraxpagar'},
    { timestamps: false });

};
