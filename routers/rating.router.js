const express = require("express");
const controller = require("../controllers/rating.controller");
const { catchErrors } = require("../helpers");
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

router.post("/", controller.createRating);

router.get("/:id", controller.getRatingByid);

router.put("/:id", controller.updateRatingById);

router.delete("/:id", controller.deleteRatingById);

module.exports = router;
