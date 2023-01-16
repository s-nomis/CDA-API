const express = require("express");

const { catchErrors } = require("../helpers");

const router = express.Router();

/**
 * ROUTES
 *
 * POST / - Création d'une extension de jeu
 *
 * GET / - Récupere les infos de toutes les extensions d'un jeu
 * GET /:id - Récupere les infos d'une extension d'un jeu correspondant à l'id
 *
 * PUT /:id - Met à jour les infos d'une extension d'un jeu correspondant à l'id
 *
 * DELETE /:id - Supprime l'extension d'un jeu correspondant à l'id
 */

router.post("/", catchErrors());

router.get("/", catchErrors());
router.get("/:id", catchErrors());

router.put("/:id", catchErrors());

router.delete("/:id", catchErrors());

module.exports = router;
