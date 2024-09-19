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
  onPlay?: (time: number) => void;
  onPause?: (time: number) => void;
};

const SoftBuildersVideoPlayer = <T,>({
  options,
  notes,
  chapters,
  handleSaveNoteAction,
  onPlay,
  onPause,
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
      onPause={onPause}
      onPlay={onPlay}
    />
  );
};

export default SoftBuildersVideoPlayer;
