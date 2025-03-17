import express, { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import AdmZip from "adm-zip";

import { Album } from "../interfaces/album.interface";
import { AlbumMember } from "../interfaces/albumMember.interface";

const router:Router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if(!fs.existsSync(`tmp/${req.body.albumID}/`)) {
            fs.mkdirSync(`tmp/${req.body.albumID}/`);
        }
        cb(null, `tmp/${req.body.albumID}/`)
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
        
        if(albumIndex==-1 || !fs.existsSync(path.join(__dirname, `../../zips/${req.query.albumID}.zip`))) {
            res.json({type: "ERROR", msg: "AlbumID is invalid!"});
        } else if(albumData[albumIndex].members.findIndex((el:AlbumMember)=>el.email==req.session.user.email)==-1) {
            res.json({type: "ERROR", msg: "Unauthorized access to album, you are not a member."});
        } else {
            // 
            res.sendFile(path.join(__dirname, `../../zips/${req.query.albumID}.zip`), (err)=>{
                if(err) console.log(err);
                
            });
        }
    } catch (err) {
        res.json({type: "ERROR", msg: err});
    }
});

router.post("/new", upload.array("photos", 100), (req:Request, res:Response)=>{
    try {

        let albumData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/albums.json"), "utf-8"));
        let albumIndex = albumData.findIndex((el:Album)=>el.albumID==req.body.albumID);

        if(albumIndex==-1) {
            res.json({type: "ERROR", msg: "AlbumID is invalid!"});
            return;
        } else if(albumData[albumIndex].members.findIndex((el:AlbumMember)=>el.email==req.session.user.email)==-1) {
            res.json({type: "ERROR", msg: "Unauthorized access to album, you are not a member."});
            return;
        } 

        (async ()=>{
            if(!fs.existsSync(`tmp/${req.body.albumID}/`)) {
                fs.mkdirSync(`tmp/${req.body.albumID}/`);
            }
            if(fs.existsSync(path.join(__dirname, `../zips/${req.body.albumID}.zip`))) {
                const extractPath = path.join(__dirname, `../zips/${req.body.albumID}.zip`);
                const inputZip = new AdmZip(extractPath);
                inputZip.extractAllTo(extractPath, false);
            } else {
                fs.writeFile(path.join(__dirname, `../zips/${req.body.albumID}.zip`), "", (err)=>{
                    if(err)
                    console.log("ERROR in making file");
                });
            }
            
            const outputZip = new AdmZip();
            let outputPath = path.join(__dirname, `../../zips/${req.body.albumID}.zip`);
            let inputPath = path.join(__dirname, `../../tmp/${req.body.albumID}`);
            outputZip.addLocalFolder(inputPath);
            outputZip.writeZip(outputPath);
            fs.rm(path.join(__dirname, `../tmp/${req.body.albumID}/`), { recursive: true, force: true }, (err)=>{
                if(err)
                    console.log("Error in deleting dir", err);
            });
            console.log("Created zip file!");
        })();
        res.json({type: "SUCCESS", msg: `Successfully uploaded ${req.files.length} photos!`})
    } catch(err) {
        res.json({type: "ERROR", msg: err});
    }
})


export default router;