import React from "react";
import {
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
} from "../SoftBuildersVideoPlayer/types";
import NotesPanal from "../NotesPanal";
import ChaptersPanal from "../ChaptersPanal";
import TimeSlider from "../TimeSlider";

type Props = {
  notes: SoftBuildersVideoPlayerNote[];
  chapters: SoftBuildersVideoPlayerChapter[];
};
const TimeSliderContainer = ({ notes, chapters }: Props) => {
  return (
    <div
      id="time-slider-container"
      className="w-full relative flex items-center justify-center"
    >
      <div id="notes-panal" className="absolute w-full h-full top-[30%] left-0">
        <NotesPanal notes={notes} />
      </div>

      <div className="absolute w-full h-full top-0 left-0">
        <ChaptersPanal chapters={chapters} />
      </div>
      <TimeSlider chapters={chapters} />
    </div>
  );
};

export default TimeSliderContainer;
