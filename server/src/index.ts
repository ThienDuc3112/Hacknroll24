import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import songRoute from "./routes/song";
import spotify from "spotify-web-api-node";
import { config } from "dotenv";
import authRouter from "./routes/auth";
config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4001;
app.set("port", PORT);
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

export const spotifyWebAPI = new spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_TOKEN,
  redirectUri: process.env.CLIENT_URL,
});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => res.send("up"));

app.use("/song", songRoute);
app.use("/auth", authRouter);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message);
    socket.emit("message", io.engine.clientsCount);
  });
  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

spotifyWebAPI.clientCredentialsGrant().then((data) => {
  console.log(data);
  spotifyWebAPI.setAccessToken(data.body.access_token);
});
