import { useNavigate } from "react-router-dom";

import { Audio } from "../audio/audio";
import "./splash.css";
import logo from "../../sounds/logo-animation.mp4";
import sound from "../../sounds/indian-music-with-sitar-tanpura-and-sarangi-74577.mp3";

const VideoBackground = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="video-background-container">
        <Audio sound={sound} play={true} />
        <video autoPlay loop muted className="background-video">
          <source src={logo} type="video/mp4" />
        </video>
        <button className="start-button" onClick={() => navigate("/register")}>
          Start Quiz
        </button>
      </div>
    </>
  );
};

export default VideoBackground;
