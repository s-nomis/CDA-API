const User = require("../models/user.model");
const Extension = require("../models/extension.model");

/**
 * POST
 * createUser - FAIT
 * addGameToLibrary
 * addExtensionToLibrary
 * addPremium
 *
 * GET
 * getAllUsers - FAIT
 * getUserById - FAIT
 * getUserGames - FAIT
 * getUserExtensions
 *
 * PUT
 * updateUserById - FAIT
 * updatePassword
 *
 * DELETE
 * deleteUserById - FAIT
 * deleteGameToLibrary
 * deleteExtensionToLibrary
 */

exports.createUser = async (req, res) => {
    const user = new User({ ...req.body });

    await user.save();

    res.status(201).json(user);
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    res.status(200).json(user);
};

exports.getUserGames = async (req, res) => {
    const user = await User.findById(req.params.id).populate("games");

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    if (user.games.length === 0 ) {
        throw new Error("Pas de jeu dans la base");
    }
    res.status(200).json(user);
};

exports.getUserExtensions = async (req, res) => {
    const user = await User.findById(req.params.id).populate("extensions");

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    if (user.extensions.length === 0 ) {
        throw new Error("Pas d'extension dans la base");
    }
    res.status(200).json(user);
}

exports.updateUserById = async (req, res) => {
    //Check si l'email est déjà utilisé par un autre user
    if (req.body.email) {
        const existingUser = await User.findOne({
            email: req.body.email,
            id: { $ne: req.params.id },
        });

        if (existingUser) {
            throw new Error("L'adresse email est déjà utilisée");
        }
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
            new: "true",
        }
    );

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    res.status(200).json(user);
};

exports.deleteUserById = async (req, res) => {
    await User.findOneAndDelete(req.params.id);

    res.status(200).json();
};
