import { useParams } from "react-router-dom";
// import Spinner from "./Spinner";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { API_URL } from "../public/Constants";

const Room = () => {
  const { room } = useParams();
  const socket = useRef(null as Socket | null);
  const [message, setMessage] = useState("");
  const [clientCount, setCount] = useState(0);
  const test: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    socket.current?.emit("message", message);
  };
  useEffect(() => {
    if (socket.current == null) {
      socket.current = io(API_URL);
    }
    socket.current.connect();
    socket.current.on("message", (msg) => {
      setCount(msg);
    });
    return () => {
      socket.current?.off("message");
      socket.current?.disconnect();
    };
  }, []);
  if (!room) return <p>Check your room id</p>;
  return (
    <>
      <p>Click this</p>
      <form onSubmit={test}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">this</button>
      </form>
      <p>Clients count</p>
      <p>{clientCount}</p>
    </>
  );
  //   return <Spinner />;
};

export default Room;
