  module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      content: {
        type: Sequelize.STRING, required: true, unique: true
      },
      attachement: {
        type: Sequelize.STRING, required: true
      },
    });
  
    return Post;
  };