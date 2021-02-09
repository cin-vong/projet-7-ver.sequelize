const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/post');

// Créer un publication
router.post("/", auth, userCtrl.post.create);

// Trouver un publication
router.get("/", auth, userCtrl.post.findAll);

// Trouver tous les publications
router.get("/published", auth, userCtrl.post.findAllPublished);

// Rechercher un publication avec un id
router.get("/:id", auth, userCtrl.post.findOne);

// Mise à jour avec id
router.put("/:id", auth, userCtrl.post.update);

// Effacer avec id
router.delete("/:id", auth, userCtrl.post.delete);

// Effacer tous les publications
router.delete("/", auth, userCtrl.post.deleteAll);

app.use('/api/post', router);