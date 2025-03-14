"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const albumRoutes_1 = __importDefault(require("./routes/albumRoutes"));
const photoRoutes_1 = __importDefault(require("./routes/photoRoutes"));
const testingRoutes_1 = __importDefault(require("./routes/testingRoutes"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SECERT,
    resave: false,
    saveUninitialized: true
}));
// routes
app.use("/auth", authRoutes_1.default);
app.use("/album", auth_middleware_1.default, albumRoutes_1.default);
app.use("/photo", auth_middleware_1.default, photoRoutes_1.default);
app.use("/test", testingRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server started at", process.env.PORT);
});
//# sourceMappingURL=index.js.map