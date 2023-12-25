const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('tipoterceros', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        tter_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{tableName: 'tipoterceros'},
    { timestamps: false });

};
