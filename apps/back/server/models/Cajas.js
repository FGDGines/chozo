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
        usuario_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'usuarios',
                key: 'id'
            },
        },
        puc_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'puc',
                key: 'id'
            },
        },

    },{tableName: 'cajas'},
    { timestamps: true });

};
