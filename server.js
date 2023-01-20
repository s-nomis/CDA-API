const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { errorHandler } = require("./middlewares/errorHandler");

const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const gameRouter = require("./routers/game.router");
const extensionRouter = require("./routers/extension.router");
const tagRouter = require("./routers/tag.router");
const ratingRouter = require("./routers/rating.router");
const proposalRouteur = require("./routers/proposal.router")
const fileRouter = require("./routers/file.router");
const affiliatesLinkRouter = require("./routers/affiliatesLink.router");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/games", gameRouter);
app.use("/api", ratingRouter);
app.use("/api/extensions", extensionRouter);
app.use("/api/tags", tagRouter);
app.use("/api/proposal", proposalRouteur);
app.use("/api/files", fileRouter);
app.use("/api/affiliatesLinks", affiliatesLinkRouter);

app.use(errorHandler);

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server running on", PORT);
        });
    })
    .catch((err) => console.log(err));
