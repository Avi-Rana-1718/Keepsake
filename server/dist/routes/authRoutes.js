"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
let router = express_1.default.Router();
router.post("/create", (req, res) => {
    let userData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/users.json"), "utf-8"));
    let albumData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/albums.json"), "utf-8"));
    let defaultAlbum = {
        albumName: "All photos",
        albumID: (0, uuid_1.v6)(),
        ownerID: req.body.email,
        members: [{ email: req.body.email, role: "Owner", invitedAt: Date.now() }],
        createdAt: Date.now()
    };
    let userObj = {
        email: req.body.email,
        password: req.body.password,
        username: "You",
        createdAt: Date.now(),
        albums: [defaultAlbum.albumID]
    };
    let nData = userData.filter((el) => el.email == userObj.email);
    if (nData.length == 0) {
        userData.push(userObj);
        albumData.push(defaultAlbum);
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../public/users.json"), JSON.stringify(userData), "utf-8");
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../public/albums.json"), JSON.stringify(albumData), "utf-8");
        res.json({ type: "SUCCESS", msg: "New user created!" });
    }
    else {
        res.json({ type: "ERROR", msg: "User with these credentials not found!" });
    }
});
router.post("/login", (req, res) => {
    let userData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/users.json"), "utf-8"));
    let userObj = {
        email: req.body.email,
        password: req.body.password
    };
    let nData = userData.filter((el) => el.email == userObj.email && el.password == userObj.password);
    if (nData.length == 1) {
        req.session.user = nData[0];
        res.json({ type: "SUCCESS", msg: "User logged in!" });
    }
    else {
        res.json({ type: "ERROR", msg: "User with these credentials not found!" });
    }
});
exports.default = router;
//# sourceMappingURL=authRoutes.js.map