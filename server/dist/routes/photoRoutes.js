"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!fs_1.default.existsSync(`tmp/${req.session.user.email}/`)) {
            fs_1.default.mkdirSync(`tmp/${req.session.user.email}/`);
        }
        cb(null, `tmp/${req.session.user.email}/`);
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
        if (albumIndex == -1) {
            res.json({ type: "ERROR", msg: "AlbumID is invalid!" });
        }
        else if (albumData[albumIndex].members.findIndex((el) => el.email == req.session.user.email) == -1) {
            res.json({ type: "ERROR", msg: "Unauthorized access to album, you are not a member." });
        }
        else {
            res.json({ type: "SUCCESS" });
        }
    }
    catch (err) {
        res.json({ type: "ERROR", msg: err });
    }
});
router.post("/new", upload.array("photos", 100), (req, res) => {
    try {
        res.json({ type: "SUCCESS", msg: `Successfully uploaded ${req.files.length}!` });
    }
    catch (err) {
        res.json({ type: "ERROR", msg: err });
    }
});
exports.default = router;
//# sourceMappingURL=photoRoutes.js.map