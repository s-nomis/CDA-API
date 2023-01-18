const Extension = require("../models/extension.model");

/**
 * POST
 * createExtension
 *
 * GET
 * getAllExtensions
 * getExtensionById
 *
 * PUT
 * updateExtensionById
 *
 * DELETE
 * deleteExtensionById
 */

exports.createExtension = async (req, res) => {
    const extension = new Extension({ ...req.body });

    await Extension.save();

    res.status(201).json(extension);
};

exports.getAllExtension = async (req, res) => {
    console.log(req.params.game_id);
    const extension = await Extension.find();

    res.status(200).json(extension);
};

// find extensionBYId l'id est l'id du jeu sur lequel on veut les extensions
exports.getExtensionByid = async (req, res) => {
    const extension = await Extension.find({ game_id: req.params.game_id });

    if (!extension) {
        throw new Error("Jeu introuvable");
    }

    res.status(200).json(extension);
};

exports.updateExtensionById = async (req, res) => {
    const extension = await Extension.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
            new: "true",
        }
    );

    if (!Extension) {
        throw new Error("Utilisateur introuvable");
    }

    res.status(200).json(extension);
};

exports.deleteExtensionById = async (req, res) => {
    await Extension.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
