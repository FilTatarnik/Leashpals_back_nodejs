const { Sequelize } = require("sequelize");

    const sequelize = new Sequelize('database', 'username', 'password', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5433,
    });

module.exports = Sequelize;