import React, { useEffect, useState } from "react";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";
import { SoftBuildersVideoPlayerChapter } from "../SoftBuildersVideoPlayer/types";
import Tooltip from "../Tooltip";
import { durationFormater } from "../../utils";
type Chapter = SoftBuildersVideoPlayerChapter & {
  startPercentage: number;
  endPercentage: number;
};
type Props = {
  chapter: Chapter;
};
const ChapterTooltip = ({ chapter }: Props) => {
  const { player } = useSoftBuildersVideoPlayerContext();

  const [open, setOpen] = useState(false);
  const { currentTime } = useSoftBuildersVideoPlayerContext();

  useEffect(() => {
    if (currentTime === Math.floor(chapter.startTime)) {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, [currentTime, chapter.startTime]);

  const handleClickChapter = () => {
    player?.currentTime(chapter.startTime);
  };

  return (
    <div
      id={`ii-section-${chapter.title}`}
      className="flex items-center w-full h-full absolute z-20"
      style={{
        left: `${chapter.startPercentage}%`,
        width: `${chapter.endPercentage - chapter.startPercentage}%`,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        id={`section-${chapter.title}`}
        className="h-full w-full"
        onClick={handleClickChapter}
      >
        <div className="relative flex h-full w-full justify-between items-center">
          <Tooltip open={open}>
            <div className="flex flex-col gap-2 items-center">
              <p>{chapter.title}</p>
              <p className="p-2 bg-[#303030] bg-opacity-50 rounded-md">
                {durationFormater(chapter.startTime)} -{" "}
                {durationFormater(chapter.endTime)}
              </p>
            </div>
          </Tooltip>
        </div>
      </button>
    </div>
  );
};

export default ChapterTooltip;
