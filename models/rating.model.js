const mongoose = require("mongoose");
const User = require("./user.model");

const ratingSchema = mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        review: {
            type: String,
            trim: true,
        },
        owner_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        game_id: {
            type: mongoose.Types.ObjectId,
            ref: "Game",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
