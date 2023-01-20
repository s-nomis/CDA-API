const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const gridFSinit = (req, res, next) => {
    const conn = mongoose.createConnection(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // init gfs
    let gfs;
    conn.once("open", () => {
        // init stream
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: "files",
        });
        gfs = new Grid(conn.db, mongoose.mongo);
        gfs.collection("files");

        req.gridfsBucket = gridfsBucket;
        req.gfs = gfs;
        next();
    });
};

module.exports = gridFSinit;
