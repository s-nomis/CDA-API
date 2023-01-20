const dotenv = require("dotenv");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

dotenv.config();

//Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGODB_URL,
    file: (_, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename =
                    buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    // url: `${process.env.APP_URL}/api/v1/files/${filename}`,
                    bucketName: "files",
                };
                resolve(fileInfo);
            });
        });
    },
});

const upload = multer({ storage });

module.exports = { upload };
