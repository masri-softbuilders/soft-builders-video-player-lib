# Usage

## install the package

```bash
    npm i soft-builders-video-player
```

## How to use

```typescript
import SoftBuildersVideoPlayer from "soft-builders-video-player";

const options = {
  autoplay: false,
  controls: true,
  responsive: true,
  muted: true,
  fluid: true,
  sources: [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ab/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm.1080p.vp9.webm",
      // type: "video/webm",
      label: "1080P",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ab/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm/Caminandes_3_-_Llamigos_-_Blender_Animated_Short.webm.360p.vp9.webm",
      // type: "video/webm",
      label: "360p",
    },
  ],
  tracks: [
    {
      kind: "captions",
      src: "https://raw.githubusercontent.com/brenopolanski/html5-video-webvtt-example/master/MIB2-subtitles-pt-BR.vtt",
      srclang: "en",
      label: "English",
      default: true,
    },
  ],
  width: 800,
  height: 400,
  inactivityTimeout: 0,
};

const chapters = [
  {
    startTime: 28,
    endTime: 30,
    title: "01 Note: **** Important ****",
  },
  {
    startTime: 46,
    endTime: 48,
    title: "02 Note: To Do",
  },
  {
    startTime: 56,
    endTime: 59,
    title: "03 Note: DIY (Do it yourself)",
  },
  {
    startTime: 70,
    endTime: 140,
    title: "04 Note: Make save notes",
  },
  {
    startTime: 148,
    endTime: 150,
    title: "05 Note: Conclusion ",
  },
];

const notes = [
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

const Component = () => {
  const handleSaveNoteAction = (time: number, note: string) => {
    return new Promise((resolve) => {
      resolve(true);
    });
  };

  return (
    <SoftBuildersVideoPlayer
      options={options}
      chapters={chapters}
      notes={notes}
      handleSaveNoteAction={handleSaveNoteAction}
    />
  );
};

export default Component;
```
