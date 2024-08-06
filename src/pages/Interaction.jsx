import { useRef, useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import HivocoPowered from "../components/HivocoPowered";
import { useLocation } from "react-router-dom";
import PopUp from "../components/PopUp";
import SelectLanguage from "../components/SelectLanguage";

function Interaction() {
  const {
    startSpeechRecognition,
    stopSpeechRecognition,
    setRecognitionState,
    speechText,
    hasRecognitionEnded,
    setHasRecognitionEnded,
    setSpeechText,
  } = useSpeechRecognition();

  const [language, setLanguage] = useState('');
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isVideoRendering, setIsVideoRendering] = useState(false);

  const [startClicked, setStartClicked] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const location = useLocation();
  const uuId = location.state;
  
  // const [userText, setUserText]  = useState("start interactivedemos")

  console.log(language);
  

  async function sendTextToBackend(text) {
    try {
      let response = await fetch(
        "http://192.168.1.22:8502/api/interactivedemos/process",
        // "https://shalimar.interactivedemos.io/api/interactivedemos/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: text,
            language:language,
            session_id: uuId,
          }),
        }
      );
      let data = await response.json();

      console.log("Response from backend:", data);
      playAudio(data?.audio);
      displayVideo(data?.video_link);
    } catch (error) {
      console.error("Error sending text to backend:", error);
    }
  }

  
  const playAudio = (audioBase64) => {
    const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  };

  const displayVideo = (videoSrc) => {
    setIsVideoRendering(true);
    console.log(videoSrc);
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
      videoRef.current.play();
    }
  };

  const enter = async () => {
    let value = speechText.trim();
    console.log("value", value);

    // setMicOnTime(micOnTime + 1);

    // stopSpeechRecognition();

    if (value) {
      console.log("send text to backend");
      sendTextToBackend(value);
    }
    setHasRecognitionEnded(false);
    setSpeechText("");
  };

  const handleClick = () => {
    setStartClicked(true);
    enter();
  };

  function handleAudioEnd() {
    startSpeechRecognition();
    setIsVideoRendering(false);
    setIsUserSpeaking(true);
  }

  if (hasRecognitionEnded) {
    setIsUserSpeaking(false);
    enter();
  }

  // console.log(hasRecognitionEnded);

  return (
    <div
      className={`${
        isVideoRendering ? "h-screen flex items-center" : ""
      } w-full relative`}
    >
      {!language && (
        <PopUp bg={"transparent"}>
          <SelectLanguage setLanguage={setLanguage} />
        </PopUp>
      )}

      <audio ref={audioRef} onEnded={handleAudioEnd} className="hidden"></audio>

      <video
        className={`${
          isVideoRendering ? "h-full md:h-auto w-full" : "hidden"
        } animate-fadeIn object-cover  `}
        // onEnded={}
        ref={videoRef}
        loop
      >
        Your browser does not support the video tag.
      </video>

      {!isVideoRendering && (
        <div
          className={`w-full pt-20 pb-[4.375rem] z-40 ${
            !isUserSpeaking ? "" : ""
          } `}
        >
          <div
            className={`w-full flex flex-col gap-3  ${
              isUserSpeaking ? "md:m-0" : "md:mt-20"
            }`}
          >
            <div className=" flex flex-col gap-1 px-9 md:w-full">
              <div className="w-full flex gap-[1.5px] items-center justify-center ">
                <img
                  className="h-auto  max-h-[5.63rem] w-auto object-contain"
                  src="/svgs/logo.svg"
                  alt="logo"
                />

                <img
                  className="h-auto w-auto  max-h-[4.5rem] object-contain"
                  src="/images/logo-text.png"
                  alt="logo-text"
                />
              </div>

              <p className="text-white  font-Montserrat text-sm font-semibold text-center md:w-full">
                Find answers to your questions with our Voice AI model...
              </p>
            </div>

            <div className="flex flex-col">
              {/* no gap  since the mic img it seen somehwere else , and on dom present somehwere else so  */}

              {isUserSpeaking ? (
                <div className="flex flex-col items-center justify-center my-[4.57rem] md:m-0 md:mb-2">
                  <img src="/svgs/listening.svg" alt="listening" />
                  {/* <img src="/public/gif/listening-gif.gif" alt="listening" /> */}
                  <p className="text-white text-lg font-semibold leading-[25px] text-center">
                    Listening...
                  </p>
                </div>
              ) : (
                !isVideoRendering && (
                  <div className="w-full ">
                    <img
                      className="w-full h-[16.55rem] md:h-auto md:aspect-[1.36]"
                      src="/images/shalimar-paints.png"
                      alt=""
                    />

                    <img
                      className="w-[100px] mx-auto -translate-y-1/2"
                      src="/svgs/rounded-mic.svg"
                      alt="rounded-mic image"
                    />
                  </div>
                )
              )}

              <div className="flex flex-col gap-[3.18rem]">
                <div
                  className={`${
                    isUserSpeaking ? "opacity-70" : ""
                  } relative w-[82vw]  md:w-auto mx-auto flex justify-center items-center `}
                >
                  {/* <audio
         ref={audioRef}
         onEnded={handleAudioEnd}
         // onEnded={startSpeechRecognition}
         className="hidden"
       ></audio> */}

                  {!startClicked ? (
                    <button
                      onClick={handleClick}
                      className={`py-3 px-[18px] rounded-[52px] border-[2px] border-[#FFD076] bg-white font-Montserrat text-xs font-semibold text-center text-[#1E1E1E] placeholder:text-[#1E1E1E] outline-none`}
                    >
                      Start
                    </button>
                  ) : (
                    <>
                      <input
                        className={` w-full py-4 px-12  rounded-xl border-[4px] border-[#FFD076] bg-white font-Montserrat text-xs font-semibold text-center text-[#1E1E1E] placeholder:text-[#1E1E1E] outline-none `}
                        placeholder="Speak or Type to interact..."
                        type="text"
                      />

                      {/* <svg
                        className="absolute top-1/2  -translate-y-1/2 left-3"
                        width="2"
                        height="23"
                        viewBox="0 0 2 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 22.3933L0 0.393311L2 0.393311L2 22.3933H0Z"
                          fill="#1E1E1E"
                        />
                      </svg> */}

                      <svg
                        className="absolute top-1/2  -translate-y-1/2 right-4"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.6034 8.49243L1.55922 0.470331C1.43347 0.407443 1.29222 0.382245 1.15248 0.397771C1.01274 0.413298 0.880473 0.468887 0.771595 0.557845C0.667617 0.644989 0.590009 0.759409 0.547494 0.888242C0.504979 1.01707 0.499243 1.15521 0.530932 1.28713L2.46353 8.41221H10.7117V9.87078H2.46353L0.501761 16.974C0.472026 17.0841 0.468555 17.1997 0.491627 17.3115C0.5147 17.4232 0.563672 17.528 0.634606 17.6174C0.70554 17.7068 0.796457 17.7783 0.900046 17.8261C1.00364 17.8739 1.11701 17.8968 1.23104 17.8929C1.34521 17.8922 1.45761 17.8647 1.55922 17.8127L17.6034 9.79056C17.7229 9.72935 17.8231 9.63638 17.8931 9.52185C17.9631 9.40733 18.0002 9.27572 18.0002 9.14149C18.0002 9.00727 17.9631 8.87565 17.8931 8.76113C17.8231 8.64661 17.7229 8.55363 17.6034 8.49243Z"
                          fill="#E20712"
                        />
                      </svg>
                    </>
                  )}
                </div>
                {<HivocoPowered />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Interaction;
