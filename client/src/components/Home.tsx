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
            setRoom(e.target.value.toLowerCase());
          }}
        />
        <button type="submit">Join</button>
      </form>
      <label htmlFor="create">Create a room</label>
      <button
        onClick={() => {
          window.location.href = `https://accounts.spotify.com/en/authorize?response_type=code&client_id=1f73608c58c94e93ae21affa44f2cf82&scope=user-read-currently-playing%20user-modify-playback-state%20user-read-playback-state&redirect_uri=http://localhost:5173/callback`;
        }}
      >
        Create
      </button>
      <p>
        Note: The host must have Spotify premium to start a room
        <br />
        Everyone else however does not
      </p>
    </div>
  );
};

export default Home;
