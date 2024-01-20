import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const joinRoom: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/room/${room}`);
  };
  return (
    <div>
      <label htmlFor="room">Join a room</label>
      <form onSubmit={joinRoom}>
        <input
          type="text"
          name="room"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button type="submit">Join</button>
      </form>
      <label htmlFor="create">Create a room</label>
      <button onClick={() => navigate("/new")}>Create</button>
    </div>
  );
};

export default Home;
