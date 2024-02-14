import { useEffect, useState } from "react";
import styles from "./SearchPopUp.module.css";
import { API_URL } from "../public/Constants";
import SongCard from "./SongCard";
import { ISong } from "../interfaces/ISong";
let timeout: NodeJS.Timeout;
const SearchPopUp = () => {
  const [songName, setSongName] = useState("");
  const [songs, setSongs] = useState([] as ISong[]);
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
  return (
    <div className={styles.bigContainer}>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          placeholder="Add song"
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        {songName.length != 0 && songs.length != 0 && (
          <div className={styles.songs}>
            {songs.map((song) => (
              <SongCard key={song.id} {...song} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPopUp;
