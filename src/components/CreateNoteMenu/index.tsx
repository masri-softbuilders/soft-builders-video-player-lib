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
      buttonContent={<ClosedNoteIcon className="w-3 h-3" />}
      menuContent={
        <div className="rounded-md bg-[#303030] bg-opacity-50 py-5 w-[220px]">
          <div className="flex flex-col gap-3">
            <h3 className="px-5">Add Note</h3>

            <div className="w-full h-[.1px] bg-[#AAAAAA] bg-opacity-70" />

            <div className="px-5 flex flex-col gap-4 items-start">
              <input
                name="note"
                type="text"
                placeholder="Add a note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                className="text-white placeholder:text-white w-full bg-transparent px-4 py-3 border border-[#AAAAAA] rounded-md"
              />

              <button className="w-full" onClick={handleSaveNote}>
                <div className="px-4 py-3 text-center font-bold bg-orange-500 rounded-md">
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
