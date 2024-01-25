const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('cuentas_bancarias', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cue_banco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cue_numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cue_tipo: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },
        cue_activa: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
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

    },{tableName: 'cuentas_bancarias'},
    { timestamps: true });

};
