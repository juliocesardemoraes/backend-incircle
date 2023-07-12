var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'innergy',
    'postgres',
    'thiago9645',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres',
        timestamps: false
    }
);
module.exports = sequelize;