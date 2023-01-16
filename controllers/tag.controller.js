const Tag = require("../models/tag.model");

/**
 * POST
 * createTag - FAIT
 *
 * GET
 * getAllTags - FAIT
 * getTagById - FAIT
 *
 * PUT
 * updateTagById - FAIT
 *
 * DELETE
 * deleteTagById - FAIT
 */

exports.createTag = async (req, res) => {
    try {
        const tag = new Tag({
            ...req.body,
        });

        await tag.save();

        res.status(201).json(tag);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find({});

        res.status(200).json(tags);
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.getTagById = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);

        if (!tag) {
            return res.status(404).json({
                message: "Tag introuvable",
            });
        }

        res.status(200).json(tag);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
};

exports.updateTagById = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { returnDocument: "after" }
        );

        res.status(200).json(tag);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
};

exports.deleteTagById = async (req, res) => {
    try {
        await Tag.findByIdAndDelete(req.params.id);

        res.status(200).json();
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
};
