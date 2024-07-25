function SecondAddBgWithText({ animation }) {
  return (
    <div
      className={` relative w-[19.5rem] h-80 bg-[url('/svgs/star.svg')]      bg-auto  bg-center  bg-no-repeat flex flex-col justify-center items-center`}
    >
      <img
        className={`  absolute z-20 w-[157px]  top-14   -mt-5  transition-all delay-[100ms] duration-300 ease-in-out   ${
          animation ? " mr-0  -mt-4" : " -mr-[62rem] -mt-[40rem]"
        }  `}
        src="/images/Play.png"
        alt="play"
      />

      <img
        className={`absolute z-10 w-[72px]  top-[117px]    transition-all delay-[100ms] duration-300 ease-in-out   ${
          animation ? " mr-0  -mt-[1.7rem]" : " -mr-[62rem] -mt-[40rem]"
        } `}
        src="/images/&.png"
        alt="&"
      />

      <img
        className={` h-[91px] relative z-0 top-[52px]  transition-all delay-150 duration-300 ease-in-out w-80  -mt-[1.5rem]  ${
          animation ? " ml-0 mb-0 " : " -ml-[63rem] -mb-[80rem]"
        }`}
        src="/images/Win Quiz.png"
        alt="play"
      />
    </div>
  );
}

export default SecondAddBgWithText;
