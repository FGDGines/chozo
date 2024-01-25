const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('agencias_transporte', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        tercero_id: {
            type: DataTypes.BIGINT(20),
            defaultValue: 0,
            allowNull: false,
            references: {
                models: 'terceros',
                key: 'id'
            },
        },
    },{tableName: 'agencias_transporte'},
    { timestamps: false });

};
