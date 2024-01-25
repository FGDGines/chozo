const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('consecutivos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        conse_anual: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        conse_ultimograbado: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        fuente_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'fuentes',
                key: 'id'
            },
        },

    },{tableName: 'consecutivos'},
    { timestamps: false });

};