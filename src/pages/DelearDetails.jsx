import React from "react";
import Header from "../components/Header";
import DelearCard from "../components/DelearCard";

function DelearDetails() {
  return (
    <div className=" pt-10 w-full h-full">
      <div className="px-6">
        <Header isarrow={true} />
      </div>
      <section className=" text-white px-6 mt-4 mb-5 ">
        <div className="flex items-center border-b-[0.5px] border-[#FFFFFF80] pb-2">
          <img src="/svgs/location-pin.svg" alt="Location-Pin"  />
          <h6 className="montserrat text-base font-medium">203022</h6>
        </div>
      </section>
      <section className="px-6">
        <DelearCard />
        <DelearCard />
        <DelearCard />
        <DelearCard />
        <DelearCard />
        <DelearCard />
        <DelearCard />
        <DelearCard />
        <DelearCard />
      </section>
    </div>
  );
}

export default DelearDetails;
