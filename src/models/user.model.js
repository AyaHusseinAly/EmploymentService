module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        'id': {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        'username': {
            type: DataTypes.STRING,
            allowNull: false
        },
        'nationalNumber': {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        'email': {
            type: DataTypes.STRING
        },
        'phone': {
            type: DataTypes.STRING
        },
        'isActive': {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'Users',
        timestamps: false
    });

    return user;
};