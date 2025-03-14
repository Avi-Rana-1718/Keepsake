import express, { Router } from "express";

 
 const router:Router = express.Router();

 router.get("/getSession", (req, res)=>{
    res.json(req.session);
 })

 export default router;