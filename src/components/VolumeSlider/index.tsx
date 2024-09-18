import React, { useEffect, useState } from "react";
import Slider from "../Slider";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";

import { MuteIcon, UnmuteIcon } from "soft-builders-video-player-icons";

const MIN = 0,
  MAX = 100;

type Props = {};

const VolumeSlider = ({}: Props) => {
  const { player } = useSoftBuildersVideoPlayerContext();

  const [volume, setVolume] = useState(0);

  useEffect(() => {
    setVolume(player?.muted() ? 0 : Number(player?.volume()) * 100 || 0);
  }, [player]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    player?.volume(newVolume / 100);

    if (newVolume === 0) {
      player?.muted(true);
    } else {
      player?.muted(false);
    }
  };

  return (
    <div className="sb-flex sb-items-center sb-gap-2">
      {volume === 0 || player?.muted() ? (
        <MuteIcon className="sb-w-3 sb-h-3" />
      ) : (
        <UnmuteIcon className="sb-w-3 sb-h-3" />
      )}

      <Slider
        value={volume}
        handleValueChange={handleValueChange}
        min={MIN}
        max={MAX}
      />
    </div>
  );
};

export default VolumeSlider;
