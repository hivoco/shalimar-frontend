import { useEffect, useRef, useState } from "react";

const SmoothTextReveal = ({ text = "hello, how are you" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);



  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayedText]);


  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 60); // Adjust the delay (in milliseconds) between each character

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <p
      className={`scrollbar-hide font-Poppins  overflow-y-scroll h-56  mx-auto flex items-center  text-white text-2xl leading-[28.8px] font-semibold text-left`}
    >
      {displayedText}
      <span ref={endRef} />
    </p>
  );
};

export default SmoothTextReveal;
