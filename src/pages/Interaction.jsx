function Interaction() {
  console.log(265 / 16);
  return (
    <div className="w-full pt-20">
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-1 px-9 ">
          <div className="w-full flex gap-[1.5px] items-center justify-center">
            <img
              className="max-h-[5.63rem] object-contain"
              src="/svgs/logo.svg"
              alt="logo"
            />

            <img
              className="max-h-[4.5rem] object-contain"
              src="/images/logo-text.png"
              alt="logo-text"
            />
          </div>

          <p className="text-white  font-Montserrat text-sm font-semibold text-center">
            Find answers to your questions with our Voice AI model...
          </p>
        </div>
        <img
          className="w-full h-[16.55rem]"
          src="/images/shalimar-paints.png"
          alt=""
        />
      </div>


     



      <div className="w-24 h-24 rounded-full  border-[5px]  border-[]  border-gradient-to-b from-[#FF0000] to-[#710000]   ">

      </div>
    </div>
  );
}

export default Interaction;
