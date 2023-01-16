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
    // const user = new User({ ...req.body });
    // await user.save();
    // res.status(201).json(user);
};

exports.getAllRatings = async (req, res) => {
    // const users = await User.find({});
    // res.status(200).json(users);
};

exports.getRatingById = async (req, res) => {
    // const user = await User.findById(req.params.id);
    // if (!user) {
    //     throw new Error("Utilisateur introuvable");
    // }
    // res.status(200).json(user);
};

exports.updateRatingById = async (req, res) => {
    //Check si l'email est déjà utilisé par un autre user
    // if (req.body.email) {
    //     const existingUser = await User.findOne({
    //         email: req.body.email,
    //         id: { $ne: req.params.id },
    //     });
    //     if (existingUser) {
    //         throw new Error("L'adresse email est déjà utilisée");
    //     }
    // }
    // const user = await User.findByIdAndUpdate(
    //     req.params.id,
    //     { ...req.body },
    //     {
    //         new: "true",
    //     }
    // );
    // if (!user) {
    //     throw new Error("Utilisateur introuvable");
    // }
    // res.status(200).json(user);
};

exports.deleteRatingById = async (req, res) => {
    const rating = await Rating.findById(req.params.id);

    console.log(req.user);

    // await Rating.findOneAndDelete(req.params.id);

    res.status(200).json();
};
