import styles from "./SongCard.module.css";

const SongCard = ({
  id,
  name,
  cover,
  artists,
  url,
}: {
  id: string;
  name: string;
  cover: string;
  artists: string[];
  url: string;
}) => {
  id;
  return (
    <>
      <a href={url}>
        <div className={styles.container}>
          <div className={styles.coverContainer}>
            <img className={styles.cover} src={cover} />
          </div>
          <div className={styles.content}>
            <h4>{name}</h4>
            <p>{artists.join(" and ")}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default SongCard;
