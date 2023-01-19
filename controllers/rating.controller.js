const Rating = require("../models/rating.model");

/**
 * POST
 * createRating
 *
 * GET
 * getAllRatings
 * getRatingById
 *
 * PUT
 * updateRatingById
 *
 * DELETE
 * deleteRatingById
 */

exports.createRating = async (req, res) => {
    const rating = new Rating({ ...req.body });

    await Rating.save();

    res.status(201).json(rating);
};

exports.getRatingByid = async (req, res) => {
    const rating = await Rating.findById({game_id:req.params.game_id});
  
    if (!rating) {
        throw new Error("Jeu introuvable");
    }

    res.status(200).json(rating);
};

exports.updateRatingById = async (req, res) => {
    const rating = await Rating.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
            new: "true",
        }
    );
    // bob larley
    if (!Rating) {
        throw new Error("Utilisateur introuvable");
    }

    res.status(200).json(rating);
};

exports.deleteRatingById = async (req, res) => {
    await Rating.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
