const mongoose = require("mongoose");

const affiliatesLinkSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        image: {
            type: mongoose.Types.ObjectId,
            required: false,
        },

        link: {
            type: String,
            required: true,
            trim: true,
        },

        game_id: {
            type: mongoose.Types.ObjectId,
            required: false
        },

        extension_id: {
            type: mongoose.Types.ObjectId,
            required: false
        },

        submissionDate: {
            type: Date,
            default: Date.now(),
        },
    }
);

affiliatesLinkSchema.virtual("extensions", {
    ref: "Extension",
    localField: "_id",
    foreignField: "affiliatesLink_id",
});

affiliatesLinkSchema.virtual("game", {
    ref: "Game",
    localField: "_id",
    foreignField: "affiliatesLink_id",
});

const affiliatesLink = mongoose.model("affiliatesLink", affiliatesLinkSchema);
module.exports = affiliatesLink;