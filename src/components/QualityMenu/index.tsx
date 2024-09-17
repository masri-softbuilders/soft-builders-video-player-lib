import React, { useCallback, useEffect, useState } from "react";
import MenuButton from "../MenuButton";
import { SoftBuildersVideoPlayerSource } from "../SoftBuildersVideoPlayer/types";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";

import {
  CheckedIcon,
  SettingsIcon,
  LeftArrowIcon,
} from "soft-builders-video-player-icons";

type QualityOptionProps = {
  isSelected: boolean;
  quality: SoftBuildersVideoPlayerSource;
  onClick: () => void;
};
const QualityOption = ({
  isSelected,
  quality,
  onClick,
}: QualityOptionProps) => {
  return (
    <button className="hover:text-orange-500 p-2" onClick={onClick}>
      <div className="grid grid-cols-12 items-center gap-2">
        <div className="col-span-3">
          {isSelected ? <CheckedIcon className="w-5 h-5" /> : <div></div>}
        </div>

        <p className="text-left col-span-9">{quality.label}</p>
      </div>
    </button>
  );
};

type QualityMenuProps = {};

const QualityMenu = ({}: QualityMenuProps) => {
  const { player } = useSoftBuildersVideoPlayerContext();

  const [closeMenuFunction, setCloseMenuFunction] = useState<
    Function | undefined
  >(undefined);

  const [qualities, setQualities] = useState<SoftBuildersVideoPlayerSource[]>(
    []
  );

  const [currentQualitySrc, setCurrentQualitySrc] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (player) {
      const sources = player.currentSources();

      const qs: SoftBuildersVideoPlayerSource[] = JSON.parse(
        JSON.stringify(sources)
      );

      setQualities(qs);

      const source = player.currentSource();
      const quality: SoftBuildersVideoPlayerSource = JSON.parse(
        JSON.stringify(source)
      );

      setCurrentQualitySrc(quality.src);
    }
  }, [player]);

  return (
    <MenuButton
      buttonContent={<SettingsIcon className="w-3 h-3" />}
      menuContent={
        <div className="rounded-md bg-[#303030] bg-opacity-50 py-5 w-[150px]">
          <div className="flex flex-col gap-3">
            <div className="px-5 flex flex-row gap-3 items-start">
              <button
                onClick={() => {
                  if (closeMenuFunction) {
                    closeMenuFunction();
                  }
                }}
                className="hover:scale-150"
              >
                <LeftArrowIcon className="w-3 h-3" />
              </button>
              <h3>Quality</h3>
            </div>

            <div className="w-full h-[.1px] bg-[#AAAAAA] bg-opacity-70" />

            <div className="px-5  flex flex-col gap-3 items-start">
              {qualities.map((q, i) => {
                return (
                  <QualityOption
                    key={`quality-${q.label}-${i}`}
                    isSelected={currentQualitySrc === q.src}
                    quality={q}
                    onClick={() => {
                      const source = qualities.find(
                        (_q) => q.label == _q.label
                      );
                      if (source) {
                        player?.src(source.src);
                        const currentTime = player?.currentTime();
                        setCurrentQualitySrc(source.src);
                        player?.currentTime(currentTime);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      }
      close={(fn: Function) => {
        setCloseMenuFunction(() => fn);
      }}
    />
  );
};

export default QualityMenu;
