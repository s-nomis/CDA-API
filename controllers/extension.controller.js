const APIError = require("../errors/APIError");
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
    const extension = await Extension.find({});

    res.status(200).json(extension);
};

exports.getExtensionById = async (req, res) => {
    const extension = await Extension.findById(req.params.id);

    if (!extension) {
        throw new APIError("Extension introuvable", 404);
    }

    res.status(200).json(extension);
};

exports.getExtensionByBarcode = async (req, res) => {
    const extension = await Extension.find({ barcode: req.params.id });

    if (!extension) {
        throw new APIError("Extension introuvable", 404);
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
        throw new APIError("Extension introuvable", 404);
    }

    res.status(200).json(extension);
};

exports.deleteExtensionById = async (req, res) => {
    await Extension.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
