import React, { useEffect } from "react";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";

const CurrentTimeTracker = () => {
  const { setCurrentTime, player } = useSoftBuildersVideoPlayerContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(player?.currentTime() || 0);
    }, 500);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [player]);
  return <></>;
};

export default CurrentTimeTracker;
