const express = require("express");
const controller = require("../controllers/affiliatesLink.controller");
const auth = require("../middlewares/auth");
const { catchErrors } = require("../helpers");

const router = express.Router();


router.post("/",  catchErrors(controller.createAffiliatesLink));

router.get("/", catchErrors(controller.getAllAffiliatesLinks));

router.get("/:id", catchErrors(controller.getAffiliatesLinkById));
router.get("/:id/extensions", catchErrors(controller.getAffiliatesLinkExtension));
router.get("/:id/game", catchErrors(controller.getAffiliatesLinkGame));

router.put("/:id",  catchErrors(controller.updateAffiliatesLinkById));

router.delete("/:id", catchErrors(controller.deleteAffiliatesLinkById));

module.exports = router;
