function AddBgWithText({ animation }) {
  return (
    <div
      className={`relative h-[19.0625rem]  bg-[url('/svgs/star.svg')] bg-auto bg-center bg-no-repeat flex flex-col justify-center items-center`}
    >
      <div
        className={`transition-all delay-150 duration-300 ease-in-out absolute flex flex-col justify-center items-center ${
          animation ? "-mt-80 -mr-[60rem]" : "-mt-24 -mr0"
        } `}
      >
        <img className="relative z-20 w-48 " src="/images/Play.png" alt="play" />
        <img className="relative z-10 w-20 -mt-8 -mb-7" src="/images/&.png" alt="play" />
      </div>

      <img
        className={` absolute z-0 transition-all delay-150 duration-300 ease-in-out w-80  mt-[8rem] ${
          animation ? "-ml-[1000px] -mb-80 " : "-ml-0 -mb-0 opacity-100"
        }`}
        src="images/Win Quiz.png"
        alt="play"
      />

    </div>
  );
}

export default AddBgWithText;
