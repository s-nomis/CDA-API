const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Le nom d'utilisateur est obligatoire"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "L'adresse email est obligatoire"],
            trim: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z]{1,3}$/,
                "L'adresse email est invalide",
            ],
            validate: validateEmail,
        },
        password: {
            type: String,
            required: [true, "Le mot de passe est obligatoire"],
            minLength: [6, "Le mot de passe doit faire au moins 6 caractères"],
        },
        premium: {
            type: Boolean,
            default: false,
        },
        games: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Game",
            },
        ],
        extensions: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Extension",
            },
        ],
    },
    {
        timestamps: true,
    }
);

//Middleware qui va s'éxecuter avant la sauvegarde en BDD
userSchema.pre("save", async function (next) {
    //Check si le password est modifié.
    //Si oui, on doit le tester pour voir si il est assez sécurisé, puis on le crypte
    if (this.isModified("password")) {
        /**
         * La validation est faite ici plus que lors de la définition du Schema
         * pour ne pas tester la regex sur le password crypté
         */
        const regex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{6,}$"
        );

        if (!regex.test(this.password)) {
            throw new Error(
                "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial"
            );
        }

        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});

//Pas d'arrow function pour pouvoir acceder à this
async function validateEmail(email) {
    const user = await this.constructor.findOne({ email });

    if (user._id.toString() !== this._id.toString()) {
        if (user) {
            throw new Error("L'adresse email est dèjà utilisée");
        }
    }
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Identifiants invalides");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Identifiants invalides");
    }

    return user;
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this.id.toString() }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });

    return token;
};

userSchema.methods.isPasswordCorrect = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);

    return isMatch;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
