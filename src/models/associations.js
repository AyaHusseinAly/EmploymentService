module.exports = (models) => {
    models.user.hasMany(models.salary, { foreignKey: 'userId', as: 'salaries' });
    models.salary.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
};