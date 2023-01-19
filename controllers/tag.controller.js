const APIError = require("../errors/APIError");
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
    const tag = new Tag({
        ...req.body,
    });

    await tag.save();

    res.status(201).json(tag);
};

exports.getAllTags = async (req, res) => {
    const tags = await Tag.find({});

    res.status(200).json(tags);
};

exports.getTagById = async (req, res) => {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
        throw new APIError("Tag introuvable", 404);
    }

    res.status(200).json(tag);
};

exports.updateTagById = async (req, res) => {
    const tag = await Tag.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { returnDocument: "after" }
    );

    res.status(200).json(tag);
};

exports.deleteTagById = async (req, res) => {
    await Tag.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
