const db = require("../models");
const Comments = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a post
    const post = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save comment in the database
    Post.create(post)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur pour créer un post."
        });
      });
  };
  
  // Retrieve all posts from the database.
  exports.findAll = (req, res) => {
    const Title = req.query.content;
    var condition = Title ? { Title: { [Op.like]: `%${content}%` } } : null;
  
    Comments.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur de recherche post."
        });
      });
  };
  
  // Find a single post with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Comments.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving post with id=" + id
        });
      });
  };
  
  // Update a post by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Post.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "post modifié."
          });
        } else {
          res.send({
            message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating post with id=" + id
        });
      });
  };
  
  // Delete a post with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "post effacé avec succés !"
          });
        } else {
          res.send({
            message: `Cannot delete post with id=${id}. Maybe post was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete post with id=" + id
        });
      });
  };
  
  // Delete all comments from the database.
  exports.deleteAll = (req, res) => {
    Post.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} post effacé avec succés !` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Problème dans l'effacement post."
        });
      });
  };
  
  // find all published comments
  exports.findAllPublished = (req, res) => {
    Post.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur de recherche."
        });
      });
  };
  