const Rating = require("../models/rating.model");
const Game = require("../models/game.model");
const Extension = require("../models/extension.model");
const User = require("../models/user.model");
const Error = require("../errors/APIError");

/**
 * POST
 * createRating - FAIT
 *
 * GET
 * getAllRatings - FAIT
 *
 * PUT
 * updateRatingById
 *
 * DELETE
 * deleteRatingById
 */

exports.createGameRating = async (req, res) => {

    const game = await Game.findById(req.params.id);

    if (!game) {
        throw new Error("Jeu introuvable", 404);
    }

    const rating = new Rating({ ...req.body, owner_id: req.user._id, game_id: game.id});
    await rating.save();

    res.status(201).json(rating);
};

exports.createExtensionRating = async (req, res) => {

    const extension = await Extension.findById(req.params.id);

    if (!extension) {
        throw new Error("Extension introuvable", 404);
    }

    const rating = new Rating({ ...req.body, owner_id: req.user._id, extension_id: extension.id});
    await rating.save();

    res.status(201).json(rating);
};

exports.getAllGameRatings = async (req, res) => {

    const game = await Game.findById(req.params.id);

    if (!game) {
        throw new Error("Jeu introuvable", 404);
    }

    const ratings = await Rating.find({game_id: game.id});

    if (ratings.length === 0 ) {
        throw new Error("Le jeu n'a pas encore été noté", 404);
    }

    res.status(200).json(ratings);
};

exports.getAllExtensionRatings = async (req, res) => {

    const extension = await Extension.findById(req.params.id);

    if (!extension) {
        throw new Error("Extension introuvable", 404);
    }

    const ratings = await Rating.find({extension_id: extension.id});

    if (ratings.length === 0 ) {
        throw new Error("L'extension n'a pas encore été notée", 404);
    }

    res.status(200).json(ratings);
};

exports.updateRatingById = async (req, res) => {
    const rating = await Rating.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
            new: "true",
        }
    );

    if (!Rating) {
        throw new Error("Utilisateur introuvable");
    }

    res.status(200).json(rating);
};

exports.deleteRatingById = async (req, res) => {
    await Rating.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
