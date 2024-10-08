export type SoftBuildersVideoPlayerSource = {
  src: string;
  type?: string;
  label: string;
};

export type SoftBuildersVideoPlayerTrack = {
  kind: "captions";
  src: string;
  srclang: string;
  label: string;
  memeType: "text/vtt" | "text/srt";
  default?: boolean;
};

export type SoftBuildersVideoPlayerOptions = {
  autoplay?: boolean;
  controls?: boolean;
  fluid?: boolean;
  muted?: boolean;
  poster?: string;
  sources: SoftBuildersVideoPlayerSource[];
  tracks: SoftBuildersVideoPlayerTrack[];
  width?: number;
  height?: number;
};

export interface SoftBuildersVideoPlayerNote {
  time: number;
  label: string;
}

export interface SoftBuildersVideoPlayerChapter {
  startTime: number;
  endTime: number;
  title: string;
}
