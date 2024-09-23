import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import ControlBar from "../ControlBar";
import {
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
  SoftBuildersVideoPlayerOptions,
} from "../../types";

import "./style/style.css";
import "../../styles/tailwind.css";
import { SoftBuildersVideoPlayerProvider } from "./provider";
import BigPlayButton from "../BigPlayButton";

let bigPlayButtonRoot: ReactDOM.Root | undefined;

const renderBigPlayButton = (
  player: Player | undefined,
  isPaused: boolean,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const element: any = document.querySelector(".vjs-big-play-button");
  if (element) {
    if (!bigPlayButtonRoot) {
      // If bigPlayButtonRoot hasn't been created, create it
      bigPlayButtonRoot = ReactDOM.createRoot(element as HTMLElement);
    }

    bigPlayButtonRoot.render(
      <BigPlayButton
        player={player}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
    );
  }
};

let controlBarRoot: ReactDOM.Root | undefined;

const renderControlBar = <T,>(
  player: Player | undefined,
  isPaused: boolean,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
  duration: number,
  notes: SoftBuildersVideoPlayerNote[],
  chapters: SoftBuildersVideoPlayerChapter[],
  seekStep: number = 5,
  handleSaveNoteAction?: (time: number, note: string) => Promise<T>
) => {
  const element: any = document.querySelector(".vjs-control-bar");
  if (element) {
    if (!controlBarRoot) {
      // If controlBarRoot hasn't been created, create it
      controlBarRoot = ReactDOM.createRoot(element as HTMLElement);
    }

    element.style.display = "block";
    controlBarRoot.render(
      <SoftBuildersVideoPlayerProvider>
        <ControlBar
          player={player}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          duration={duration}
          notes={notes}
          chapters={chapters}
          seekStep={seekStep}
          handleSaveNoteAction={handleSaveNoteAction}
        />
      </SoftBuildersVideoPlayerProvider>
    );
  }
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

const VideoPlayerComponent = <T,>({
  options,
  notes,
  chapters,
  startTime = 0,
  handleSaveNoteAction,
  onPlay,
  onPause,
}: Props<T>) => {
  const videoRef = useRef<any>(undefined);
  const playerRef = useRef<Player | undefined>(undefined);

  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(!options.autoplay);
  const [duration, setDuratoin] = useState(1);

  const onReady = (player: Player) => {
    playerRef.current = player;
    setIsReady(true);

    player.currentTime(startTime);

    player.on("waiting", () => {});

    player.on("dispose", () => {
      videojs.log("player will dispose");
      setIsReady(false);
    });

    player.on("loadedmetadata", () => {
      const d = player.duration();
      setDuratoin(d);
    });
  };

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      playerRef.current = videojs(videoElement, options, () => {
        onReady(playerRef.current as Player);
      });
    }

    return () => {
      if (playerRef.current) {
        // Dispose of the player properly on component unmount
        playerRef.current.dispose();
        playerRef.current = undefined;

        // Defer unmounting of big play button and control bar to avoid race conditions
        setTimeout(() => {
          if (bigPlayButtonRoot) {
            bigPlayButtonRoot.unmount();
            bigPlayButtonRoot = undefined;
          }
          if (controlBarRoot) {
            controlBarRoot.unmount();
            controlBarRoot = undefined;
          }
        }, 0);
      }
    };
  }, [options]);

  useEffect(() => {
    if (playerRef && playerRef?.current && isReady) {
      const currentTime = playerRef.current.currentTime() || 0;

      if (isPaused) {
        if (onPause) onPause(currentTime);
      } else {
        if (onPlay) onPlay(currentTime);
      }
    }
  }, [isPaused, isReady]);

  useEffect(() => {
    if (isReady) {
      const controlBarTimeout = setTimeout(() => {
        renderControlBar(
          playerRef.current,
          isPaused,
          setIsPaused,
          duration,
          notes,
          chapters,
          5,
          handleSaveNoteAction
        );
      }, 500);

      return () => clearTimeout(controlBarTimeout); // Clean up the timeout
    }
  }, [
    playerRef,
    isPaused,
    setIsPaused,
    notes,
    chapters,
    isReady,
    handleSaveNoteAction,
    duration,
  ]);

  useEffect(() => {
    if (isReady) {
      const playButtonTimeout = setTimeout(() => {
        renderBigPlayButton(playerRef.current, isPaused, setIsPaused);
      }, 500);

      return () => clearTimeout(playButtonTimeout); // Clean up the timeout
    }
  }, [isPaused, isReady]);

  useEffect(() => {
    if (playerRef.current) {
      const intervalId = setInterval(() => {
        setIsPaused(playerRef.current.paused());
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div
      id="video-container"
      className="sb-relative sb-rounded-md sb-overflow-hidden"
    >
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    </div>
  );
};

export default VideoPlayerComponent;
