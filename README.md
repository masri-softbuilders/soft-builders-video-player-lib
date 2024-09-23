# Usage

## install the package

```bash
    npm i soft-builders-video-player
```

## How to use

```typescript
import SoftBuildersVideoPlayer, {
  SoftBuildersVideoPlayerOptions,
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
} from "soft-builders-video-player";

const options: SoftBuildersVideoPlayerOptions = {
  autoplay: false,
  controls: true,
  muted: true,
  fluid: true,
  poster: "http://example.com/thumbnail.png", // thumbnail preview image
  height: 420,
  width: 720,
  sources: [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ab/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm.360p.vp9.webm",
      type: "video/webm",
      label: "360p",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ab/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm.1080p.vp9.webm",
      type: "video/webm",
      label: "1080P",
    },
  ],
  tracks: [
    {
      kind: "captions",
      src: "https://raw.githubusercontent.com/brenopolanski/html5-video-webvtt-example/master/MIB2-subtitles-pt-BR.vtt",
      srclang: "en",
      label: "English",
      memeType: "text/vtt", // text/vtt or text/srt
      default: true,
    },
    {
      kind: "captions",
      src: "https://gist.githubusercontent.com/samdutton/ca37f3adaf4e23679957b8083e061177/raw/e19399fbccbc069a2af4266e5120ae6bad62699a/sample.vtt",
      srclang: "es",
      label: "Espaniol",
      memeType: "text/vtt", // text/vtt or text/srt
    },
  ], // only vtt suptitilers are supported for now
};

const initNotes: SoftBuildersVideoPlayerNote[] = [
  {
    time: 5,
    label: "Start",
  },
  {
    time: 30,
    label: "Say Hello",
  },
  {
    time: 69,
    label: "Go deep",
  },
  {
    time: 99,
    label: "Details ...",
  },
  {
    time: 140,
    label: "End",
  },
];

const initChapters: SoftBuildersVideoPlayerChapter[] = [
  {
    startTime: 25,
    endTime: 50,
    title: "01 Note: **** Important ****",
  },
  {
    startTime: 70,
    endTime: 100,
    title: "02 Note: To Do",
  },
  { startTime: 110, endTime: 120, title: "03 Note: DIY (Do it yourself)" },
  {
    startTime: 125,
    endTime: 140,
    title: "05 Note: Conclusion ",
  },
];

const Component = () => {
  const handleSaveNoteAction = (time: number, note: string) => {
    return new Promise((resolve) => {
      resolve(true);
    });
  };

  const onPause = (time: number) => {
    console.log(`Video has been Paused at time (${time} sec)`);
  };
  const onPlay = (time: number) => {
    console.log(`Video has been Played at time (${time} sec)`);
  };

  return (
    <SoftBuildersVideoPlayer
      options={options}
      chapters={initChapters}
      notes={initNotes}
      handleSaveNoteAction={handleSaveNoteAction}
      onPause={onPause}
      onPlay={onPlay}
    />
  );
};

export default Component;
```
