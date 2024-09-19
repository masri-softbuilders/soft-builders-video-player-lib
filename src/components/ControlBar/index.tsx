import React, { useEffect } from "react";

import Player from "video.js/dist/types/player";
import CurrentTimeLabel from "../CurrentTimeLabel";
import { durationFormater } from "../../utils";
import VolumeSlider from "../VolumeSlider";
import QualityMenu from "../QualityMenu";

import CreateNoteMenu from "../CreateNoteMenu";
import {
  BackwardIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  FullScreenIcon,
} from "soft-builders-video-player-icons";
import TimeSliderContainer from "../TimeSliderContainer";
import BufferTracker from "../BufferTracker";
import CurrentTimeTracker from "../CurrentTimeTracker";
import {
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
} from "../../types";
import { useSoftBuildersVideoPlayerContext } from "../VideoPlayerComponent/provider";

type Props<T> = {
  player: Player | undefined;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  notes: SoftBuildersVideoPlayerNote[];
  chapters: SoftBuildersVideoPlayerChapter[];
  seekStep?: number;
  handleSaveNoteAction?: (time: number, note: string) => Promise<T>;
};
const ControlBar = <T,>({
  player,
  isPaused,
  setIsPaused,
  notes,
  chapters,
  seekStep = 5,
  handleSaveNoteAction,
}: Props<T>) => {
  const { setPlayer, setDuration, duration } =
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
    setDuration(player?.duration() || 1);
  }, [player]);

  return (
    <div className="sb-flex sb-items-center sb-justify-center sb-gap-3 sb-w-full">
      {/* Doesn't display anything, just set the downloaded buffer persentage */}
      <BufferTracker />
      {/* Doesn't display anything, just set the current time */}
      <CurrentTimeTracker />

      <button
        onClick={() => {
          seek(-seekStep);
        }}
      >
        <BackwardIcon className="sb-w-3 sb-h-3" />
      </button>
      <button onClick={togglePlay}>
        {isPaused ? (
          <PlayIcon className="sb-w-3 sb-h-3" />
        ) : (
          <PauseIcon className="sb-w-3 sb-h-3" />
        )}
      </button>
      <button
        onClick={() => {
          seek(seekStep);
        }}
      >
        <ForwardIcon className="sb-w-3 sb-h-3" />
      </button>

      <CurrentTimeLabel />

      <div className="sb-w-[30%] hover:sb-w-[45%] sb-transition-all sb-ease-in-out sb-duration-500">
        <TimeSliderContainer chapters={chapters} notes={notes} />
      </div>

      <p>{durationFormater(duration || 0)}</p>

      <div className="sb-w-[10%]">
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
        <FullScreenIcon className="sb-w-3 sb-h-3" />
      </button>

      <CreateNoteMenu handleSaveNoteAction={handleSaveNoteAction} />
    </div>
  );
};

export default ControlBar;
