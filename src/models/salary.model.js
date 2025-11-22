module.exports = (sequelize, DataTypes) => {
    const salary = sequelize.define('salary', {
        'id': {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        'year': {
            type: DataTypes.INTEGER
        },
        'month': {
            type: DataTypes.INTEGER
        },
        'salary': {
            type: DataTypes.FLOAT
        },
        'userId': {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'Salaries',
        timestamps: false
    });

    return salary;
};