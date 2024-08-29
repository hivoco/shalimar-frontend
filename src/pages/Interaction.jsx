import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  const [language, setLanguage] = useState("");
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isVideoRendering, setIsVideoRendering] = useState(false);

  const [startClicked, setStartClicked] = useState(false);
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
  const [superText,setSuperText]=useState("")




  const superTextArray= superText.split(",")

  const displaySuperTextBullets = superTextArray.map((text, index) => {
    return index < 4 && <li className="capitalize font-Poppins text-2xl leading-[28.8px] text-left font-bold text-white" key={index}>{text}</li>;
  });
  
  

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

  // const [userText, setUserText]  = useState("start interactivedemos")
  // console.log(language);

  async function sendTextToBackend(text) {
    try {
      let response = await fetch(
        // "http://192.168.1.9:8502/api/interactivedemos/process",
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
          }),
        }
      );
      let data = await response.json();

      console.log("Response from backend:", data);
      playAudio(data?.audio);
      setCurrentSubtitle("");
      setSentence(data.answer);
      data?.video_link && displayVideo(data?.video_link)
      setSuperText(data?.key_word?data?.key_word:"")

    } catch (error) {
      console.error("Error:", error);
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
    setSuperText("")
  }

  if (hasRecognitionEnded) {
    setTimeout(() => {
      setIsUserSpeaking(false);
    }, 1* 1000);

    enter();
  }

  useEffect(() => {
    if (language) {
      handleClick();
    }
  }, [language]);


  return (
    <div
      className={`${
        isVideoRendering ? "h-screen flex items-center" : ""
      } w-full `}
    >
      {!language && (
        <PopUp bg={"transparent"}>
          <SelectLanguage language={language} setLanguage={setLanguage} />
        </PopUp>
      )}

      <audio ref={audioRef} onEnded={handleAudioEnd} className="hidden"></audio>

      <video
        className={`${
          isVideoRendering
            ? "h-full md:h-auto w-full opacity-100"
            : "opacity-0 hidden pointer-events-none"
        }  object-cover    inset-0 transition-opacity duration-[2000ms] ease-in-out opacity-100`}
        // onEnded={}
        ref={videoRef}
        loop
      >
        Your browser does not support the video tag.
      </video>

      {isVideoRendering && currentSubtitle.length > 0 && (
        <div className="subtitle w-full md:w-80">{currentSubtitle}</div>
      )}

      {/* major ui starts here  */}
      <div
        className={`w-full h-svh md:h-auto pt-10 pb-[4.375rem]   inset-0 transition-opacity duration-500 ease-in-out  ${
          isVideoRendering ? "opacity-0 pointer-events-none" : "opacity-100"
        } `}
      >
        <div
          className={`parent  w-full flex flex-col   ${
            isUserSpeaking ? "md:m-0 gap-8" : " md:mt-20 gap-y-12"
          }`}
        >
          <div className=" flex flex-col gap-14 px-9 md:w-full md:mt-8">
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

            {(!isUserSpeaking && !superText) && (
              <p className="text-white  font-Poppins text-sm font-semibold text-center md:w-full">
                Find answers to your questions <br /> with our Voice AI model...{" "}
              </p>
            )}


             {superText && superText.includes("Hello") ? (
              <h2 className="font-Poppins min-h-56  flex items-center  text-white text-[34.3px] leading-[41.15px] font-bold text-left">
                {superText}
              </h2>
            ) : (superText && 
              <ul className="min-h-56 font-Poppins flex flex-col gap-6 px-10 list-disc">
                {displaySuperTextBullets}
              </ul>
            )}
          </div>
          <div
            className={`flex flex-col ${
              isUserSpeaking ? "gap-y-4" : "gap-y-4"
            }`}
          >
            {isUserSpeaking ? (
              <div className="botIsListening flex flex-col gap-y-8">
                <h1 className="px-6 font-Poppins text-[19px] font-semibold leading-[22.8px] text-center text-white">
                  {message ||
                    " Hey, I'm Shalimar AI Let me know how I can help"}
                </h1>

                <div className="flex flex-col gap-5 w-full">
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
               !superText &&
                <div className="w-full flex flex-col gap-12 items-center">
                <img
                  onClick={() => !isUserSpeaking && handleAudioEnd()}
                  className="max-h-[100px]"
                  src="/gif/mic icon.gif"
                  alt="mic gif"
                />
                <p className="font-Poppins text-base leading-[22.4px] text-center text-white">
                  Tap on mic to interact
                </p>
              </div>
            )}

            <div className="flex flex-col gap-y-6">
              <img
                className="max-w-[294px] w-[87%] mx-auto"
                src="/images/paint-box-collage.png"
                alt=""
              />
              {<HivocoPowered />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interaction;
