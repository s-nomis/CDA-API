const express = require("express");
const controller = require("../controllers/router.controller");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../helpers");

const router = express.Router();

/**
 * ROUTES
 *
 * POST / - Création d'une note
 *
 * GET / - Récupere les infos de toutes les notes
 * GET /:id - Récupere les infos de la note correspondant à l'id
 *
 * PUT /:id - Met à jour les infos de la note correspondant à l'id
 *
 * DELETE /:id - Supprime la note correspondant à l'id
 */

router.post("/", auth, catchErrors(controller.createRating));

router.get("/", catchErrors(controller.getAllRatins));
router.get("/:id", catchErrors(controller.getRatingByid));

router.put("/:id", auth, catchErrors(controller.updateRatingById));

router.delete("/:id", auth, catchErrors(controller.deleteRatingById));

module.exports = router;
