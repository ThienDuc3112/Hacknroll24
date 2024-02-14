import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { API_URL } from "../public/Constants";
import SongCard from "./SongCard";
import { ISong } from "../interfaces/ISong";
import SongCardSmall from "./SongCardSmall";

const Room = () => {
  const { room } = useParams();
  const socket = useRef(null as Socket | null);
  const [exist, setExist] = useState(false);
  const [queue, setQueue] = useState<{
    currentlyPlaying: ISong | null;
    queue: ISong[];
  }>({ currentlyPlaying: null, queue: [] });
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
        setExist(true);
        res.json().then((data) => setQueue(data));
      })
      .catch((err: unknown) => {
        console.error(err);
      });
    socket.current.connect();
    socket.current.emit("connectTo", room);
    socket.current.on(
      "updateQueue",
      (newQueue: { currentlyPlaying: ISong; queue: ISong[] }) => {
        console.log(newQueue);
        setQueue(newQueue);
      }
    );
    return () => {
      socket.current?.off("message");
      socket.current?.disconnect();
    };
  }, []);
  if (!room) return <p>Check your room id</p>;
  if (!exist) return <p>Room don't exist</p>;
  return (
    <>
      <h2>Currently playing:</h2>
      {queue.currentlyPlaying ? (
        <SongCard {...queue.currentlyPlaying} />
      ) : (
        <p>No song is playing</p>
      )}
      <button>Last</button>
      <button>Pause</button>
      <button>Next</button>
      <button>Add</button>
      <h2>Up next</h2>
      <p>
        Due to Spotify API limitation, only up to 20 songs are displayed
        <br />
        Also due to Spotify API limitation, it might display wrong songs / songs
        that aren't in the queue when there aren't 20 songs
      </p>
      {queue.queue.map((song, index) => (
        <SongCardSmall
          {...{ ...song, name: `${index + 1}. ${song.name}` }}
          key={index}
        />
      ))}
    </>
  );
  //   return <Spinner />;
};

export default Room;
