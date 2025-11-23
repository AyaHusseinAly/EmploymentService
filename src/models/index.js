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
models.log = require('./log.model')(sequelize, DataTypes);

require('./associations')(models);

models.Sequelize = Sequelize;
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables synced successfully');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

module.exports = models;