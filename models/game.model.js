const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        // Revoir le type de l'image
        // image: {
        //     type: String,
        //     required: true,
        // },
        tags: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Tag",
            },
        ],
        description: {
            type: String,
            required: true,
            trim: true,
        },
        //Texte ou photo des regles ?
        // rules: {
        //     type: String,
        // },
        video_url: {
            type: String,
            trim: true,
            lowercase: true,
        },
        age_range: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        duration: {
            type: Number,
            min: 0,
            required: true,
        },
        barcode: {
            type: String,
            trim: true,
            required: true,
        },
        number_of_player: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        submissionStatus: {
            type: String,
            enum: ["Validé", "En cours de validation", "Rejeté"],
            default: "En cours de validation",
        },
        submissionDate: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
);

gameSchema.virtual("extensions", {
    ref: "Extension",
    localField: "_id",
    foreignField: "game_id",
});

gameSchema.virtual("ratings", {
    ref: "Rating",
    localField: "_id",
    foreignField: "game_id",
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
