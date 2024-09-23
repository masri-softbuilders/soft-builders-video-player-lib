import React, { memo, useEffect, useState } from "react";
import VideoPlayerComponent from "../VideoPlayerComponent";
import {
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
  SoftBuildersVideoPlayerOptions,
  SoftBuildersVideoPlayerTrack,
} from "../../types";
import { convertSRTtoVTT } from "../../utils";

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
  startTime?: number;
  handleSaveNoteAction?: (time: number, note: string) => Promise<T>;
  onPlay?: (time: number) => void;
  onPause?: (time: number) => void;
};

const Component = <T,>({
  options,
  notes,
  chapters,
  startTime = 0,
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

  const [tracks, setTracks] = useState<SoftBuildersVideoPlayerTrack[]>([]);

  useEffect(() => {
    const getTracks = async () => {
      const newTracks: SoftBuildersVideoPlayerTrack[] = [];
      for (const [i, s] of options.tracks.entries()) {
        let src = s.src;

        if (s.memeType == "text/srt") {
          src = await convertSRTtoVTT(s.src);
        }

        newTracks.push({
          ...s,
          src,
        });
      }

      setTracks(newTracks);
    };

    getTracks();
  }, [options.tracks]);

  const id = (Date.now() + Math.random() * 100).toString();

  return (
    <VideoPlayerComponent
      id={id}
      chapters={chapters}
      options={{ ...options, tracks }}
      notes={notes}
      startTime={startTime}
      handleSaveNoteAction={handleSaveNoteAction}
      onPause={onPause}
      onPlay={onPlay}
    />
  );
};

const SoftBuildersVideoPlayer = memo(Component, (prevProps, nextProps) => {
  return (
    prevProps.options === nextProps.options &&
    prevProps.notes === nextProps.notes &&
    prevProps.chapters === nextProps.chapters &&
    prevProps.startTime === nextProps.startTime
  );
});

export default SoftBuildersVideoPlayer;
