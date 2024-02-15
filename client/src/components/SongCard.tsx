import { MouseEventHandler } from "react";
import { msToTimestamp } from "../helpers/msToTimestamp";
import { ISong } from "../interfaces/ISong";
import styles from "./SongCard.module.css";

const SongCard = ({
  id,
  name,
  cover,
  artists,
  url,
  duration,
  onClick,
}: ISong & { onClick?: MouseEventHandler<HTMLDivElement> }) => {
  id;
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.coverContainer}>
        <img className={styles.cover} src={cover} />
      </div>
      <div className={styles.content}>
        <h4 style={{ marginBottom: 8, marginTop: 8 }}>{name}</h4>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Artist(s): {artists.join(" and ")}
        </p>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Duration:{` ${msToTimestamp(duration)}`}
        </p>
        <button onClick={() => window.open(url, "_blank")}>Spotify link</button>
      </div>
    </div>
  );
};

export default SongCard;
