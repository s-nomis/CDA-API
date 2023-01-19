const Proposal = require("../models/proposal.model");


exports.createProposal = async (req, res) => {
    const proposal = new Proposal({ ...req.body,  });

    await proposal.save();

    res.status(201).json(Proposal);
};

exports.getAllProposal = async (req, res) => {

    const proposal = await Proposal.find();

    res.status(200).json(Proposal);
};


exports.getProposalByidGame = async (req, res) => {
    const proposal = await Proposal.find({game_id:req.params.game_id})
    if (!proposal) {
        throw new Error("Jeu introuvable");
    }

    res.status(200).json(Proposal);
};

exports.getProposalByid = async (req, res) => {
    const proposal = await Proposal.find({id_game:req.params.id_game, _id:req.params.id});
    if (!proposal) {
        throw new Error("Jeu introuvable");
    }

    res.status(200).json(Proposal);
};
        
exports.getProposalByidCodeBar = async (req, res) => {
    const proposal = await Proposal.find({barcode:req.params.codeBar_id});
    if (!proposal) {
        throw new Error("Jeu introuvable");
    }

    res.status(200).json(Proposal);
};

exports.updateProposalById = async (req, res) => {
    const proposal = await Proposal.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
            new: "true",
        }
    );

    if (!proposal) {
        throw new Error("Utilisateur introuvable");
    }

    res.status(200).json(proposal);
};

exports.deleteProposalById = async (req, res) => {
    await Proposal.findByIdAndDelete(req.params.id);

    res.status(200).json();
};
