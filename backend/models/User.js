module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING, required: true, unique: true
    },
    description: {
      type: Sequelize.STRING, required: true
    },
    name: {
      type: Sequelize.STRING, required: true
    }
  });

  return User;
};