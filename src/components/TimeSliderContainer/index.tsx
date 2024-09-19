import React from "react";
import NotesPanal from "../NotesPanal";
import ChaptersPanal from "../ChaptersPanal";
import TimeSlider from "../TimeSlider";
import {
  SoftBuildersVideoPlayerChapter,
  SoftBuildersVideoPlayerNote,
} from "../../types";

type Props = {
  notes: SoftBuildersVideoPlayerNote[];
  chapters: SoftBuildersVideoPlayerChapter[];
};
const TimeSliderContainer = ({ notes, chapters }: Props) => {
  return (
    <div
      id="time-slider-container"
      className="sb-w-full sb-relative sb-flex sb-items-center sb-justify-center"
    >
      <div
        id="notes-panal"
        className="sb-absolute sb-w-full sb-h-full sb-top-[27%] sb-left-0"
      >
        <NotesPanal notes={notes} />
      </div>

      <div className="sb-absolute sb-w-full sb-h-full sb-top-0 sb-left-0">
        <ChaptersPanal chapters={chapters} />
      </div>
      <TimeSlider chapters={chapters} />
    </div>
  );
};

export default TimeSliderContainer;
