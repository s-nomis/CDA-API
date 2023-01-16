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
        throw new Error("Jeu introuvable");
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
        throw new Error("Utilisateur introuvable");
    }

    res.status(200).json(game);
};

exports.deleteGameById = async (req, res) => {
    await Game.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
