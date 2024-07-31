import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getFullAddress } from "../js/location";

function Location() {
  const [currectaddress, setCurrectaddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const navigate = useNavigate();
  const getAddress = async () => {
    const info = await getFullAddress();
    setCurrectaddress(info.address_line2);
  };
  return (
    <div className=" pt-10 w-full h-full">
      <div className="px-6">
        <Header isarrow={false} isexit={false} />
      </div>

      <section className="mt-5 text-white p-6 ">
        <h6 className="montserrat text-xl font-semibold">
          Find your Nearest Dealer with HiVoco’s AI
        </h6>
        <div className="border-4  border-[#E6F3FF80] rounded-xl p-3 flex items-center mt-4 gap-[3px]">
          <input
            // type="number"
            maxLength={6}
            inputMode="tel"
            className=" flex flex-1 bg-transparent placeholder:text-white outline-none montserrat text-base font-semibold appearance-none"
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

        <div
          onClick={() => getAddress()}
          className={`border-4  border-[#E6F3FF80] rounded-xl  py-[10.5px] px-3 flex flex-row-reverse items-center gap-[3px] ${
            currectaddress ? "bg-white text-black" : "bg-transparent"
          }`}
        >
          <input
            readOnly
            onChange={() => {}}
            className={`flex flex-1 bg-transparent placeholder:text-white outline-none montserrat text-base font-semibold ${currectaddress}`}
            placeholder="Your Current Location"
            value={currectaddress}
          />
          <img src="/svgs/location.svg" alt="Mic" />
        </div>

        <div
          onClick={() => navigate("/get-your-nearest-dealers")}
          className="flex justify-center"
        >
          <button className="text-base font-semibold px-3 py-[13px] border-4  border-[#E6F3FF80] rounded-xl mx-auto min-w-min mt-20 text-center">
            Get Dealer Details
          </button>
        </div>
      </section>
      <img
        className=" object-contain mx-auto "
        src="/images/paint-box-collage.png"
        alt="paint-box-collage"
      />
    </div>
  );
}

export default Location;
