import express, {Router, Request, Response} from "express"
import fs from "fs";
import path from "path";
import { v6 as uuidv6 } from 'uuid';

import { User } from "../interfaces/user.interface";
import { Album } from "../interfaces/album.interface";
import { AlbumMember } from "../interfaces/albumMember.interface";

let router:Router = express.Router();

router.post("/create", (req:Request, res:Response)=>{
    
    let userData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/users.json"), "utf-8"));
    let albumData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/albums.json"), "utf-8"));


    let defaultAlbum:Album = {
        albumName: "All photos",
        albumID: uuidv6(),
        ownerID: req.body.email,
        members: [{email: req.body.email, role: "Owner", invitedAt: Date.now()}],
        createdAt: Date.now()
    };

    let userObj:User = {
        email: req.body.email,
        password: req.body.password,
        username: "You",
        createdAt: Date.now(),
        albums: [defaultAlbum.albumID]
    }

    let nData = userData.filter((el:User)=>el.email==userObj.email);

    if(nData.length==0) {
        userData.push(userObj);
        albumData.push(defaultAlbum);

        fs.writeFileSync(path.join(__dirname, "../../public/users.json"), JSON.stringify(userData), "utf-8");
        fs.writeFileSync(path.join(__dirname, "../../public/albums.json"), JSON.stringify(albumData), "utf-8");

        res.json({type: "SUCCESS", msg: "New user created!"});

    } else {
        res.json({type: "ERROR", msg: "User with these credentials not found!"});
    }

});

router.post("/login", (req:Request, res:Response)=>{

    let userData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/users.json"), "utf-8"));

    let userObj:User = {
        email: req.body.email,
        password: req.body.password
    };

    let nData = userData.filter((el:User)=>el.email==userObj.email&&el.password==userObj.password);

    if(nData.length==1) {
        req.session.user = nData[0];
        res.json({type: "SUCCESS", msg: "User logged in!"});
    } else {
        res.json({type: "ERROR", msg: "User with these credentials not found!"});
    }

});

export default router;

