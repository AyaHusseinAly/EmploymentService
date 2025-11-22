module.exports = (sequelize, DataTypes) => {
    const Salary = sequelize.define('Salary', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID'
        },
        year: {
            type: DataTypes.INTEGER,
            field: 'Year'
        },
        month: {
            type: DataTypes.INTEGER,
            field: 'Month'
        },
        salary: {
            type: DataTypes.FLOAT,
            field: 'Salary'
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'UserID'
        }
    }, {
        tableName: 'Salaries',
        timestamps: false
    });

    return Salary;
};