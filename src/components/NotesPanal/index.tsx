import React, { useEffect, useState } from "react";
import NoteTooltip from "../NoteTooltip";
import { useSoftBuildersVideoPlayerContext } from "../VideoPlayerComponent/provider";
import { SoftBuildersVideoPlayerNote } from "../../types";

type Note = SoftBuildersVideoPlayerNote & { percentage: number };
type Props = {
  notes: SoftBuildersVideoPlayerNote[];
};
const NotesPanal = ({ notes }: Props) => {
  const [ns, setNs] = useState<Note[]>([]);

  const { duration } = useSoftBuildersVideoPlayerContext();

  useEffect(() => {
    const newNs = notes.map((n) => {
      const percentage = Math.floor((n.time * 100) / duration);
      return {
        ...n,
        percentage,
      };
    });
    setNs(newNs);
  }, [notes, duration]);
  return (
    <div id="notes-panal" className="sb-w-full sb-h-full sb-relative ">
      {ns.map((n, i) => (
        <NoteTooltip key={`note-${i}-${n.time}`} note={n} />
      ))}
    </div>
  );
};

export default NotesPanal;
