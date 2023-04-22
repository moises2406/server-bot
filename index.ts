import { config } from "dotenv";
config();
import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import routerUrl from "./router/Urls.routes";
const server = http.createServer(app);
import { Server } from "socket.io";
import morgan from "morgan";
const soketport = process.env.SocketPort || 'http://localhost:3000';
const io = new Server(server,{
    cors: {
        origin: soketport
    }
});

const port = process.env.PORT || 5000;

// settins
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// variable port
app.set("port", port);

// router
app.use(routerUrl);

export { io, server, app };
