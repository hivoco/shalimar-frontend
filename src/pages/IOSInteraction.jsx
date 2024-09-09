import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import HivocoPowered from "../components/HivocoPowered";
import { useLocation, useNavigate } from "react-router-dom";

import SelectLanguage from "../components/SelectLanguage";
import SmoothTextReveal from "../components/TextReveal";
import Survey from "./Survey";
import useVoiceRecorder from "../hooks/useVoiceRecorder";
import blobToBase64 from "../js/blobToBase.js";
import debounce from "../js/debounce.js";

function IOSInteraction({ platform }) {
  const {
    startRecordingButtonRef,
    stopRecordingButtonRef,
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
    InVisible,
  } = useVoiceRecorder();
  const navigate = useNavigate();
  const [speechText, setSpeechText] = useState(
    "don't introduce yourself , from the previous information, user selected certain options , keeping in mind those initiate a conversation without rephrasing the data"
  );
  const [language, setLanguage] = useState("");
  const [questionId, setQuestionId] = useState(1);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isVideoRendering, setIsVideoRendering] = useState(false);
  const [isStopImgVisible, setIsStopImgVisible] = useState(true);
  const [startClicked, setStartClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizData, setQuizData] = useState([]);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [uuId, setUuId] = useState(null);

  useEffect(() => {
    const uniqueId = sessionStorage.getItem("uuId");
    uniqueId && setUuId(uniqueId);
  }, []);

  const messages = [
    "Hey, I’m Shalimar AI. Let me know how I can help.",
    "Hope I was able to assist you. How can I help you further?",
    "Yeah, you are doing good! You can ask me anything.",
    "Go ahead with your questions, I'm all tuned in.",
    "I'm here to help, just let me know what you need!",
    "Feel free to ask me anything. I'm ready to assist!",
    "Got more questions? I'm here to answer them!",
    "Don't hesitate to reach out with any queries. I'm all ears!",
    "What else can I do for you? Your questions are welcome!",
    "I'm ready for your next question. Let's keep going!",
  ];

  const [message, setMessage] = useState(messages[0]);
  const [msgIndex, setMsgIndex] = useState(0);
  const [superText, setSuperText] = useState("");
  const [convoNumber, setConvoNumber] = useState(0);

  // const displaySuperTextBullets =
  //   convoNumber === 0 || convoNumber === 1
  //     ? []
  //     : superTextArray.map((text, index) => {
  //         // fot this conditon return nothing in the array
  //         return (
  //           index < 4 && (
  //             <li
  //               className="first-letter:uppercase font-Poppins text-2xl leading-[28.8px] text-left font-bold text-white"
  //               key={index}
  //             >
  //               {text}
  //             </li>
  //           )
  //         );
  //       });

  useEffect(() => {
    if (isUserSpeaking) {
      setMessage(messages[msgIndex]);
      setMsgIndex(msgIndex + 1);
    }
  }, [isUserSpeaking]);

  const [sentence, setSentence] = useState("");
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  useEffect(() => {
    if (!audioRef?.current || !sentence) return;

    const words = sentence.split(" ");
    let wordIndex = 0;
    let timeoutId;

    const displayWord = () => {
      setCurrentSubtitle(() => {
        const updatedSubtitle = words.slice(wordIndex, wordIndex + 5).join(" ");
        wordIndex += 5;
        return updatedSubtitle;
      });

      // wordIndex += 8;
      if (wordIndex < words.length) {
        timeoutId = setTimeout(displayWord, 2000); // Adjust timing as needed
      }
    };

    displayWord();

    return () => clearTimeout(timeoutId); // Cleanup function to clear timeout
  }, [sentence]);

  const handleRecordingComplete = async () => {
    stopRecording();
    if (recordingBlob && !isRecording) {
      blobToBase64(recordingBlob)
        .then((res) => {
          sendTextToBackend(res);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    stopRecording();
    handleRecordingComplete();
  }, [recordingBlob]);

  const handleClick = () => {
    // setStartClicked(true);
    // enter();
  };

  const sendTextToBackend = debounce(async (text) => {
    try {
      let response = await fetch(
        // "http://192.168.1.9:8701/api/interactivedemos/process",
        "https://shalimar.interactivedemos.io/api/interactivedemos/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: text,
            language: language.toLocaleLowerCase(),
            session_id: uuId,
            quiz: quizData,
            platform,
          }),
        }
      );
      let data = await response.json();
      playAudio(data?.audio);
      setCurrentSubtitle("");
      setSentence(data.answer);
      data?.video_link && displayVideo(data?.video_link);
      setSuperText(data.answer);
      // setSuperText(data?.key_word?data?.key_word:"")
      setConvoNumber(data?.audio ? convoNumber + 1 : convoNumber);
    } catch (error) {
      console.error("Error:", error);
    }
  }, 200);

  const playAudio = (audioBase64) => {
    const audioSrc = `data:audio/mp3;base64,${audioBase64}`;
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
      // audioRef.current.playbackRate=2;
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

  const triggerVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200); // Vibrate for 200ms
    }
  };

  const preventDefault = (e) => {
    e.preventDefault(); // Prevent the default context menu on long press
  };

  useEffect(() => {
    if (questionId === 7) {
      sendTextToBackend(speechText);
    }
  }, [questionId]);

  if (!language) {
    return <SelectLanguage language={language} setLanguage={setLanguage} />;
  }

  if (language && questionId <= 6) {
    return (
      <Survey
        quizData={quizData}
        setQuizData={setQuizData}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        questionId={questionId}
        setQuestionId={setQuestionId}
        language={language}
      />
    );
  }

  return (
    <div
      className={`${
        isVideoRendering ? "h-screen flex items-center" : ""
      } w-full `}
    >
      {/* {!language && (
        <PopUp bg={"transparent"}>
          <SelectLanguage language={language} setLanguage={setLanguage} />
        </PopUp>
      )} */}

      <audio
        ref={audioRef}
        onEnded={() => {
          setSuperText("");
          setIsVideoRendering(false);
          setIsUserSpeaking(false);

          setSuperText("");
        }}
        className="hidden"
      ></audio>

      <video
        className={`${
          isVideoRendering
            ? "h-full md:h-auto w-full opacity-100"
            : "opacity-0 hidden pointer-events-none"
        }  object-cover    inset-0 transition-opacity duration-[2000ms] ease-in-out opacity-100`}
        // onEnded={}
        loop
        muted
        playsInline
        autoPlay
        ref={videoRef}
      >
        Your browser does not support the video tag.
      </video>

      {isVideoRendering && currentSubtitle.length > 0 && (
        <div className="subtitle w-full md:w-80">{currentSubtitle}</div>
      )}

      {/* major ui starts here  */}
      <div
        className={`w-full h-svh md:h-auto pt-5 pb-[4.375rem]   inset-0 transition-opacity duration-500 ${
          isVideoRendering ? "opacity-0 pointer-events-none" : "opacity-100"
        } `}
      >
        <div
          className={`  w-full flex flex-col   ${
            isUserSpeaking ? "md:m-0 gap-20" : " md:mt-3 gap-y-12"
          }`}
        >
          <div className=" flex flex-col gap-10 px-9 md:w-full md:mt-8">
            <div className="flex items-center justify-center ">
              <img
                className="h-auto  max-h-[5.63rem] md:max-h-16 w-auto object-contain"
                src="/svgs/logo.svg"
                alt="logo"
              />

              <img
                className="h-auto w-auto  max-h-[4.5rem] md:max-h-14 object-contain"
                src="/images/logo-text.png"
                alt="logo-text"
              />
            </div>

            {!isUserSpeaking && !superText && (
              <p className="text-white  font-Poppins text-base font-semibold text-center md:w-full">
                Find answers to your questions <br /> with our Voice AI model...{" "}
              </p>
            )}

            {superText && !isVideoRendering && (
              <SmoothTextReveal text={superText} />
            )}

            {/* {superText && convoNumber === 1 ? (
              <h2 className="font-Poppins min-h-56  mx-auto flex items-center  text-white text-2xl leading-[28.8px] font-semibold text-left">
                {superText}
              </h2>
            ) : (
              superText && (
                <ul className="min-h-56 font-Poppins flex flex-col gap-6 px-10 list-disc">
                  {displaySuperTextBullets}
                </ul>
              )
            )} */}

            {/* {!isUserSpeaking && superText && convoNumber !== 1 && ( */}
            {!isUserSpeaking && !isVideoRendering && superText && (
              <div className="flex flex-col items-center justify-center gap-8">
                {/* <img  className="w-16 h-16" src= alt="stop image" /> */}

                <img
                  onClick={() => {
                    setIsStopImgVisible(false);
                    audioRef.current && audioRef.current.pause();
                    setTimeout(() => {
                      setIsUserSpeaking(false);
                      setSuperText("");
                    }, 500);
                  }}
                  className="h-[84px]"
                  src={
                    isStopImgVisible ? "/images/stop.png" : "/images/mic.png"
                  }
                  alt="mic image"
                />

                <img
                  onClick={() => navigate("/explore-your-experience")}
                  className="h-11"
                  src="/svgs/close.svg"
                  alt="close image"
                />
              </div>
            )}
          </div>
          <div
            className={`flex flex-col ${
              isUserSpeaking ? "gap-y-28" : "gap-y-4"
            }`}
          >
            {isUserSpeaking ? (
              <div className="botIsListening flex flex-col gap-y-8">
                <h1 className="px-6 font-Poppins text-[19px] font-semibold leading-[22.8px] text-center text-white">
                  {message ||
                    " Hey, I'm Shalimar AI Let me know how I can help"}
                </h1>

                <div className="flex flex-col gap-8 w-full">
                  <div className="w-full mx-auto   h-36 flex  items-center  ">
                    <img
                      className="w-full "
                      src="/gif/waves.gif"
                      alt="bot listening wave"
                    />
                  </div>

                  <h2 className="font-Poppins text-[19px] font-semibold leading-[26.6px] text-center text-white">
                    I'm listening ...
                  </h2>
                </div>
              </div>
            ) : (
              !superText && (
                <div className="w-full flex flex-col gap-y-12 items-center">
                  {/* <div class="w-80 h-80 bg-gradient-to-r from-yellow-400 via-red-400 to-purple-600 g rounded-full animate-spin"></div> */}

                  <div
                    className={`w-36 h-36 rotating-gradient  rounded-full flex justify-center items-center shadow-lg delay-100 duration-100 transition-all ease-in-out ${
                      isRecording &&
                      "scale-125 delay-100 duration-100 transition-all ease-in-out"
                    }`}
                  >
                    <i
                      onTouchStart={(e) => {
                        preventDefault(e);
                        triggerVibration();

                        startRecording();
                      }}
                      onTouchEnd={(e) => {
                        preventDefault(e);
                        handleRecordingComplete();
                      }}
                      onContextMenu={preventDefault}
                      className="max-h-[7.5rem] select-none touch-none bg-none bg-transparent fa fa-microphone"
                      // class="fa fa-microphone"
                      style={{ fontSize: "48px", color: "white" }}
                    ></i>
                    {/* <img
                      onTouchStart={(e) => {
                        preventDefault(e);
                        triggerVibration();

                        startRecording();
                      }}
                      onTouchEnd={(e) => {
                        preventDefault(e);
                        handleRecordingComplete();
                      }}
                      onContextMenu={preventDefault}
                      className="max-h-[7.5rem] select-none touch-none bg-none bg-transparent"
                      src="/svgs/mic-i.svg"
                      alt="mic gif"
                    /> */}
                  </div>

                  {/* <img
                    onTouchStart={(e) => {
                      preventDefault(e);
                      triggerVibration();

                      startRecording();
                    }}
                    onTouchEnd={(e) => {
                      preventDefault(e);
                      handleRecordingComplete();
                    }}
                    onContextMenu={preventDefault}
                    className="max-h-[7.5rem] select-none touch-none"
                    src="/gif/mic icon.gif"
                    alt="mic gif"
                  /> */}
                  <p className="font-Poppins text-base leading-[22.4px] text-center text-white">
                    Press and hold the mic to interact.
                  </p>
                </div>
              )
            )}

            <div className="flex flex-col gap-y-6">
              {!isUserSpeaking && (
                <img
                  className={`
                    ${
                      !isUserSpeaking && !isVideoRendering && superText
                        ? "hidden"
                        : ""
                    }
                   max-w-[294px] w-[87%] mx-auto`}
                  src="/images/paint-box-collage.png"
                  alt=""
                />
              )}

              {<HivocoPowered />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IOSInteraction;
