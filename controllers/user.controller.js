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
        throw new APIError("Acces non autorisé", 403);
    }

    const game = await Game.findById(req.params.gameId);
    if (!game) {
        throw new APIError("Acces non autorisé", 404);
    }

    if (req.user.games.includes(game._id.toString())) {
        throw new APIError("Acces non autorisé", 400);
    }

    req.user.games.push(game._id);
    await req.user.save();

    res.status(200).json(req.user);
};

exports.addExtensionToLibrary = async (req, res) => {
    // On utilise toString() pour comparer la valeur de l'id avec le param dans l'url
    if (req.user._id.toString() !== req.params.id) {
        throw new APIError("Acces non autorisé", 403);
    }

    const extension = await Extension.findById(req.params.extensionId);
    if (!extension) {
        throw new APIError("Extension introuvable", 404);
    }

    if (req.user.extensions.includes(extension._id.toString())) {
        // return res.status(400).json();
        throw new APIError(
            "Extension déjà présente dans la ludothèque de l'utilisateur",
            404
        );
    }

    req.user.extensions.push(extension._id);
    await req.user.save();

    res.status(200).json(req.user);
};

exports.setPremium = async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
        throw new APIError("Acces non autorisé", 403);
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
        throw new APIError("Utilisateur introuvable", 404);
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
    if (req.user._id.toString() !== req.params.id) {
        throw new APIError("Acces non autorisé", 403);
    }

    if (req.body.email) {
        const existingUser = await User.findOne({
            email: req.body.email,
            id: { $ne: req.params.id },
        });

        if (existingUser) {
            throw new APIError("L'adresse email est déjà utilisée", 409);
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
        throw new APIError("Utilisateur introuvable", 404);
    }

    res.status(200).json(user);
};

exports.updateUserPasswordById = async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
        throw new APIError("Acces non autorisé", 403);
    }

    const passwordMatch = await req.user.isPasswordCorrect(req.body.password);
    if (!passwordMatch) {
        throw new APIError("Mot de passe incorrect", 409);
    }

    if (req.body.newPassword !== req.body.confirmNewPassword) {
        throw new APIError(
            "Le mot de passe et sa confirmation doivent être identiques",
            409
        );
    }

    req.user.password = req.body.newPassword;
    await req.user.save();

    res.status(200).json(req.user);
};

exports.deleteUserById = async (req, res) => {
    if (req.user._id.toString() !== req.params.id) {
        throw new APIError("Acces non autorisé", 403);
    }

    await User.findOneAndDelete(req.params.id);

    res.status(200).json();
};

exports.deleteGameFromLibrary = async (req, res) => {
    if (req.user._id.toString() !== req.params.userId) {
        throw new APIError("Acces non autorisé", 403);
    }

    req.user.games.filter((game) => {
        return game._id.toString() !== req.params.gameId;
    });

    await req.user.save();

    res.status(200).json(req.user);
};

exports.deleteExtensionFromLibrary = async (req, res) => {
    if (req.user._id.toString() !== req.params.userId) {
        throw new APIError("Acces non autorisé", 403);
    }

    req.user.extensions.filter((extension) => {
        return extension._id.toString() !== req.params.extensionId;
    });

    await req.user.save();

    res.status(200).json(req.user);
};
