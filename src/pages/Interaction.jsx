function Interaction() {
  return (
    <div className="">
      <div className="flex  px-9 ">
        <div className="w-full flex gap-[1.5px] items-center justify-center">
          <img  
            className="max-h-[5.63rem] object-contain"
            src="/svgs/logo.svg"
            alt="logo"
          />

          <img
            className="max-h-[4.5rem] object-contain"
            src="/public/images/logo-text.png"
            alt="logo-text"
          />
        </div>


        <p className="text-white  font-Montserrat text-sm font-semibold text-center">
          Find answers to your questions with our Voice AI model...
        </p>
      </div>
    </div>
  );
}

export default Interaction;
