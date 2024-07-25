import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import backgroundMusic from "/sounds/global.wav";

const BackgroundMusic = ({ isMusicAllowed, setIsMusicAllowed }) => {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);

  // Check if the current route is the one where you don't want background music

  useEffect(() => {
    setIsMusicAllowed(location.pathname !== "/quiz/play");
  }, [location.pathname]);

  return (
    <div>
      {isMusicAllowed && (
        <ReactAudioPlayer
          src={backgroundMusic}
          autoPlay={isPlaying}
          controls={false}
          loop
          volume={0.1} // Adjust volume as needed
          onEnded={() => setIsPlaying(true)} // Restart the music when it ends
        />
      )}
    </div>
  );
};

export default BackgroundMusic;
