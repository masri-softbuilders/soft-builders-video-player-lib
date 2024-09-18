"use client";
import React, { useEffect } from "react";
import { durationFormater } from "../../utils";
import { useSoftBuildersVideoPlayerContext } from "../SoftBuildersVideoPlayer/provider";
type Props = {};

const CurrentTimeLabel = ({}: Props) => {
  const { currentTime } = useSoftBuildersVideoPlayerContext();

  return <p>{durationFormater(currentTime)}</p>;
};

export default CurrentTimeLabel;
