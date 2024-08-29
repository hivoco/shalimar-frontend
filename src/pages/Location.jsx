import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getFullAddress } from "../js/location";

function Location() {
  const [latAndLan,setLatAndLan]=useState('')
  const [currectaddress, setCurrectaddress] = useState("");

  const [response,setResponse]=useState(null)
  // const [currentAddress, setCurrentAddress] = useState("");

  // console.log(latAndLan);


  const [pinCode, setPinCode] = useState(null);
  const navigate = useNavigate();
  const getAddress = async () => {
    const info = await getFullAddress();

    setLatAndLan({ latitude: info?.lat, longitude: info?.lon });
    // {"latitude" : 1122 , "longitude" : 1233}
    setCurrectaddress(info.address_line2);
  };


   const sendLocationToBackend = async (url, data) => {
    //  console.log(!isNaN(data)); // shows true on pincode

     console.log(JSON.stringify(data));

     try {
       const response = await fetch(url, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       });

       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }

       const result = await response.json();
       console.log("object>>", result)
       goToNearestDealersPage(result)

       console.log("Location sent successfully:", result);
     } catch (error) {
       console.error("Error :", error);
     }
   };

  const goToNearestDealersPage = (result) => {
  
    navigate("/get-your-nearest-dealers", { state: { result } });
  };

  const handleClick=()=>{
    if(pinCode){
      const pinCoordinate="https://shalimar.interactivedemos.io/api/location/pin_get_coordinate"
      // {"pincode" : 263641}
      sendLocationToBackend(pinCoordinate,{"pincode" : pinCode})
    }

    else if(currectaddress){
      const urlCoordinate='https://shalimar.interactivedemos.io/api/location/get_coordinate'
      sendLocationToBackend(urlCoordinate,latAndLan)
    }
  }

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
            value={pinCode}
            onChange={(e) =>
              setPinCode(!isNaN(e.target.value) ? e.target.value : "")
            }
            maxLength={6}
            inputMode="numeric"
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
          className={`border-4  border-[#E6F3FF80] rounded-xl  py-[10.5px] px-3 flex flex-row-reverse items-center gap-[10px] ${
            currectaddress ? "bg-white text-black" : "bg-transparent"
          }`}
        >
          {currectaddress && (
            <img
              onClick={(e) => {
                e.stopPropagation();
                setCurrectaddress("");
              }}
              className="h-8 "
              src="/svgs/cross.svg"
              alt="clear"
            />
          )}

          <input
            readOnly
            className={` overflow-x-scroll flex flex-1 bg-transparent placeholder:text-white outline-none montserrat text-base font-semibold ${currectaddress}`}
            placeholder="Your Current Location"
            value={currectaddress}
          />
          <img className="" src="/svgs/location.svg" alt="Mic" />
        </div>

        <div
          onClick={handleClick}
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
