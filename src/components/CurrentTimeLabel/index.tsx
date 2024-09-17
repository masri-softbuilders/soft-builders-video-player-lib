"use client";
import React, { useEffect } from "react";
import { durationFormater } from "../../utils";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";
type Props = {};

const CurrentTimeLabel = ({}: Props) => {
  const { currentTime, setCurrentTime, player } =
    useSoftBuildersVideoPlayerContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(player?.currentTime() || 0);
    }, 500);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [player]);

  return <p>{durationFormater(currentTime)}</p>;
};

export default CurrentTimeLabel;
