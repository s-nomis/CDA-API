const APIError = require("../errors/APIError");
const Extension = require("../models/extension.model");
const AffiliatesLink = require("../models/AffiliatesLink.model");


exports.createAffiliatesLink = async (req, res) => {
    const affiliatesLink = new AffiliatesLink({ ...req.body });

    await affiliatesLink.save();

    res.status(201).json(affiliatesLink);
};

exports.getAllAffiliatesLinks = async (req, res) => {
    const affiliatesLinks = await AffiliatesLink.find({});

    res.status(200).json(affiliatesLinks);
};

exports.getAffiliatesLinkById = async (req, res) => {
    const affiliatesLink = await AffiliatesLink.findById(req.params.id);

    if (!affiliatesLink) {
        throw new APIError("Jeu introuvable", 404);
    }

    res.status(200).json(affiliatesLink);
};


exports.getAffiliatesLinkGame = async (req, res) => {
    const affiliatesLink = await AffiliatesLink.findOne({ game_id: req.params.id });
    if (!affiliatesLink) {
        throw new APIError("Jeu introuvable", 404);
    }

    res.status(200).json(affiliatesLink);
};

exports.getAffiliatesLinkExtension = async (req, res) => {
    const affiliatesLink = await AffiliatesLink.findOne({ extension_id: req.params.id });
    console.log(req.params.id)
    if (!affiliatesLink) {
        throw new APIError("Jeu introuvable", 404);
    }

    res.status(200).json(affiliatesLink);
};

exports.updateAffiliatesLinkById = async (req, res) => {
    console.log('ok')
    console.log(req.body)
    const affiliatesLink = await AffiliatesLink.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
            new: "true",
        }
    );

    if (!affiliatesLink) {
        throw new APIError("Jeu introuvable", 404);
    }

    res.status(200).json(affiliatesLink);
};

exports.deleteAffiliatesLinkById = async (req, res) => {

    await AffiliatesLink.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
