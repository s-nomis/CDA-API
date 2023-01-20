const express = require("express");
const controller = require("../controllers/file.controller");
const auth = require("../middlewares/auth");
const gridFSinit = require("../middlewares/gridFS");
const { upload } = require("../middlewares/uploads");
const { catchErrors } = require("../helpers");

const router = express.Router();

router.post(
    "/",
    auth,
    upload.single("file"),
    catchErrors(controller.createFile)
);

router.get("/:id", gridFSinit, catchErrors(controller.getFileById));

router.delete("/:id", auth, gridFSinit, catchErrors(controller.deleteFileById));

module.exports = router;
