import { Link } from "react-router-dom";

const Interrupt = ({
  isVideoRendering,
  setIsStopImgVisible,
  audioRef,
  isUserSpeaking,
  handleAudioEnd,
  isStopImgVisible,
  className
}) => {
  return (
    <div
      className={`interrupt flex flex-col items-center justify-center gap-8 ${className}`}
    >
      <img
        onClick={() => {
          setIsStopImgVisible(false);
          audioRef.current && audioRef.current.pause();
          setTimeout(() => {
            !isUserSpeaking && handleAudioEnd();
          }, 500);
        }}
        className={`${isVideoRendering ? "h-16" : "h-[84px]"} `}
        src={isStopImgVisible ? "/images/stop.png" : "/images/mic.png"}
        alt="mic image"
      />

      {!isVideoRendering && (
        <Link to={"/explore-your-experience"}>
          <img className="h-11" src="/svgs/close.svg" alt="close image" />
        </Link>
      )}
    </div>
  );
};

export default Interrupt;
