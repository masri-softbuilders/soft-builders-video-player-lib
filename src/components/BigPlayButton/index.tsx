import React, { useState } from "react";
import Player from "video.js/dist/types/player";

import { PlayIcon, PauseIcon } from "soft-builders-video-player-icons";

type Props = {
  player: Player | undefined;
};
const BigPlayButton = ({ player }: Props) => {
  const [isPaused, setIsPaused] = useState(false);

  const togglePlay = () => {
    if (isPaused) player?.play();
    else player?.pause();

    setIsPaused(!isPaused);
  };

  return (
    <button onClick={togglePlay}>
      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-lg flex items-center justify-center ">
        {isPaused ? (
          <PlayIcon className="w-4 h-4" />
        ) : (
          <PauseIcon className="w-4 h-4" />
        )}
      </div>
    </button>
  );
};

export default BigPlayButton;
