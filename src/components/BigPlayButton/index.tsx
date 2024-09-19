import React, { useState } from "react";
import Player from "video.js/dist/types/player";

import { PlayIcon, PauseIcon } from "soft-builders-video-player-icons";

type Props = {
  player: Player | undefined;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
};
const BigPlayButton = ({ player, isPaused, setIsPaused }: Props) => {
  const togglePlay = () => {
    if (isPaused) player?.play();
    else player?.pause();

    setIsPaused(!isPaused);
  };

  return (
    <button onClick={togglePlay}>
      <div className="sb-w-16 sb-h-16 sb-rounded-full sb-bg-white/30 sb-backdrop-blur-lg sb-flex sb-items-center sb-justify-center ">
        {isPaused ? (
          <PlayIcon className="sb-w-4 sb-h-4" />
        ) : (
          <PauseIcon className="sb-w-4 sb-h-4" />
        )}
      </div>
    </button>
  );
};

export default BigPlayButton;
