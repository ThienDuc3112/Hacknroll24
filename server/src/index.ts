import express, { json } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import songRoute from "./routes/song";
import spotify from "spotify-web-api-node";
import { config } from "dotenv";
import roomRoute from "./routes/room";
config();

const app = express();
app.use(cors());
app.use(json());
const PORT = process.env.PORT || 4001;
app.set("port", PORT);
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

export const spotifyWebAPI = new spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_TOKEN,
  redirectUri: process.env.REDIRECT_URI,
});

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => res.send("up"));

app.use("/song", songRoute);
app.use("/room", roomRoute);

io.on("connection", (socket) => {
  console.log(`New connection\t Current count: ${io.engine.clientsCount} `);
  socket.on("connectTo", (room) => socket.join(room));
  socket.on("message", (message) => {
    console.log(message);
    socket.emit("message", io.engine.clientsCount);
  });
  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

spotifyWebAPI.clientCredentialsGrant().then((data) => {
  console.log(data.body);
  spotifyWebAPI.setAccessToken(data.body.access_token);
});
setInterval(() => {
  spotifyWebAPI.clientCredentialsGrant().then((data) => {
    console.log(data.body);
    spotifyWebAPI.setAccessToken(data.body.access_token);
  });
}, 3600_000 - 100);
