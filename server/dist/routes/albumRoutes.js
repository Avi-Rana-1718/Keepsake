"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router.post("/create", (req, res) => {
    try {
        let albumData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/albums.json"), "utf-8"));
        console.log(req.session.user);
        let albumObj = {
            albumID: (0, uuid_1.v6)(),
            albumName: req.body.name,
            createdAt: Date.now(),
            ownerID: req.session.user.email,
            members: [{ email: req.session.user.email, role: "Owner", invitedAt: Date.now() }]
        };
        albumData.push(albumObj);
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../public/albums.json"), JSON.stringify(albumData), "utf-8");
        res.json({ type: "SUCCESS", msg: `Album created for user (${req.session.user.email}).` });
    }
    catch (err) {
        res.json({ type: "UNDEFINED ERROR", msg: err });
    }
});
router.get("/all", async (req, res) => {
    try {
        let userData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/users.json"), "utf-8"));
        let userIndex = userData.findIndex((el) => el.email == req.session.user.email);
        res.json({ type: "SUCCESS", data: userData[userIndex].albums });
    }
    catch (err) {
        res.json({ type: "UNDEFINED ERROR", msg: err });
    }
});
router.post("/invite", (req, res) => {
    try {
        let userData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/users.json"), "utf-8"));
        let albumData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/albums.json"), "utf-8"));
        let albumIndex = albumData.findIndex((el) => el.albumID == req.body.albumID);
        let userIndex = userData.findIndex((el) => el.email == req.body.email);
        if (albumIndex == -1 || userIndex == -1) {
            res.json({ type: "ERROR", msg: "Invalid albumID or userID." });
        }
        else if (albumData[albumIndex].ownerID != req.session.user.email) {
            res.json({ type: "ERROR", msg: "Only album owner can invite user to album." });
        }
        else if (albumData[albumIndex].members.filter((el) => el.email == req.body.email).length >= 1) {
            res.json({ type: "ERROR", msg: "Member was already invited!" });
        }
        else {
            let inviteObj = {
                email: req.body.email,
                invitedAt: Date.now(),
                role: "Invited"
            };
            albumData[albumIndex].members.push(inviteObj);
            fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../public/albums.json"), JSON.stringify(albumData), "utf-8");
            res.json({ type: "SUCCESS", msg: "Invitation sent!" });
        }
    }
    catch (err) {
        res.json({ type: "UNDEFINED ERROR", msg: err });
    }
});
router.post("/accept", (req, res) => {
    try {
        let userData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/users.json"), "utf-8"));
        let albumData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/albums.json"), "utf-8"));
        let albumIndex = albumData.findIndex((el) => el.albumID == req.body.albumID);
        let userIndex = userData.findIndex((el) => el.email == req.session.user.email);
        if (albumIndex == -1 || userIndex == -1) {
            res.json({ type: "ERROR", msg: "Invalid albumID or userID." });
        }
        else {
            let invitedIndex = albumData[albumIndex].members.findIndex((el) => el.email == req.session.user.email);
            if (invitedIndex == -1) {
                res.json({ type: "ERROR", msg: "User not invited to album." });
            }
            else if (albumData[albumIndex].members[invitedIndex].role != "Invited") {
                res.json({ type: "ERROR", msg: "User is a member already of the album." });
            }
            else {
                albumData[albumIndex].members[invitedIndex].role = "Guest"; // change later
                userData[userIndex].albums.push(req.body.albumID);
                fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../public/albums.json"), JSON.stringify(albumData), "utf-8");
                fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../public/users.json"), JSON.stringify(userData), "utf-8");
                res.json({ type: "SUCCESS", msg: "User is now a member of the album" });
            }
        }
    }
    catch (err) {
        res.json({ type: "UNDEFINED ERROR", msg: err });
    }
});
router.delete("/delete", (req, res) => {
    try {
        let albumData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../public/albums.json"), "utf-8"));
        let albumOwner;
        let nData = albumData.filter((el) => {
            if (el.albumID == req.body.albumID) {
                albumOwner = el.ownerID;
                return false;
            }
            return true;
        });
        if (albumOwner != req.session.user.email) {
            res.json({ type: "UNDEFINED ERROR", msg: "Not authorized to delete the album." });
            return;
        }
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../public/albums.json"), JSON.stringify(nData), "utf-8");
        res.json({ type: "SUCCESS", msg: `Album with ID (${req.body.albumID}) deleted!` });
    }
    catch (err) {
        res.json({ type: "UNDEFINED ERROR", msg: err });
    }
});
exports.default = router;
//# sourceMappingURL=albumRoutes.js.map