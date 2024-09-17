import React, { useEffect, useState } from "react";

import Player from "video.js/dist/types/player";
import CurrentTimeLabel from "../CurrentTimeLabel";
import { durationFormater } from "../../utils";
import TimeSlider from "../TimeSlider";
import VolumeSlider from "../VolumeSlider";
import QualityMenu from "../QualityMenu";
import {
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
} from "../SoftBuildersVideoPlayer/types";
import NotesPanal from "../NotesPanal";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";
import CreateNoteMenu from "../CreateNoteMenu";
import ChaptersPanal from "../ChaptersPanal";
import {
  BackwardIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  FullScreenIcon,
} from "soft-builders-video-player-icons";

type Props<T> = {
  player: Player | undefined;
  notes: SoftBuildersVideoPlayerNote[];
  chapters: SoftBuildersVideoPlayerChapter[];
  seekStep?: number;
  handleSaveNoteAction?: (time: number, note: string) => Promise<T>;
};
const ControlBar = <T,>({
  player,
  notes,
  chapters,
  seekStep = 5,
  handleSaveNoteAction,
}: Props<T>) => {
  const { isPaused, setIsPaused, setPlayer } =
    useSoftBuildersVideoPlayerContext();

  const seek = (duration: number) => {
    const currentTime = Number(player?.currentTime() || 0);
    player?.currentTime(currentTime + duration);
  };

  const togglePlay = () => {
    if (isPaused) player?.play();
    else player?.pause();

    setIsPaused(!isPaused);
  };

  useEffect(() => {
    setPlayer(player);
  }, [player]);

  return (
    <div className="flex items-center justify-center gap-5 w-full">
      <button
        onClick={() => {
          seek(-seekStep);
        }}
      >
        <BackwardIcon className="w-3 h-3" />
      </button>
      <button onClick={togglePlay}>
        {isPaused ? (
          <PlayIcon className="w-3 h-3" />
        ) : (
          <PauseIcon className="w-3 h-3" />
        )}
      </button>
      <button
        onClick={() => {
          seek(seekStep);
        }}
      >
        <ForwardIcon className="w-3 h-3" />
      </button>

      <CurrentTimeLabel />

      <div className="w-[30%] hover:w-[40%] relative transition-all ease-in-out duration-500">
        <div className="absolute w-full top-[25%] left-0 z-10">
          <NotesPanal notes={notes} />
        </div>
        <div className="absolute w-full h-full top-0 left-0">
          <ChaptersPanal chapters={chapters} />
        </div>
        <TimeSlider />
      </div>

      <p>{durationFormater(player?.duration() || 0)}</p>

      <div className="w-[10%]">
        <VolumeSlider />
      </div>

      <QualityMenu />

      <button
        onClick={() => {
          if (player?.isFullscreen()) {
            player?.exitFullscreen();
          } else {
            player?.requestFullscreen();
          }
        }}
      >
        <FullScreenIcon className="w-3 h-3" />
      </button>

      <CreateNoteMenu handleSaveNoteAction={handleSaveNoteAction} />
    </div>
  );
};

export default ControlBar;
