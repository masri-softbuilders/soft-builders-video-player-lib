import React, { useEffect, useState } from "react";

import ChapterTooltip from "../ChapterTooltip";
import { SoftBuildersVideoPlayerChapter } from "../../types";
import { useSoftBuildersVideoPlayerContext } from "../VideoPlayerComponent/provider";

type Chapter = SoftBuildersVideoPlayerChapter & {
  startPercentage: number;
  endPercentage: number;
};
type Props = {
  chapters: SoftBuildersVideoPlayerChapter[];
};
const ChaptersPanal = ({ chapters }: Props) => {
  const [cs, setCs] = useState<Chapter[]>([]);
  const { duration } = useSoftBuildersVideoPlayerContext();

  useEffect(() => {
    const newCs = chapters.map((c) => {
      const startPercentage = Math.floor((c.startTime * 100) / duration);
      const endPercentage = Math.floor((c.endTime * 100) / duration);
      return {
        ...c,
        startPercentage,
        endPercentage,
      };
    });
    setCs(newCs);
  }, [chapters, duration]);

  return (
    <div id="chapters-panal" className="sb-w-full sb-h-full sb-relative ">
      {cs.map((c, i) => (
        <ChapterTooltip key={`chapter-${i}-${c.startTime}`} chapter={c} />
      ))}
    </div>
  );
};

export default ChaptersPanal;
