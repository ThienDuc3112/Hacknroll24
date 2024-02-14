import { msToTimestamp } from "../helpers/msToTimestamp";
import { ISong } from "../interfaces/ISong";
import style from "./SongCardSmall.module.css";

const SongCardSmall = ({ name, artists, cover, duration, id, url }: ISong) => {
  id;
  return (
    <a
      href={url}
      target="_blank"
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        className={style.displayRow}
        style={{ justifyContent: "space-between", padding: "0 8px" }}
      >
        <div className={style.displayRow}>
          <img src={cover} className={style.cover} />
          <div style={{ alignSelf: "center" }}>
            <p style={{ margin: 0, textAlign: "left" }}>
              <b>{name}</b>
            </p>
            <p style={{ margin: 0, textAlign: "left" }}>{artists.join(", ")}</p>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>{msToTimestamp(duration)}</p>
        </div>
      </div>
    </a>
  );
};

export default SongCardSmall;
