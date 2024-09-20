import React from "react";
import VideoPlayerComponent from "../VideoPlayerComponent";
import {
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
  SoftBuildersVideoPlayerOptions,
} from "../../types";

const DEFAULT_OPTIONS: SoftBuildersVideoPlayerOptions = {
  autoplay: false,
  controls: true,
  fluid: true,
  muted: true,
  height: 420,
  width: 720,
  sources: [],
  tracks: [],
};

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
    responsive: true,
    inactivityTimeout: 0,
    fullscreen: {
      navigationUI: "hide",
    },
  } as any;

  if (options.autoplay === undefined)
    options.autoplay = DEFAULT_OPTIONS.autoplay;
  if (options.controls === undefined)
    options.controls = DEFAULT_OPTIONS.controls;
  if (options.fluid === undefined) options.fluid = DEFAULT_OPTIONS.fluid;
  if (options.muted === undefined) options.muted = DEFAULT_OPTIONS.muted;
  if (options.height === undefined) options.height = DEFAULT_OPTIONS.height;
  if (options.width === undefined) options.width = DEFAULT_OPTIONS.width;

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
