const Extension = require("../models/extension.model");
const Game = require("../models/game.model");
const User = require("../models/user.model");

/**
 * POST
 * createUser - FAIT
 * addGameToLibrary - FAIT
 * addExtensionToLibrary - FAIT
 * setPremium - FAIT
 *
 * GET
 * getAllUsers - FAIT
 * getUserById - FAIT
 *
 * PUT
 * updateUserById - FAIT
 * updatePassword - FAIT
 *
 * DELETE
 * deleteUserById - FAIT
 * deleteGameToLibrary - FAIT
 * deleteExtensionToLibrary - FAIT
 */

exports.createUser = async (req, res) => {
    const user = new User({ ...req.body });

    await user.save();

    res.status(201).json(user);
};

exports.addGameToLibrary = async (req, res) => {
    // On utilise toString() pour comparer la valeur de l'id avec le param dans l'url
    if (req.user._id.toString() !== req.params.userId) {
        // return res.status(403).json();
        throw new Error("Acces non autorisé");
    }

    const game = await Game.findById(req.params.gameId);
    if (!game) {
        // return res.status(404).json();
        throw new Error("Jeu introuvable");
    }

    if (req.user.games.includes(game._id.toString())) {
        // return res.status(400).json();
        throw new Error("Jeu déjà présent dans la ludothèque de l'utilisateur");
    }

    req.user.games.push(game._id);
    await req.user.save();

    res.status(200).json(req.user);
};

exports.addExtensionToLibrary = async (req, res) => {
    // On utilise toString() pour comparer la valeur de l'id avec le param dans l'url
    if (req.user._id.toString() !== req.params.userId) {
        // return res.status(403).json();
        throw new Error("Acces non autorisé");
    }

    const extension = await Extension.findById(req.params.extensionId);
    if (!extension) {
        // return res.status(404).json();
        throw new Error("Extension introuvable");
    }

    if (req.user.extensions.includes(extension._id.toString())) {
        // return res.status(400).json();
        throw new Error(
            "Extension déjà présente dans la ludothèque de l'utilisateur"
        );
    }

    req.user.extensions.push(extension._id);
    await req.user.save();

    res.status(200).json(req.user);
};

exports.setPremium = async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
        // return res.status(403).json();
        throw new Error("Acces non autorisé");
    }

    req.user.premium = !req.user.premium;
    await req.user.save();

    res.status(200).json(req.user);
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
    // parametres dans l'url pour populate ou non les jeux et les extensions
    // ex: /api/users/:id/?games=true&extensions=false
    const { games, extensions } = req.query;
    const gamesBool = games === "true";
    const extensionsBool = extensions === "true";

    const user = await User.findOne({ _id: req.params.id });

    if (gamesBool) {
        await user.populate("games");
    }

    if (extensionsBool) {
        await user.populate("extensions");
    }

    if (!user) {
        throw new Error("Utilisateur introuvable");
    }

    res.status(200).json(user);
};

exports.updateUserById = async (req, res) => {
    //Check si l'email est déjà utilisé par un autre user
    if (
        req.user._id.toString() !== req.params.id ||
        req.user.role !== "ADMIN"
    ) {
        // return res.status(403).json();
        throw new Error("Acces non autorisé");
    }

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

exports.updateUserPasswordById = async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
        // return res.status(403).json();
        throw new Error("Acces non autorisé");
    }

    const passwordMatch = await req.user.isPasswordCorrect(req.body.password);
    if (!passwordMatch) {
        // return res.status(403).json();
        throw new Error("Mot de passe incorrect");
    }

    if (req.body.newPassword !== req.body.confirmNewPassword) {
        throw new Error(
            "Le mot de passe et sa confirmation doivent être identiques"
        );
    }

    req.user.password = req.body.newPassword;
    await req.user.save();

    res.status(200).json(req.user);
};

exports.deleteUserById = async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
        // return res.status(403).json();
        throw new Error("Acces non autorisé");
    }

    await User.findOneAndDelete(req.params.id);

    res.status(200).json();
};

exports.deleteGameFromLibrary = async (req, res) => {
    if (req.user._id.toString() !== req.params.userId) {
        // return res.status(403).json();
        throw new Error("Acces non autorisé");
    }

    req.user.games.filter((game) => {
        return game._id.toString() !== req.params.gameId;
    });

    await req.user.save();

    res.status(200).json(req.user);
};

exports.deleteExtensionFromLibrary = async (req, res) => {
    if (req.user._id.toString() !== req.params.userId) {
        // return res.status(403).json();
        throw new Error("Acces non autorisé");
    }

    req.user.extensions.filter((extension) => {
        return extension._id.toString() !== req.params.extensionId;
    });

    await req.user.save();

    res.status(200).json(req.user);
};
