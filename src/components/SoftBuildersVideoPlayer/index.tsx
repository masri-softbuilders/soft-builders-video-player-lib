import React from "react";
import VideoPlayerComponent from "../VideoPlayerComponent";
import {
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
  SoftBuildersVideoPlayerOptions,
} from "../../types";

export type Props<T = any> = {
  options: SoftBuildersVideoPlayerOptions;
  notes: SoftBuildersVideoPlayerNote[];
  chapters: SoftBuildersVideoPlayerChapter[];
  handleSaveNoteAction?: (time: number, note: string) => Promise<T>;
};

const SoftBuildersVideoPlayer = <T,>({
  options,
  notes,
  chapters,
  handleSaveNoteAction,
}: Props<T>) => {
  options = {
    ...options,
    fullscreen: {
      navigationUI: "hide",
    },
  } as any;
  return (
    <VideoPlayerComponent
      chapters={chapters}
      options={options}
      notes={notes}
      handleSaveNoteAction={handleSaveNoteAction}
    />
  );
};

export default SoftBuildersVideoPlayer;
