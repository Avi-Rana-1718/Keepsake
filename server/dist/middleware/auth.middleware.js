"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = auth;
function auth(req, res, next) {
    // define request body in typescript
    if (req.session && req.session.user) {
        next();
    }
    else {
        res.json({ type: "ERROR", msg: "Login to access this service!" });
    }
}
//# sourceMappingURL=auth.middleware.js.map