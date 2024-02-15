import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { API_URL } from "../public/Constants";
import SongCard from "./SongCard";
import { ISong } from "../interfaces/ISong";
import SongCardSmall from "./SongCardSmall";
import PlaySVG from "../assets/play-solid.svg";
import BackwardSVG from "../assets/backward-solid.svg";
import ForwardSVG from "../assets/forward-solid.svg";
import AddSVG from "../assets/circle-plus-solid.svg";
import Spinner from "./Spinner";
import style from "./Room.module.css";
import SearchPopUp from "./SearchPopUp";

const Room = () => {
  const { room } = useParams();
  const socket = useRef(null as Socket | null);
  const [exist, setExist] = useState(true);
  const [open, setOpen] = useState(false);
  const [queue, setQueue] = useState<{
    currentlyPlaying: ISong | null;
    queue: ISong[];
    expireAt: number;
  } | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (socket.current == null) {
      socket.current = io(API_URL, {
        transports: ["websocket"],
      });
    }
    fetch(`${API_URL}/room/join/${room}`)
      .then((res) => {
        if (!res.ok) {
          return setExist(false);
        }
        res.json().then((data) => setQueue(data));
      })
      .catch((err: unknown) => {
        setExist(false);
        console.error(err);
      });
    socket.current.connect();
    socket.current.emit("connectTo", room);
    socket.current.on(
      "updateQueue",
      (newQueue: {
        currentlyPlaying: ISong;
        queue: ISong[];
        expireAt: number;
      }) => {
        console.log(newQueue);
        setQueue(newQueue);
      }
    );
    socket.current.on("roomDestroyed", () => {
      navigate("/");
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);
  if (!room) return <p>Check your room id</p>;
  if (!exist)
    return (
      <div>
        <p>Room don't exist</p>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  if (!queue) return <Spinner />;
  return (
    <>
      <SearchPopUp
        isOpen={open}
        room={room}
        close={() => {
          setOpen(false);
        }}
      />
      <h2>Currently playing:</h2>
      {queue.currentlyPlaying ? (
        <SongCard {...queue.currentlyPlaying} />
      ) : (
        <p>No song is playing</p>
      )}
      <img
        onClick={() => {
          fetch(`${API_URL}/room/${room}/backward`);
        }}
        src={BackwardSVG}
        style={{ width: 40, margin: "0 10px" }}
        className={style.button}
      />
      <img
        onClick={() => {
          fetch(`${API_URL}/room/${room}/pp`);
        }}
        src={PlaySVG}
        style={{ width: 30, margin: "0 10px" }}
        className={style.button}
      />
      <img
        onClick={() => {
          fetch(`${API_URL}/room/${room}/forward`);
        }}
        src={ForwardSVG}
        style={{ width: 40, margin: "0 10px" }}
        className={style.button}
      />
      <img
        onClick={() => {
          setOpen(true);
        }}
        src={AddSVG}
        style={{ width: 40, margin: "0 10px" }}
        className={style.button}
      />
      <p>Room expire at: {new Date(queue.expireAt).toLocaleTimeString()}</p>
      <button
        onClick={() => {
          fetch(`${API_URL}/room/${room}/refresh`);
        }}
      >
        Refresh
      </button>
      <p>Room code is {room}</p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Copy link to clipboard");
        }}
      >
        Share room
      </button>
      <h2>Up next</h2>
      <p>
        Due to Spotify API limitation, only maximum of 20 songs can be shown
        <br />
        For queue shorter than 20 songs, the last few song will be random and
        aren't in the actual queue
      </p>
      {queue.queue.map((song, index) => (
        <SongCardSmall
          {...{ ...song, name: `${index + 1}. ${song.name}` }}
          key={index}
        />
      ))}
    </>
  );
};

export default Room;
