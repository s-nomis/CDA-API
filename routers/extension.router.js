const express = require("express");
const controller = require("../controllers/extension.controller");
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

router.post("/", catchErrors(controller.createExtension));

router.get("/", catchErrors(controller.getAllExtension));
router.get("/:id", catchErrors(controller.getExtensionByid));

router.put("/:id", catchErrors(controller.updateExtensionById));

router.delete("/:id", catchErrors(controller.deleteExtensionById));

module.exports = router;
