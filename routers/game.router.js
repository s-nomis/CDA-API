const express = require("express");
const controller = require("../controllers/game.controller");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../helpers");

const router = express.Router();

/**
 * ROUTES
 *
 * POST / - Création d'un jeu
 *
 * GET / - Récupere les infos de tous les jeux
 * GET /:id - Récupere les infos du jeu correspondant à l'id
 *
 * PUT /:id - Met à jour les infos du jeu correspondant à l'id
 *
 * DELETE /:id - Supprime le jeu correspondant à l'id
 */

router.post("/", auth, catchErrors(controller.createGame));

router.get("/", catchErrors(controller.getAllGames));
router.get("/:id", catchErrors(controller.getGameByid));
router.get("/:id/extensions", catchErrors(controller.getGameExtensions));
router.get("/barcode/:id", catchErrors(controller.getGameByBarcode));

router.put("/:id", auth, catchErrors(controller.updateGameById));

router.delete("/:id", auth, catchErrors(controller.deleteGameById));

module.exports = router;
