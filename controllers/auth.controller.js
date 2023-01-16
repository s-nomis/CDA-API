const User = require("../models/user.model");

/**
 * POST
 * login - FAIT
 * logout - FAIT
 */

exports.login = async (req, res) => {
    const user = await User.findByCredentials(
        req.body.email,
        req.body.password
    );

    const token = user.generateAuthToken();

    res.set("Token", token);
    res.status(200).json(user);
};

exports.logout = async (req, res) => {
    req.user = null;

    res.status(200).json();
};
