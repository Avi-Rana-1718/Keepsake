import express, {Router, Request, Response} from "express";
import path from "path";
import fs from "fs";
import { v6 as uuidv6 } from 'uuid';
import { Album } from "../interfaces/album.interface";
import { User } from "../interfaces/user.interface";
import { AlbumMember } from "../interfaces/albumMember.interface";

const router:Router = express.Router();

router.post("/create", (req:Request, res:Response)=>{
    try {
        let albumData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/albums.json"), "utf-8"));

        console.log(req.session.user);

        let albumObj:Album = {
            albumID: uuidv6(),
            albumName: req.body.name,
            createdAt: Date.now(),
            ownerID: req.session.user.email,
            members: [{email: req.session.user.email, role: "Owner", invitedAt: Date.now()}]
        };

        albumData.push(albumObj);
        fs.writeFileSync(path.join(__dirname, "../../public/albums.json"), JSON.stringify(albumData), "utf-8");
        res.json({type: "SUCCESS", msg: `Album created for user (${req.session.user.email}).`});
    } catch (err) {
        res.json({type: "UNDEFINED ERROR", msg: err});
    }
});

router.get("/all", async (req:Request, res:Response)=>{
    try {
        let userData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/users.json"), "utf-8"));
        let userIndex = userData.findIndex((el:User)=>el.email==req.session.user.email);
        res.json({type: "SUCCESS", data: userData[userIndex].albums});
    } catch(err) {
        res.json({type: "UNDEFINED ERROR", msg: err});
    }
});

router.post("/invite", (req:Request, res:Response)=>{
    try {

        let userData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/users.json"), "utf-8"));
        let albumData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/albums.json"), "utf-8"));

        let albumIndex = albumData.findIndex((el:Album)=>el.albumID==req.body.albumID);
        let userIndex = userData.findIndex((el:User)=>el.email==req.body.email);


        if(albumIndex==-1 || userIndex==-1) {
            res.json({type: "ERROR", msg: "Invalid albumID or userID."});
        } else if(albumData[albumIndex].ownerID!=req.session.user.email) {
            res.json({type: "ERROR", msg: "Only album owner can invite user to album."});
        } else if (albumData[albumIndex].members.filter((el:AlbumMember)=>el.email==req.body.email).length>=1) {
            res.json({type: "ERROR", msg: "Member was already invited!"});
        } else {
            let inviteObj:AlbumMember = {
                    email:req.body.email,
                    invitedAt: Date.now(),
                    role:"Invited"
            }
            albumData[albumIndex].members.push(inviteObj);
            fs.writeFileSync(path.join(__dirname, "../../public/albums.json"), JSON.stringify(albumData), "utf-8");
            res.json({type: "SUCCESS", msg: "Invitation sent!"});
        }

    } catch(err) {
        res.json({type: "UNDEFINED ERROR", msg: err});
    }
})

router.post("/accept", (req:Request, res:Response)=>{
    try {

        let userData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/users.json"), "utf-8"));
        let albumData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/albums.json"), "utf-8"));

        let albumIndex = albumData.findIndex((el:Album)=>el.albumID==req.body.albumID);
        let userIndex = userData.findIndex((el:User)=>el.email==req.session.user.email);        

        if(albumIndex==-1 || userIndex==-1) {
            res.json({type: "ERROR", msg: "Invalid albumID or userID."});
        } else {
            let invitedIndex = albumData[albumIndex].members.findIndex((el:AlbumMember)=>el.email==req.session.user.email);
            if(invitedIndex==-1) {
                res.json({type: "ERROR", msg: "User not invited to album."});
            } else if(albumData[albumIndex].members[invitedIndex].role!="Invited") {
                res.json({type: "ERROR", msg: "User is a member already of the album."})
            } else {
                albumData[albumIndex].members[invitedIndex].role="Guest"; // change later
                userData[userIndex].albums.push(req.body.albumID);
                fs.writeFileSync(path.join(__dirname, "../../public/albums.json"), JSON.stringify(albumData), "utf-8");
                fs.writeFileSync(path.join(__dirname, "../../public/users.json"), JSON.stringify(userData), "utf-8");
                res.json({type: "SUCCESS", msg: "User is now a member of the album"});
            }
        }

    } catch (err) {
        res.json({type: "UNDEFINED ERROR", msg:err});
    }
})

router.delete("/delete", (req:Request, res:Response)=>{
    
    try {

    let albumData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../public/albums.json"), "utf-8"));
    
    let albumOwner:String;

    let nData = albumData.filter((el:Album)=>{
        if(el.albumID==req.body.albumID) {
            albumOwner=el.ownerID;
            return false;
        }
        return true;
    });

    if(albumOwner!=req.session.user.email) {
        res.json({type: "UNDEFINED ERROR", msg: "Not authorized to delete the album."});
        return;
    }


    fs.writeFileSync(path.join(__dirname, "../../public/albums.json"), JSON.stringify(nData), "utf-8");

    res.json({type: "SUCCESS", msg: `Album with ID (${req.body.albumID}) deleted!`});

    } catch (err) {
        res.json({type: "UNDEFINED ERROR", msg: err});
    }

});

export default router;