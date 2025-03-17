"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!fs_1.default.existsSync(`tmp/${req.body.albumID}/`)) {
            fs_1.default.mkdirSync(`tmp/${req.body.albumID}/`);
        }
        cb(null, `tmp/${req.body.albumID}/`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.get("/all", (req, res) => {
    try {
        let albumData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/albums.json"), "utf-8"));
        let albumIndex = albumData.findIndex((el) => el.albumID == req.query.albumID);
        if (albumIndex == -1 || !fs_1.default.existsSync(path_1.default.join(__dirname, `../../zips/${req.query.albumID}.zip`))) {
            res.json({ type: "ERROR", msg: "AlbumID is invalid!" });
        }
        else if (albumData[albumIndex].members.findIndex((el) => el.email == req.session.user.email) == -1) {
            res.json({ type: "ERROR", msg: "Unauthorized access to album, you are not a member." });
        }
        else {
            // 
            res.sendFile(path_1.default.join(__dirname, `../../zips/${req.query.albumID}.zip`), (err) => {
                if (err)
                    console.log(err);
            });
        }
    }
    catch (err) {
        res.json({ type: "ERROR", msg: err });
    }
});
router.post("/new", upload.array("photos", 100), (req, res) => {
    try {
        let albumData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/albums.json"), "utf-8"));
        let albumIndex = albumData.findIndex((el) => el.albumID == req.body.albumID);
        if (albumIndex == -1) {
            res.json({ type: "ERROR", msg: "AlbumID is invalid!" });
            return;
        }
        else if (albumData[albumIndex].members.findIndex((el) => el.email == req.session.user.email) == -1) {
            res.json({ type: "ERROR", msg: "Unauthorized access to album, you are not a member." });
            return;
        }
        (async () => {
            if (!fs_1.default.existsSync(`tmp/${req.body.albumID}/`)) {
                fs_1.default.mkdirSync(`tmp/${req.body.albumID}/`);
            }
            if (fs_1.default.existsSync(path_1.default.join(__dirname, `../zips/${req.body.albumID}.zip`))) {
                const extractPath = path_1.default.join(__dirname, `../zips/${req.body.albumID}.zip`);
                const inputZip = new adm_zip_1.default(extractPath);
                inputZip.extractAllTo(extractPath, false);
            }
            else {
                fs_1.default.writeFile(path_1.default.join(__dirname, `../zips/${req.body.albumID}.zip`), "", (err) => {
                    if (err)
                        console.log("ERROR in making file");
                });
            }
            const outputZip = new adm_zip_1.default();
            let outputPath = path_1.default.join(__dirname, `../../zips/${req.body.albumID}.zip`);
            let inputPath = path_1.default.join(__dirname, `../../tmp/${req.body.albumID}`);
            outputZip.addLocalFolder(inputPath);
            outputZip.writeZip(outputPath);
            fs_1.default.rm(path_1.default.join(__dirname, `../tmp/${req.body.albumID}/`), { recursive: true, force: true }, (err) => {
                if (err)
                    console.log("Error in deleting dir", err);
            });
            console.log("Created zip file!");
        })();
        res.json({ type: "SUCCESS", msg: `Successfully uploaded ${req.files.length} photos!` });
    }
    catch (err) {
        res.json({ type: "ERROR", msg: err });
    }
});
exports.default = router;
//# sourceMappingURL=photoRoutes.js.map