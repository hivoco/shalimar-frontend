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

  const [language, setLanguage] = useState('');
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isVideoRendering, setIsVideoRendering] = useState(false);


  const [startClicked, setStartClicked] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);


  const [uuId, setUuId] = useState(null);
  useEffect(() => {
    const uniqueId = sessionStorage.getItem("uuId");
    console.log('interaction effect',uniqueId);
    uniqueId && setUuId(uniqueId);
  }, []);

  console.log('interaction',uuId);
  
  const messages = [
    "Hey, I'm Shalimar AI",
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
  
  const [message,setMessage] =useState(messages[0])
  const [msgIndex,setMsgIndex]=useState(0)


  useEffect(()=>{
    if(isUserSpeaking){
      setMessage(messages[msgIndex]);
      setMsgIndex(msgIndex + 1);
    }
  },[isUserSpeaking])

  const [sentence, setSentence] = useState("");
  const [currentSubtitle, setCurrentSubtitle] = useState("");


  useEffect(() => {
    if (!audioRef?.current || !sentence) return;

    const words = sentence.split(" ");
    let wordIndex = 0;
    let timeoutId;

    const displayWord = () => {
      setCurrentSubtitle(() => {
        const updatedSubtitle = words.slice(wordIndex, wordIndex + 5).join(' ');
        wordIndex += 5;
        return updatedSubtitle;
      });

      // wordIndex += 8;
      if (wordIndex < words.length) {
        timeoutId = setTimeout(displayWord,2000); // Adjust timing as needed
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
            language:language.toLocaleLowerCase(),
            session_id: uuId,
          }),
        }
      );
      let data = await response.json();

      console.log("Response from backend:", data);
      playAudio(data?.audio);
      setCurrentSubtitle('')
      displayVideo(data?.video_link);
      setSentence(data.answer);
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
    setTimeout(() => {
      setIsUserSpeaking(false);
    }, 3 * 1000);

    enter();
  }


  useEffect(() => {
    if (language) {
      handleClick();
    }
  }, [language]);

  // console.log(hasRecognitionEnded);

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

      {/* {!isVideoRendering && ( */}
      <div
        className={`w-full pt-20 pb-[4.375rem]   inset-0 transition-opacity duration-500 ease-in-out  ${
          isVideoRendering ? "opacity-0 pointer-events-none" : "opacity-100"
        } `}
      >
        <div
          className={`w-full flex flex-col   ${
            isUserSpeaking ? "md:m-0 gap-12" : "md:mt-20 gap-3"
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

            {!isUserSpeaking && (
              <p className="text-white  font-Montserrat text-sm font-semibold text-center md:w-full">
                Find answers to your questions with <br /> our Voice AI model...
              </p>
            )}
          </div>

          <div
            className={`flex flex-col ${isUserSpeaking ? "gap-y-12" : "gap-0"}`}
          >
            {/* no gap  since the mic img it seen somehwere else , and on dom present somehwere else so  */}

            {/* {isUserSpeaking ? (
                <div className="flex flex-col items-center justify-center my-[4.57rem] md:m-0 md:mb-2">

                  <img src="/svgs/listening-red.svg" alt="listening" />  image

                  <img className="h-48" src="/gif/listening-gif.gif" alt="listening" /> gif
                  <p className="text-white text-lg font-semibold leading-[25px] text-center">
                    Listening...
                  </p>
                </div>
              ) : ( */}

            {/* {!isVideoRendering && ( */}

            {/* // this should be conditional */}

            {isUserSpeaking ? (
              <div className="botIsListening flex flex-col gap-y-8">
                <h1 className="px-6 font-Montserrat text-[19px] font-semibold leading-[22.8px] text-center text-white">
                  {message ||" Hey, I'm Shalimar AI Let me know how I can help" }
                </h1>

                <div className="flex flex-col gap-5">
                  <div className="w-[108%] max-w-96  h-44 flex  items-center  ">
                    <img
                      className="w-full"
                      src="/gif/waves.gif"
                      alt="bot listening wave"
                    />
                  </div>

                  <h2 className="font-Montserrat text-[19px] font-semibold leading-[26.6px] text-center text-white">
                    I'm listening ...
                  </h2>
                </div>
              </div>
            ) : (
              <div className="w-full ">
                <img
                  className="w-full h-[16.55rem] md:h-auto md:aspect-[1.36]"
                  src="/images/shalimar-paints.png"
                  alt=""
                />

                <img
                  className={`  w-[100px] mx-auto -translate-y-1/2`}
                  src={"/svgs/rounded-mic.svg"}
                  alt={"rounded-mic image"}
                />
              </div>
            )}

            {/* )} */}

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

                {
                  // !startClicked ? (
                  //   <button
                  //     onClick={handleClick}
                  //     className={` inset-0 transition-opacity duration-1000 ease-in-out   py-3 px-8 rounded-[52px] border-[2px] border-[#E6F3FF80] bg-white font-Montserrat text-xs font-semibold text-center text-[#1E1E1E] placeholder:text-[#1E1E1E] outline-none`}
                  //   >
                  //     Start
                  //   </button>
                  // ) : (
                  // !isUserSpeaking && (
                  <>
                    <input
                      className={`inset-0 transition-opacity duration-1000 ease-in-out w-full py-4 px-12  rounded-xl border-[4px] border-[#FFD076] bg-white font-Montserrat text-xs font-semibold text-center text-[#1E1E1E] placeholder:text-[#1E1E1E] outline-none `}
                      placeholder="Speak or Type to interact..."
                      type="text"
                    />

                    <img
                      className="absolute top-1/2  -translate-y-1/2 right-4"
                      src="/svgs/aeroplane.svg"
                      alt=""
                    />
                  </>
                  // )
                  // )
                }
              </div>
              {<HivocoPowered />}
            </div>
          </div>
        </div>
      </div>
      {/* )}  */}
    </div>
  );
}

export default Interaction;
