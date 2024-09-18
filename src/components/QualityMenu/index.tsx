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
    <button className="hover:sb-text-orange-500 sb-p-2" onClick={onClick}>
      <div className="sb-grid sb-grid-cols-12 sb-items-center sb-gap-2">
        <div className="sb-col-span-3">
          {isSelected ? <CheckedIcon className="sb-w-5 sb-h-5" /> : <div></div>}
        </div>

        <p className="sb-text-left sb-col-span-9">{quality.label}</p>
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
      buttonContent={<SettingsIcon className="sb-w-3 sb-h-3" />}
      menuContent={
        <div className="sb-rounded-md sb-bg-[#303030] sb-bg-opacity-50 sb-py-5 sb-w-[150px]">
          <div className="sb-flex sb-flex-col sb-gap-3">
            <div className="sb-px-5 sb-flex sb-flex-row sb-gap-3 sb-items-start">
              <button
                onClick={() => {
                  if (closeMenuFunction) {
                    closeMenuFunction();
                  }
                }}
                className="hover:sb-scale-150"
              >
                <LeftArrowIcon className="sb-w-3 sb-h-3" />
              </button>
              <h3>Quality</h3>
            </div>

            <div className="sb-w-full sb-h-[.1px] sb-bg-[#AAAAAA] sb-bg-opacity-70" />

            <div className="sb-px-5  sb-flex sb-flex-col sb-gap-3 sb-items-start">
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
