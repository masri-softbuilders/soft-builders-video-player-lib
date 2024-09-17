import React, { useEffect, useState } from "react";
import { SoftBuildersVideoPlayerNote } from "../SoftBuildersVideoPlayer/types";
import NoteTooltip from "../NoteTooltip";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";

type Note = SoftBuildersVideoPlayerNote & { percentage: number };
type Props = {
  notes: SoftBuildersVideoPlayerNote[];
};
const NotesPanal = ({ notes }: Props) => {
  const [ns, setNs] = useState<Note[]>([]);

  const { player } = useSoftBuildersVideoPlayerContext();

  useEffect(() => {
    const duration = player?.duration() || 1;
    const newNs = notes.map((n) => {
      const percentage = Math.floor((n.time * 100) / duration);
      return {
        ...n,
        percentage,
      };
    });
    setNs(newNs);
  }, [notes, player]);
  return (
    <div id="notes-panal" className="w-full h-full relative ">
      {ns.map((n, i) => (
        <NoteTooltip key={`note-${i}-${n.time}`} note={n} />
      ))}
    </div>
  );
};

export default NotesPanal;
