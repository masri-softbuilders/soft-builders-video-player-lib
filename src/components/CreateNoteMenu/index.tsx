import React, { useState } from "react";
import MenuButton from "../MenuButton";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";

import { ClosedNoteIcon } from "soft-builders-video-player-icons";

type Props<T> = {
  handleSaveNoteAction?: (time: number, note: string) => Promise<T>;
};
const CreateNoteMenu = <T,>({ handleSaveNoteAction }: Props<T>) => {
  const { player } = useSoftBuildersVideoPlayerContext();

  const [note, setNote] = useState("");

  const handleSaveNote = () => {
    if (handleSaveNoteAction) {
      const time = player?.currentTime() || 0;
      handleSaveNoteAction(time, note).then((response) => {
        setNote("");
      });
    } else {
      window.alert(
        "Video Player, there is no implementation for the handleSaveNoteAction function"
      );
    }
  };

  return (
    <MenuButton
      buttonContent={<ClosedNoteIcon className="sb-w-3 sb-h-3" />}
      menuContent={
        <div className="sb-rounded-md sb-bg-[#303030] sb-bg-opacity-50 sb-py-5 sb-w-[220px]">
          <div className="sb-flex sb-flex-col sb-gap-3">
            <h3 className="sb-px-5">Add Note</h3>

            <div className="sb-w-full sb-h-[.1px] sb-bg-[#AAAAAA] sb-bg-opacity-70" />

            <div className="sb-px-5 sb-flex sb-flex-col sb-gap-4 sb-items-start">
              <input
                name="note"
                type="text"
                placeholder="Add a note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                className="sb-text-white placeholder:sb-text-white sb-w-full sb-bg-transparent sb-px-4 sb-py-3 sb-border sb-border-[#AAAAAA] sb-rounded-md"
              />

              <button className="sb-w-full" onClick={handleSaveNote}>
                <div className="sb-px-4 sb-py-3 sb-text-center sb-font-bold sb-bg-orange-500 sb-rounded-md">
                  Save
                </div>
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CreateNoteMenu;
