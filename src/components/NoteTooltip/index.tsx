import React, { useEffect, useState } from "react";
import { SoftBuildersVideoPlayerNote } from "../SoftBuildersVideoPlayer/types";
import Tooltip from "../Tooltip";
import { durationFormater } from "../../utils";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";
type Note = SoftBuildersVideoPlayerNote & { percentage: number };

type Props = {
  note: Note;
};

const NoteTooltip = ({ note }: Props) => {
  const [open, setOpen] = useState(false);
  const { currentTime } = useSoftBuildersVideoPlayerContext();

  useEffect(() => {
    if (currentTime === Math.floor(note.time)) {
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, [currentTime, note.time]);
  return (
    <div
      className="w-1 h-1 rounded-full bg-white absolute"
      style={{ left: `${note.percentage}%` }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="relative">
        <Tooltip open={open}>
          <div className="flex flex-col gap-2 items-center">
            <p>{note.label}</p>
            <p className="p-2 bg-[#303030] bg-opacity-50 rounded-md">
              {durationFormater(note.time)}
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default NoteTooltip;
