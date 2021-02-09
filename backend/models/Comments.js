  module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
      content: {
        type: Sequelize.STRING, required: true, unique: true
      },
      attachement: {
        type: Sequelize.STRING, required: true
      },
    });
  
    return Comments;
  };