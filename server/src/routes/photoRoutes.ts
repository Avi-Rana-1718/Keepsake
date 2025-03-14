import express, { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import archiver from "archiver"

import { Album } from "../interfaces/album.interface";
import { AlbumMember } from "../interfaces/albumMember.interface";

const router:Router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if(!fs.existsSync(`tmp/${req.session.user.email}/`)) {
            fs.mkdirSync(`tmp/${req.session.user.email}/`);
        }
        cb(null, `tmp/${req.session.user.email}/`)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({storage: storage})

router.get("/all", (req:Request, res: Response)=> {
    try {
        let albumData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/albums.json"), "utf-8"));
        let albumIndex = albumData.findIndex((el:Album)=>el.albumID==req.query.albumID);
        
        if(albumIndex==-1) {
            res.json({type: "ERROR", msg: "AlbumID is invalid!"});
        } else if(albumData[albumIndex].members.findIndex((el:AlbumMember)=>el.email==req.session.user.email)==-1) {
            res.json({type: "ERROR", msg: "Unauthorized access to album, you are not a member."});
        } else {
            res.json({type: "SUCCESS"});
        }
    } catch (err) {
        res.json({type: "ERROR", msg: err});
    }
});

router.post("/new", upload.array("photos", 100), (req:Request, res:Response)=>{
    try {
        res.json({type: "SUCCESS", msg: `Successfully uploaded ${req.files.length} photos!`})
    } catch(err) {
        res.json({type: "ERROR", msg: err});
    }
})


export default router;