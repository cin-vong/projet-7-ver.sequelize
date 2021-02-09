const db = require("../models");
const Comments = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a comment
    const comments = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save comment in the database
    Comments.create(comments)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur pour créer un commentaire."
        });
      });
  };
  
  // Retrieve all comments from the database.
  exports.findAll = (req, res) => {
    const content = req.query.content;
    var condition = content ? { content: { [Op.like]: `%${content}%` } } : null;
  
    Comments.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur de recherche commentaire."
        });
      });
  };
  
  // Find a single comment with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Comments.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };
  
  // Update a comment by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Comments.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Commentaire modifié."
          });
        } else {
          res.send({
            message: `Cannot update Comments with id=${id}. Maybe Comments was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Comments with id=" + id
        });
      });
  };
  
  // Delete a comment with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comments.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Commentaire effacé avec succés !"
          });
        } else {
          res.send({
            message: `Cannot delete Comments with id=${id}. Maybe Comments was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Comments with id=" + id
        });
      });
  };
  
  // Delete all comments from the database.
  exports.deleteAll = (req, res) => {
    Comments.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Commentaire effacé avec succés !` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Problème dans l'effacement commentaire."
        });
      });
  };
  
  // find all published comments
  exports.findAllPublished = (req, res) => {
    Comments.findAll({ where: { published: true } })
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
  