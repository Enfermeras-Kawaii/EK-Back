import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

dotenv.config();

import { syncTables } from "./db";

import './models/solucitud.model';
import './models/telefonos.model';
import './models/association'

import adminRoutes from './routes/admin.router';
import applicationRoutes from './routes/solicitud.router';
import userRoutes from './routes/solicitante.router';
const app = express();

const PORT = process.env.PORT || 3000;
const origins = ["http://localhost:5173"];

app.use(helmet());

app.use(compression());

app.use(
    cors({
        origin(requestOrigin, callback) {
            if (!requestOrigin || origins.includes(requestOrigin as string)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by Urielito"), false);
                // urielito jajajjajajajjajajajjajajajaja
            }
        },
        credentials: true,
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', adminRoutes);
app.use('/api', applicationRoutes);
app.use('/api', userRoutes)

syncTables();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});