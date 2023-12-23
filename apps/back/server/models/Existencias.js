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

    },{tableName: 'existencias'},
    { timestamps: false });

};
