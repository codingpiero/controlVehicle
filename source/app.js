import express from "express";
import cors from "cors";
import morgan from "morgan";
import upload from "./libs/upload.js";

// MODULES
import auth from "./modules/auth/network.js";
import user from "./modules/user/network.js";
import vigilancia from "./modules/vigilancia/network.js";

// MY MIDDLEWARE
import { verifyToken,verifyRol } from "./middlewares/security.js";

// ERROR
import {errorGeneral} from "./shared/error/error.handler.js";


const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//ROUTES
app.use('/api/v1',auth);
app.use('/api/v1/user',
    verifyToken,
    verifyRol(1),
    user);
app.use('/api/v1/vigilancia',
    verifyToken,
    verifyRol(2),
    upload.single('foto'),
    vigilancia);

app.use(errorGeneral);

export default app;