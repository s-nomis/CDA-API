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
