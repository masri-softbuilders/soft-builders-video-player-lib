export const durationFormater = (seconds: number) => {
  seconds = Math.floor(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  } else {
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }
};

export const convertSrtToVtt = (srt: string) => {
  const vtt = srt
    .replace(/(\d+)\n/g, "") // Remove numbering
    .replace(/,(\d{3})/g, ".$1") // Change time format from ',' to '.'
    .replace(/-->/g, " --> "); // Ensure correct arrow formatting
  return `WEBVTT\n\n${vtt}`;
};
