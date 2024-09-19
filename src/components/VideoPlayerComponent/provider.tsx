import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Player from "video.js/dist/types/player";

interface SoftBuildersVideoPlayerContextType {
  player: Player | undefined;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;

  currentTime: number;
  setCurrentTime: (value: number) => void;

  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;

  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;

  downloadedBufferPercentage: number;
  downloadedBufferTime: number;
  setDownloadedBufferTimeufferTime: React.Dispatch<
    React.SetStateAction<number>
  >;
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
  const [duration, setDuration] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [downloadedBufferTime, setDownloadedBufferTimeufferTime] = useState(0);
  const [downloadedBufferPercentage, setDownloadedBufferPercentage] =
    useState(0);

  useEffect(() => {
    setDownloadedBufferPercentage((downloadedBufferTime * 100) / duration);
  }, [downloadedBufferTime]);

  return (
    <SoftBuildersVideoPlayerContext.Provider
      value={{
        player,
        setPlayer,
        duration,
        setDuration,
        currentTime,
        setCurrentTime: (value) => setCurrentTime(Math.floor(value)),
        isPaused,
        setIsPaused,
        downloadedBufferTime,
        setDownloadedBufferTimeufferTime,
        downloadedBufferPercentage,
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
