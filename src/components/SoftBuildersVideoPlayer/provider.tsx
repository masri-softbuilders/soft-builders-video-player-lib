import React, { createContext, useContext, useState, ReactNode } from "react";
import Player from "video.js/dist/types/player";

interface SoftBuildersVideoPlayerContextType {
  player: Player | undefined;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;

  currentTime: number;
  setCurrentTime: (value: number) => void;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SoftBuildersVideoPlayerContext = createContext<
  SoftBuildersVideoPlayerContextType | undefined
>(undefined);

// Create a provider component
export const SoftBuildersVideoPlayerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <SoftBuildersVideoPlayerContext.Provider
      value={{
        player,
        setPlayer,
        currentTime,
        setCurrentTime: (value) => setCurrentTime(Math.floor(value)),
        isPaused,
        setIsPaused,
      }}
    >
      {children}
    </SoftBuildersVideoPlayerContext.Provider>
  );
};

// Custom hook to use the context
export const useSoftBuildersVideoPlayerContext = () => {
  const context = useContext(SoftBuildersVideoPlayerContext);
  if (!context) {
    throw new Error(
      "useSoftBuildersVideoPlayerContext must be used within an SoftBuildersVideoPlayerProvider"
    );
  }
  return context;
};
