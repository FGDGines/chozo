const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('existencias', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        exi_cantidad: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            allowNull: false,
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

    },{tableName: 'existencias'},
    { timestamps: false });

};
