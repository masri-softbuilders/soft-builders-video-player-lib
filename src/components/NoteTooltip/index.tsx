import React, { useEffect, useState } from "react";
import Tooltip from "../Tooltip";
import { durationFormater } from "../../utils";
import { useSoftBuildersVideoPlayerContext } from "../VideoPlayerComponent/provider";
import { SoftBuildersVideoPlayerNote } from "../../types";
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
      className="sb-w-1 sb-h-1 sb-rounded-full sb-bg-white sb-absolute sb-z-30"
      style={{ left: `${note.percentage}%` }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="sb-relative">
        <Tooltip open={open}>
          <div className="sb-flex sb-flex-col sb-gap-2 sb-items-center">
            <p>{note.label}</p>
            <p className="sb-p-2 sb-bg-[#303030] sb-bg-opacity-50 sb-rounded-md">
              {durationFormater(note.time)}
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default NoteTooltip;
