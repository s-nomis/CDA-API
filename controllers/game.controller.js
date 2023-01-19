const APIError = require("../errors/APIError");
const Extension = require("../models/extension.model");
const Game = require("../models/game.model");

/**
 * POST
 * createGame - FAIT
 *
 * GET
 * getAllGames - FAIT
 * getGameById - FAIT
 *
 * PUT
 * updateGameById - FAIT
 *
 * DELETE
 * deleteGameById - FAIT
 */

exports.createGame = async (req, res) => {
    const game = new Game({ ...req.body });

    await game.save();

    res.status(201).json(game);
};

exports.getAllGames = async (req, res) => {
    const games = await Game.find({});

    res.status(200).json(games);
};

exports.getGameByid = async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (!game) {
        throw new APIError("Jeu introuvable", 404);
    }

    res.status(200).json(game);
};

exports.getGameExtensions = async (req, res) => {
    const extensions = await Extension.find({ game_id: req.params.id });
    if (!extensions) {
        throw new APIError("Jeu introuvable", 404);
    }

    res.status(200).json(extensions);
};

exports.getGameByBarcode = async (req, res) => {
    const game = await Game.find({ barcode: req.params.id });
    if (!game) {
        throw new APIError("Jeu introuvable", 404);
    }

    res.status(200).json(game);
};

exports.updateGameById = async (req, res) => {
    const game = await Game.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
            new: "true",
        }
    );

    if (!game) {
        throw new APIError("Jeu introuvable", 404);
    }

    res.status(200).json(game);
};

exports.deleteGameById = async (req, res) => {
    await Game.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
