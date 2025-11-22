// src/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: dbConfig.pool,
        logging: false
    }
);

const models = {};
models.user = require('./user.model')(sequelize, DataTypes);
models.salary = require('./salary.model')(sequelize, DataTypes);

require('./associations')(models);

models.Sequelize = Sequelize;

module.exports = models;