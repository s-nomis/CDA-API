const User = require("../models/user.model");

/**
 * POST
 * login - FAIT
 * logout - FAIT
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecte l'utilisateur et genère un jeton d'accès
 *     description: Retourne les données de l'utilisateur et ajoute son token dans le Header de la réponse.
 *     responses:
 *       200:
 *         description: Utilisateur connecté.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Identifiant de l'utilisateur.
 *                   example: 668c314862ac073e1332321f
 *                 username:
 *                   type: string
 *                   description: Pseudonyme de l'utilisateur.
 *                   example: Leanne_Graham
 */
exports.login = async (req, res) => {
    const user = await User.findByCredentials(
        req.body.email,
        req.body.password
    );
    console.log(req.body.email + " " + req.body.password);

    const token = user.generateAuthToken();

    res.set("Token", token);
    res.status(200).json(user);
};

exports.logout = async (req, res) => {
    req.user = null;

    res.status(200).json();
};
