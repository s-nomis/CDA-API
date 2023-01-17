const express = require("express");
const controller = require("../controllers/user.controller");
const { catchErrors } = require("../helpers");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * ROUTES
 *
 * POST / - Création d'un utilisateur
 * POST /:id/games/:id - Ajout du jeu correspondant l'id à la ludothèque de l'utilisateur
 * POST /:id/extensions/:id - Ajout de l'extension correspondant l'id à la ludothèque de l'utilisateur
 * POST /:id/premium - Ajoute ou supprime le premium à l'utilisateur
 *
 * GET / - Récupere les infos de tous les utilisateurs
 * GET /:id - Récupere les infos de l'utilisateur correspondant à l'id
 * GET /:id/games - Récupere les infos des jeux présent dans la ludothèque de l'utilisateur
 * GET /:id/extensions - Récupere les infos des extensions présent dans la ludothèque de l'utilisateur
 *
 * PUT /:id - Met à jour les infos de l'utilisateur correspondant à l'id
 * PUT /:id/password - Met à jour le mot de passe de l'utilisateur
 *
 * DELETE /:id - Supprime l'utilisateur correspondant à l'id
 * DELETE /:id/games/:id - Supprime le jeu correspondant à l'id de la ludothèque de l'utilisateur
 * DELETE /:id/extensions/:id - Supprime l'extension correspondant à l'id de la ludothèque de l'utilisateur
 */

router.post("/", catchErrors(controller.createUser));

router.get("/", auth, catchErrors(controller.getAllUsers));

router.get("/:id", auth, catchErrors(controller.getUserById));

router.get("/:id/games", auth, catchErrors(controller.getUserGames));

router.get("/:id/extensions", auth, catchErrors(controller.getUserExtensions));

router.put("/:id", auth, catchErrors(controller.updateUserById));

router.delete("/:id", auth, catchErrors(controller.deleteUserById));

module.exports = router;
