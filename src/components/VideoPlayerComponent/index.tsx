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

const renderBigPlayButton = (player: Player | undefined) => {
  const element: any = document.querySelector(".vjs-big-play-button");
  if (element) {
    if (!bigPlayButtonRoot) {
      // If bigPlayButtonRoot hasn't been created, create it
      bigPlayButtonRoot = ReactDOM.createRoot(element as HTMLElement);
    }

    bigPlayButtonRoot.render(<BigPlayButton player={player} />);
  }
};

let controlBarRoot: ReactDOM.Root | undefined;

const renderControlBar = <T,>(
  player: Player | undefined,
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
  handleSaveNoteAction?: (time: number, note: string) => Promise<T>;
};

const VideoPlayerComponent = <T,>({
  options,
  notes,
  chapters,
  handleSaveNoteAction,
}: Props<T>) => {
  const videoRef = useRef<any>(undefined);
  const playerRef = useRef<Player | undefined>(undefined);

  const [isReady, setIsReady] = useState(false);

  const onReady = (player: Player) => {
    playerRef.current = player;
    setIsReady(true);

    player.on("waiting", () => {});

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef?.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      // (player as any)?.controlBar.addChild("QualitySelector");

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player?.autoplay(options.autoplay);
      player?.src(options.sources);
    }
  }, [options, playerRef, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = undefined;
      }
    };
  }, [playerRef]);

  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        renderControlBar(
          playerRef.current,
          notes,
          chapters,
          5,
          handleSaveNoteAction
        );
      }, 500);
    }
  }, [playerRef, notes, chapters, isReady, handleSaveNoteAction]);

  useEffect(() => {
    if (isReady) {
      setTimeout(() => {
        renderBigPlayButton(playerRef.current);
      }, 500);
    }
  }, [playerRef, isReady]);

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
