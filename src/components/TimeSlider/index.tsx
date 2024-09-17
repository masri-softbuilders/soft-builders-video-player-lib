import React, { useEffect, useState } from "react";
import Slider from "../Slider";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";

const MIN = 0,
  MAX = 100;
const DEFERENCE = Math.abs(MAX - MIN);

type Props = {};

const TimeSlider = ({}: Props) => {
  const [timeSlider, setTimeSlider] = useState(0);

  const { player } = useSoftBuildersVideoPlayerContext();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeSlider = Number(e.target.value);
    setTimeSlider(newTimeSlider);

    const duration = player?.duration() || 1;

    const time = (newTimeSlider * duration) / DEFERENCE;

    player?.currentTime(time);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = player?.currentTime() || 0;

      const duration = player?.duration() || 1;

      const time = (currentTime * DEFERENCE) / duration;

      setTimeSlider(time);
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [player]);

  return (
    <Slider
      value={timeSlider}
      handleValueChange={handleValueChange}
      min={MIN}
      max={MAX}
    />
  );
};

export default TimeSlider;
