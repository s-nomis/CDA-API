const express = require("express");
const controller = require("../controllers/extension.controller");
const { catchErrors } = require("../helpers");
const auth = require("../middlewares/auth");
const router = express.Router();




router.get("/:id", catchErrors(controller.getExtensionByid));


module.exports = router;
