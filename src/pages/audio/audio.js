import React from "react";
import ReactHowler from "react-howler";

export const Audio = ({ sound, play, loop = true, howRef }) => {
  return (
    <ReactHowler
      src={sound}
      playing={play}
      loop={loop}
      onLoadError={(id, error) => console.log("Error loading sound:", error)}
      onPlayError={(id, error) => console.log("Error playing sound:", error)}
    />
  );
};
