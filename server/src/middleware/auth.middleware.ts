import { Request, Response, NextFunction } from "express";

export default function auth(req:Request, res:Response, next:NextFunction) {
    // define request body in typescript
    if(req.session && req.session.user) {
        next();
    } else {
        res.json({type: "ERROR", msg: "Login to access this service!"});
    }
}

