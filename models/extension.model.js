const mongoose = require("mongoose");
const Rating = require("./rating.model");
const Tag = require("./tag.model");

const extensionSchema = mongoose.Schema(
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
        age_range: {
            type: String,
            trim: true,
            lowercase: true,
        },
        duration: {
            type: Number,
            min: 0,
        },
        barcode: {
            type: String,
            trim: true,
        },
        number_of_player: {
            type: Number,
            min: 1,
        },
        isValid: {
            type: Boolean,
            default: false,
        },
        submissionDate: {
            type: Date,
            default: Date.now(),
        },
        game_id: {
            type: mongoose.Types.ObjectId,
            ref: "Game",
        },
    },
    {
        timestamps: true,
    }
);

extensionSchema.virtual("ratings", {
    ref: "Rating",
    localField: "_id",
    foreignField: "game_id",
});

const Extension = mongoose.model("Extension", extensionSchema);
module.exports = Extension;
