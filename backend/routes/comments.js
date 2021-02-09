const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/comments');

// Créer un commentaire
router.post("/", auth, userCtrl.comments.create);

// Trouver un commentaire
router.get("/", auth, userCtrl.comments.findAll);

// Trouver tous les commentaires
router.get("/published", auth, userCtrl.comments.findAllPublished);

// Rechercher un commentaire avec un id
router.get("/:id", auth, userCtrl.comments.findOne);

// Mise à jour avec id
router.put("/:id", auth, userCtrl.comments.update);

// Effacer avec id
router.delete("/:id", auth, userCtrl.comments.delete);

// Effacer tous les commentaires
router.delete("/", auth, userCtrl.comments.deleteAll);

app.use('/api/comments', router);