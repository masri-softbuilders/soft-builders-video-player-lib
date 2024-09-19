import React, { useCallback, useEffect, useState } from "react";
import MenuButton from "../MenuButton";
import { useSoftBuildersVideoPlayerContext } from "../VideoPlayerComponent/provider";

import {
  CheckedIcon,
  LeftArrowIcon,
  SubtitlesIcon,
} from "soft-builders-video-player-icons";

type SubtitleOptionProps = {
  isSelected: boolean;
  subtitle: TextTrack;
  onClick: () => void;
};
const SubtitleOption = ({
  isSelected,
  subtitle,
  onClick,
}: SubtitleOptionProps) => {
  return (
    <button className="hover:sb-text-orange-500 sb-p-2" onClick={onClick}>
      <div className="sb-grid sb-grid-cols-12 sb-items-center sb-gap-2">
        <div className="sb-col-span-3">
          {isSelected ? <CheckedIcon className="sb-w-5 sb-h-5" /> : <div></div>}
        </div>

        <p className="sb-text-left sb-col-span-9">{subtitle.label}</p>
      </div>
    </button>
  );
};

type SubtitleMenuProps = {};

const SubtitleMenu = ({}: SubtitleMenuProps) => {
  const { player } = useSoftBuildersVideoPlayerContext();

  const [closeMenuFunction, setCloseMenuFunction] = useState<
    Function | undefined
  >(undefined);

  const [subtitles, setSubtitles] = useState<TextTrack[]>([]);

  const handleSelectSubtitle = (textTrack: TextTrack) => {
    const newSubtitles = subtitles.map((s) => {
      if (s.label === textTrack.label) {
        s.mode = "showing";
      } else {
        s.mode = "disabled";
      }
      return s;
    });

    setSubtitles(newSubtitles);
  };

  useEffect(() => {
    if (player) {
      const textTracks: TextTrack[] = (player as any).textTracks()?.tracks_;

      setSubtitles(textTracks);
    }
  }, [player]);

  return (
    <MenuButton
      buttonContent={<SubtitlesIcon className="sb-w-3 sb-h-3" />}
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
              <h3>Subtitle</h3>
            </div>

            <div className="sb-w-full sb-h-[.1px] sb-bg-[#AAAAAA] sb-bg-opacity-70" />

            <div className="sb-px-5  sb-flex sb-flex-col sb-gap-3 sb-items-start">
              {subtitles.map((q, i) => {
                return (
                  <SubtitleOption
                    key={`subtitle-${q.label}-${i}`}
                    isSelected={q.mode === "showing"}
                    subtitle={q}
                    onClick={() => {
                      handleSelectSubtitle(q);
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

export default SubtitleMenu;
