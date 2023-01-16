const mongoose = require("mongoose");

const proposalSchema = mongoose.Schema(
    {
        //Type de contenu personnalisé (Règles custom, Cartes custom, quoi d'autres ?)
        type: {
            type: String,
            enum: ["Rules", "Cards"],
        },
        title: {
            type: String,
            trim: true,
            lowercase: true,
        },
        //Regles en texte ou en photo ?
        rules_description: {
            type: String,
        },
        //Description de la cartes, son effet, ses points, etc..
        card_description: {
            type: String,
        },
        //Image du design de la carte proposé ou image des règles plutot que tout réécrire
        // design: {}
    },
    {
        timestamps: true,
    }
);

const Proposal = mongoose.model("Proposal", proposalSchema);
module.exports = Proposal;
