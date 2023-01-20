const mongoose = require("mongoose");
const APIError = require("../errors/APIError");

exports.createFile = async (req, res) => {
    res.status(201).json(req.file);
};

exports.getFileById = async (req, res) => {
    const file = await req.gfs.files.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
    });

    if (!file || file.length === 0) {
        throw new APIError("L'image du jeu n'existe pas", 404);
    }

    if (
        !file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
    ) {
        throw new APIError("Le format du fichier est incorrect", 400);
    }

    // req.gridfsBucket.openDownloadStreamByName(file.filename).pipe(res);
    res.status(200).json(file);
};

exports.deleteFileById = async (req, res) => {
    await req.gridfsBucket.delete(new mongoose.Types.ObjectId(req.params.id));
    res.status(200).json();
};
