const express = require("express");
const controller = require("../controllers/rating.controller");
const { catchErrors } = require("../helpers");
const auth = require("../middlewares/auth");

const router = express.Router();

/**
 * ROUTES
 *
 * POST / - Création d'un Rating
 *
 * GET / - Récupere les infos de tous les Ratings existant
 * GET /:id - Récupere les infos d'un Rating correspondant à l'id
 *
 * PUT /:id - Met à jour les infos d'un Rating correspondant à l'id
 *
 * DELETE /:id - Supprime le Rating correspondant à l'id
 */

router.post("/game/:id/ratings", auth, catchErrors(controller.createGameRating));

router.post("/extension/:id/ratings", auth, catchErrors(controller.createExtensionRating));

router.get("/game/:id/ratings", catchErrors(controller.getAllGameRatings));

router.get("/extension/:id/ratings", catchErrors(controller.getAllExtensionRatings));

router.put("/:id", auth, catchErrors(controller.updateRatingById));

router.delete("/:id", auth, catchErrors(controller.deleteRatingById));

module.exports = router;
