const express = require("express");
const controller = require("../controllers/auth.controller");
const { catchErrors } = require("../helpers");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * ROUTES
 *
 * POST /login - Connexion d'un utilisateur
 * POST /logout - Déconnexion d'un utilisateur
 */

router.post("/login", catchErrors(controller.login));
router.post("/logout", catchErrors(controller.logout));

module.exports = router;
