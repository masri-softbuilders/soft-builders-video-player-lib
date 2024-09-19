import React, { useEffect } from "react";
import { useSoftBuildersVideoPlayerContext } from "../VideoPlayerComponent/provider";

const BufferTracker = () => {
  const { player, setDownloadedBufferTimeufferTime } =
    useSoftBuildersVideoPlayerContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (player) setDownloadedBufferTimeufferTime(player.bufferedEnd());
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [player]);
  return <></>;
};

export default BufferTracker;
