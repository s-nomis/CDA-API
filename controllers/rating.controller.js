const Rating = require("../models/rating.model");
const Game = require("../models/game.model");
const User = require("../models/user.model");

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

exports.createRating = async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (!game) {
        throw new Error("Jeu introuvable");
    }

    const rating = new Rating({ ...req.body, owner_id: req.user._id, game_id: game.id});
    await rating.save();

    res.status(201).json(rating);
};

exports.getAllRatings = async (req, res) => {

    const game = await Game.findById(req.params.id);

    if (!game) {
        throw new Error("Jeu introuvable");
    }

    const ratings = await Rating.find({game_id: game.id});

    if (ratings.length === 0 ) {
        throw new Error("Le jeu n'a pas encore été noté");
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
