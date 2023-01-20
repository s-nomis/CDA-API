const express = require("express");
const controller = require("../controllers/extension.controller");
const { catchErrors } = require("../helpers");
const auth = require("../middlewares/auth");
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
router.get("/:id", catchErrors(controller.getExtensionById));
router.get("/barcode/:id", catchErrors(controller.getExtensionByBarcode));

router.put("/:id", auth, catchErrors(controller.updateExtensionById));

router.delete("/:id", auth, catchErrors(controller.deleteExtensionById));

module.exports = router;
