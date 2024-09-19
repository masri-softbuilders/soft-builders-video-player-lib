import React, { useEffect, useState } from "react";
import Tooltip from "../Tooltip";
import { durationFormater } from "../../utils";
import { SoftBuildersVideoPlayerChapter } from "../../types";
import { useSoftBuildersVideoPlayerContext } from "../VideoPlayerComponent/provider";
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
      className="sb-flex sb-items-center sb-w-full sb-h-full sb-absolute sb-z-20"
      style={{
        left: `${chapter.startPercentage}%`,
        width: `${chapter.endPercentage - chapter.startPercentage}%`,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        id={`section-${chapter.title}`}
        className="sb-h-full sb-w-full"
        onClick={handleClickChapter}
      >
        <div className="sb-relative sb-flex sb-h-full sb-w-full sb-justify-between sb-items-center">
          <Tooltip open={open}>
            <div className="sb-flex sb-flex-col sb-gap-2 sb-items-center">
              <p>{chapter.title}</p>
              <p className="sb-p-2 sb-bg-[#303030] sb-bg-opacity-50 sb-rounded-md">
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
