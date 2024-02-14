export const msToTimestamp = (duration: number) =>
  `${Math.round(duration / 1000 / 60)}:${Math.round((duration / 1000) % 60)
    .toString()
    .padStart(2, "0")}`;
