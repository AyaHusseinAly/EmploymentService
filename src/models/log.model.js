module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define("Log", {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Level: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        Message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Context: {
            type: DataTypes.JSON,
            allowNull: true
        },
        Timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "Logs",
        timestamps: false
    });

    return Log;
};