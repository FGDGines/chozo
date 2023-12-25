const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('tipodocumentos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        tdoc_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{tableName: 'tipodocumentos'},
    { timestamps: false });

};
