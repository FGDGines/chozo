const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('cajas', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        caj_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        caj_activa: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },

    },{tableName: 'cajas'},
    { timestamps: true });

};
