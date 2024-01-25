const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('grupos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        gru_detalles: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gru_activo: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },
        sublinea_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'sublineas',
                key: 'id'
            },
        },

    },{tableName: 'grupos'},
    { timestamps: true });

};