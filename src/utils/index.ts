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

const SRTtoVTT = (srt: string) => {
  // Normalize line breaks and split into lines
  const lines = srt.split(/\r?\n/).filter((line) => line.trim() !== "");

  // Prepare VTT content
  let vttContent = "WEBVTT\n\n";
  let currentEntry = "";

  lines.forEach((line) => {
    if (/^\d+$/.test(line)) {
      // Ignore index lines
      return;
    }

    const timestampMatch = line.match(
      /(\d{2}:\d{2}:\d{2}),(\d{3}) --> (\d{2}:\d{2}:\d{2}),(\d{3})/
    );
    if (timestampMatch) {
      if (currentEntry) {
        vttContent += currentEntry.trim() + "\n\n"; // Add previous entry
      }
      // Replace commas with dots in timestamps and concatenate the groups
      currentEntry = `${timestampMatch[1]}.${timestampMatch[2]} --> ${timestampMatch[3]}.${timestampMatch[4]}\n`;
    } else if (currentEntry) {
      // Add subtitle line to the current entry
      currentEntry += line + "\n";
    }
  });

  if (currentEntry) {
    vttContent += currentEntry.trim(); // Add last entry
  }

  return vttContent.trim();
};

export const convertSRTtoVTT = async (srtLink: string) => {
  const response = await fetch(srtLink);
  const srtText = await response.text();
  const vttText = SRTtoVTT(srtText);

  // Create a Blob URL for the VTT
  const blob = new Blob([vttText], { type: "text/vtt" });
  const vttUrl = URL.createObjectURL(blob);
  return vttUrl;
};
