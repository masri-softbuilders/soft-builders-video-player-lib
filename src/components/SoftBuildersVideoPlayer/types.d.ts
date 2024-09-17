export type SoftBuildersVideoPlayerSource = {
  src: string;
  type?: string;
  label: string;
};

export type SoftBuildersVideoPlayerOptions = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  muted: boolean;
  sources: SoftBuildersVideoPlayerSource[];
  tracks: {
    kind: string;
    src: string;
    srclang: string;
    label: string;
    default: boolean;
  }[];
  width: number;
  height: number;
  inactivityTimeout: any;
  // controlBar: any;
  // spatialNavigation: any;
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
