import { useEffect, useRef, useState } from "react";
import styles from "./SearchPopUp.module.css";
import { API_URL } from "../public/Constants";
import SongCard from "./SongCard";
import { ISong } from "../interfaces/ISong";
let timeout: NodeJS.Timeout;
const SearchPopUp = ({
  isOpen,
  room,
  close,
}: {
  isOpen: boolean;
  room: string;
  close: () => unknown;
}) => {
  const [songName, setSongName] = useState("");
  const [songs, setSongs] = useState([] as ISong[]);
  const ref = useRef<HTMLDialogElement | null>(null);
  const fetchSongs = (songName: string) => {
    clearTimeout(timeout);
    if (songName.length == 0) return;
    timeout = setTimeout(() => {
      fetch(`${API_URL}/song/search/${songName}`).then((res) => {
        if (res.ok) {
          res.json().then((data) => setSongs(data));
        }
      });
    }, 1000);
  };
  useEffect(() => {
    if (songName.length == 0) setSongs([]);
    fetchSongs(songName);
  }, [songName]);
  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);
  return (
    <dialog
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        backgroundColor: "rgba(0,0,0,0.5)",
        overflowY: "hidden",
      }}
    >
      <div className={styles.bigContainer} id="content">
        <div className={styles.searchContainer}>
          <input
            className={styles.input}
            placeholder="Add song"
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
          <button
            onClick={() => {
              setSongName("");
              close();
            }}
          >
            Close
          </button>
          {songName.length != 0 && songs.length != 0 && (
            <div className={styles.songs}>
              {songs.map((song) => (
                <SongCard
                  key={song.id}
                  {...song}
                  onClick={() => {
                    console.log("Click");
                    fetch(`${API_URL}/room/${room}/add`, {
                      method: "POST",
                      headers: {
                        "Content-type": "Application/json",
                      },
                      body: JSON.stringify({ song: song.id }),
                    }).finally(() => {
                      setSongName("");
                      close();
                    });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default SearchPopUp;
