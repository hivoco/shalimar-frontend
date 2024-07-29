import React from "react";
import Header from "../components/Header";
import { Navigate, useNavigate } from "react-router-dom";

function Location() {
  const navigate = useNavigate();
  return (
    <div className=" pt-10 w-full h-full">
      {/* <div className="bg-white px-[10px] py-[6px] text-[#E30713] rounded-full text-base font-semibold montserrat w-fit mt-9 mx-auto">
        00:30
      </div> */}
      <div className="px-6">
        <Header isarrow={false} isexit={false} />
      </div>
      <section className="mt-8 text-white p-6 ">
        <h6 className="montserrat text-xl font-semibold">
          Find your Nearest Dealer with HiVoco’s AI
        </h6>
        <div className="border-4  border-[#E6F3FF80] rounded-xl p-3 flex items-center mt-4 gap-[3px]">
          <input
            type="number"
            className="flex flex-1 bg-transparent placeholder:text-white outline-none montserrat text-base font-semibold"
            placeholder="Enter Pincode"
          />
          <img src="/svgs/mic.svg" alt="Mic" srcSet="" />
        </div>
        <small className="montserrat text-xs font-semibold">
          *Tap on mic to speak your full address.
        </small>

        <small className="montserrat text-xs font-semibold py-4 block text-center">
          or
        </small>

        <div className="border-4  border-[#E6F3FF80] rounded-xl p-3 flex flex-row-reverse items-center gap-[3px]">
          <input
            className="flex flex-1 bg-transparent placeholder:text-white outline-none montserrat text-base font-semibold"
            placeholder="Your Current Location"
          />
          <img src="/svgs/location.svg" alt="Mic" srcSet="" />
        </div>

        <div
          onClick={() => navigate("/get-your-nearest-dealers")}
          className="flex justify-center"
        >
          <button className="text-base font-semibold px-3 py-[13px] border-4  border-[#E6F3FF80] rounded-xl mx-auto min-w-min mt-20 text-center">
            Get Delear Details
          </button>
        </div>
      </section>
      <img
        className="w-full object-fit "
        src="/images/paint-box-collage.png"
        alt=""
      />
    </div>
  );
}

export default Location;
