const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('puc', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        puc_codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        puc_cuenta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        puc_nivel: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        puc_saldo: {
           type: DataTypes.DOUBLE(14,2),
           defaultValue: 0.00,
        },

    },{tableName: 'puc'},
    { timestamps: true });

};
