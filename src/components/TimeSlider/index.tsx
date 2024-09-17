import React, { useEffect, useState } from "react";
import Slider from "../Slider";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";
import { SoftBuildersVideoPlayerChapter } from "../SoftBuildersVideoPlayer/types";

const MIN = 0,
  MAX = 100;
const DEFERENCE = Math.abs(MAX - MIN);
const BAR_PERCENTAGE_WIDTH = 0.5;

type Props = {
  chapters: SoftBuildersVideoPlayerChapter[];
};

const TimeSlider = ({ chapters }: Props) => {
  const [timeSlider, setTimeSlider] = useState(0);

  const { player, duration } = useSoftBuildersVideoPlayerContext();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeSlider = Number(e.target.value);
    setTimeSlider(newTimeSlider);

    const time = (newTimeSlider * duration) / DEFERENCE;

    player?.currentTime(time);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = player?.currentTime() || 0;

      const time = (currentTime * DEFERENCE) / duration;

      setTimeSlider(time);
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [player]);

  const [maskCuttes, setMaskCuttes] = useState("");

  useEffect(() => {
    const arr: string[] = ["black 0%"];
    chapters.forEach((c) => {
      const startPercentage = Math.floor((c.startTime * 100) / duration);
      const endPercentage = Math.floor((c.endTime * 100) / duration);
      arr.push(`black ${startPercentage}%`);
      arr.push(`transparent ${startPercentage}%`);
      arr.push(`transparent ${startPercentage + BAR_PERCENTAGE_WIDTH}%`);

      arr.push(`black ${startPercentage + BAR_PERCENTAGE_WIDTH}%`);
      arr.push(`black ${endPercentage}%`);

      arr.push(`transparent ${endPercentage}%`);
      arr.push(`transparent ${endPercentage + BAR_PERCENTAGE_WIDTH}%`);

      arr.push(`black ${endPercentage + BAR_PERCENTAGE_WIDTH}%`);
    });
    arr.push(`black 100%`);

    setMaskCuttes(arr.toString());
  }, [chapters, duration]);

  return (
    <div className=" w-full h-2 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full z-10">
        <Slider
          value={timeSlider}
          handleValueChange={handleValueChange}
          min={MIN}
          max={MAX}
          style={{
            background: "transparent",
          }}
        />
      </div>

      <div
        className="absolute top-0 left-0 w-full h-2 bg-slate-400 rounded-md"
        style={{
          background: `
          linear-gradient(to right,
            #f97316 0%,
            #f97316 ${timeSlider}%,
            #303030 ${timeSlider}%,
            #303030 100%
          )
        `,
          maskImage: `
          linear-gradient(to right,
            ${maskCuttes}
          )
        `,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default TimeSlider;
