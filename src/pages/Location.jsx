import { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { getFullAddress } from "../js/location";

function Location() {
  const [latAndLan,setLatAndLan]=useState('')
  const [currectaddress, setCurrectaddress] = useState("");

  const [response,setResponse]=useState(null)

  const [postcode,setPostcode]=useState(null)
  // const [currentAddress, setCurrentAddress] = useState("");

  // console.log(latAndLan);


  const [pinCode, setPinCode] = useState(null);
  const navigate = useNavigate();
  const getAddress = async () => {
    const info = await getFullAddress();
    setPostcode(info.postcode)

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
    navigate("/get-your-nearest-dealers", { state: { result,postcode,pinCode } });
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
    <div className="flex flex-col gap-y-4 pt-6 pb-2 px-6 w-full h-full">
      <div className="flex flex-1 flex-col gap-y-4">
        <Link to={"/"} className="block w-fit">
          <img
            className="h-14 object-contain"
            src="/images/logo-col.png"
            alt="logo"
          />
        </Link>

        <section className=" text-white">
          <div className="flex flex-1 flex-col gap-y-2">
            <div className="flex flex-1 flex-col gap-3">
              <h6 className="font-Poppins text-base leading-[20.8px] font-semibold">
                Find your Nearest Dealer with <br /> HiVoco’s AI
              </h6>

              <div
                className={`${
                  pinCode ? "bg-white text-[#1E1E1E]" : "bg-transparent"
                }  border-2 w-full max-h-12 border-[#F7F7F7]/50 rounded-[10.5px] py-3 px-[10.5px] flex items-center`}
              >
                <input
                  value={pinCode}
                  onChange={(e) =>
                    setPinCode(!isNaN(e.target.value) ? e.target.value : "")
                  }
                  maxLength={6}
                  inputMode="numeric"
                  className="w-full  bg-transparent placeholder:text-white outline-none font-Poppins text-sm leading-[19.5px] font-semibold appearance-none "
                  placeholder="Enter Pincode"
                />

                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    setPinCode(pinCode && "");
                  }}
                  className="h-5"
                  src={`${pinCode ? "/svgs/cross.svg" : " /svgs/mic.svg"}`}
                  alt="svg icon"
                  srcSet=""
                />
              </div>
            </div>

            <small className="font-Poppins text-[11px] leading-[15.4px] font-normal">
              *Tap on mic to speak your full address.
            </small>
          </div>

          <div className="flex flex-1 flex-col gap-y-5 md:gap-y-4">
            <small className="uppercase font-Poppins text-xs font-normal  block text-center pt-2">
              or
            </small>

            <div
              onClick={() => getAddress()}
              className={`${
                currectaddress ? "bg-white text-[#1E1E1E]" : "bg-transparent"
              }  border-2 w-full max-h-12 border-[#F7F7F7]/50 rounded-[10.5px] py-3 px-[10.5px] flex items-center`}
            >
              <input
                readOnly
                className=" overflow-x-scroll w-full  bg-transparent placeholder:text-white outline-none font-Poppins text-sm leading-[19.5px] font-semibold appearance-none "
                placeholder="Your Current Location"
                value={currectaddress}
              />

              <img
                onClick={(e) => {
                  currectaddress && e.stopPropagation();
                  setCurrectaddress(currectaddress && "");
                }}
                className="h-5"
                src={`${
                  currectaddress ? "/svgs/cross.svg" : " /svgs/location.svg"
                }`}
                alt="svg icon"
              />
            </div>
          </div>
        </section>

        <button
          onClick={handleClick}
          disabled={!(pinCode?.length === 6 || currectaddress) ? true : false}
          className="font-Poppins disabled:opacity-70    opacity-100  transition-opacity text-[#1E1E1E] text-[14.2px] font-medium leading-5  flex justify-center items-center  px-4 py-3 border-2 border-[#E6F3FF]/50  max- h-14 md:h-10 max-w-[182px] bg-white  rounded-[52px] mx-auto text-center"
        >
          Get Dealer Details
        </button>
      </div>

      <img
        className="mx-auto w-[300px] md:w-56 self-center"
        src="/images/paint-box-collage.png"
        alt="paint-box-collage"
      />
    </div>
  );
}

export default Location;
