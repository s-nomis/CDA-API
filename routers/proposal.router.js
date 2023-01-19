const express = require("express");
const controller = require("../controllers/proposal.controller");
const { catchErrors } = require("../helpers");
const auth = require("../middlewares/auth");
const router = express.Router();

/**
 * ROUTES
 *
 * POST / - Création d'une Proposal de jeu
 *
 * GET / - Récupere les infos de toutes les Proposals d'un jeu
 * GET /:id - Récupere les infos d'une Proposal d'un jeu correspondant à l'id
 *
 * PUT /:id - Met à jour les infos d'une Proposal d'un jeu correspondant à l'id
 *
 * DELETE /:id - Supprime l'Proposal d'un jeu correspondant à l'id
 */

router.post("/", auth, catchErrors(controller.createProposal));

router.get("/", catchErrors(controller.getAllProposal));

router.get("/:id", catchErrors(controller.getProposalByid));

router.get("/game/:id_game", catchErrors(controller.getProposalByidGame));

router.put("/:id", auth, catchErrors(controller.updateProposalById));

router.delete("/:id",  auth ,catchErrors(controller.deleteProposalById));

module.exports = router;
