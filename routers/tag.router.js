const express = require("express");
const controller = require("../controllers/tag.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

/**
 * ROUTES
 *
 * POST / - Création d'un tag
 *
 * GET / - Récupere les infos de tous les tags existant
 * GET /:id - Récupere les infos d'un tag correspondant à l'id
 *
 * PUT /:id - Met à jour les infos d'un tag correspondant à l'id
 *
 * DELETE /:id - Supprime le tag correspondant à l'id
 */

router.post("/", auth, controller.createTag);

router.get("/" ,controller.getAllTags);
router.get("/:id", controller.getTagById);

router.put("/:id", auth, controller.updateTagById);

router.delete("/:id",auth,  controller.deleteTagById);

module.exports = router;
