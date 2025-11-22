module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'ID'
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Username'
        },
        nationalNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'NationalNumber'
        },
        email: {
            type: DataTypes.STRING,
            field: 'Email'
        },
        phone: {
            type: DataTypes.STRING,
            field: 'Phone'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'IsActive'
        }
    }, {
        tableName: 'Users',
        timestamps: false
    });

    return User;
};