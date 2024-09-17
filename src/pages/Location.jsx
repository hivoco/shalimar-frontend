import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getFullAddress } from "../js/location";

function Location() {
  const [latAndLan, setLatAndLan] = useState("");
  const [currectaddress, setCurrectaddress] = useState("");

  const [response, setResponse] = useState(null);

  const [postcode, setPostcode] = useState(null);
  // const [currentAddress, setCurrentAddress] = useState("");

  // console.log(latAndLan);

  const [pinCode, setPinCode] = useState(null);
  const navigate = useNavigate();
  const getAddress = async () => {
    const info = await getFullAddress();
    setPostcode(info.postcode);

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
      console.log("object>>", result);
      goToNearestDealersPage(result);

      console.log("Location sent successfully:", result);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const goToNearestDealersPage = (result) => {
    navigate("/get-your-nearest-dealers", {
      state: { result, postcode, pinCode },
    });
  };

  const handleClick = () => {
    if (pinCode) {
      const pinCoordinate =
        "https://hongs-hindi.interactivedemos.io/api/location/pin_get_coordinate";
      // {"pincode" : 263641}
      sendLocationToBackend(pinCoordinate, { pincode: pinCode });
    } else if (currectaddress) {
      const urlCoordinate =
        "https://hongs-hindi.interactivedemos.io/api/location/get_coordinate";
      sendLocationToBackend(urlCoordinate, latAndLan);
    }
  };

  return (
    <div className=" pt-6 px-6 w-full h-full">
      <div className="">
        <Header isarrow={false} isexit={false} />
      </div>

      <section className=" text-white py-9  pb-0">
        <h6 className="font-Poppins text-xl leading-6 font-semibold">
          Find your Nearest Dealer with <br /> HiVoco’s AI
        </h6>
        <div
          className={`${
            pinCode ? "bg-white text-[#1E1E1E]" : "bg-transparent"
          }  border-2 w-full max-h-12 border-[#F7F7F7]/50 rounded-xl p-3   flex  items-center mt-4 `}
        >
          <input
            value={pinCode}
            onChange={(e) =>
              setPinCode(!isNaN(e.target.value) ? e.target.value : "")
            }
            maxLength={6}
            inputMode="numeric"
            className={`  flex  w-full flex-1 bg-transparent placeholder:text-white outline-none font-Poppins text-base leading-5 font-semibold appearance-none `}
            placeholder="Enter Pincode"
          />

          <img
            onClick={(e) => {
              e.stopPropagation();
              setPinCode(pinCode && "");
            }}
            className=""
            src={`${pinCode ? "/svgs/cross.svg" : " /svgs/mic.svg"}`}
            alt="svg icon"
            srcSet=""
          />
        </div>
        <small className="font-Poppins text-xs font-normal">
          *Tap on mic to speak your full address.
        </small>
        <small className="uppercase font-Poppins text-xs font-normal py-4 block text-center">
          or
        </small>

        <div
          onClick={() => getAddress()}
          className={`border-2 max-h-12 border-[#E6F3FF]/50 rounded-xl  p-3 flex flex-row items-center gap-[10px] ${
            currectaddress ? "bg-white text-black" : "bg-transparent"
          }`}
        >
          <input
            readOnly
            className={` overflow-x-scroll flex flex-1 bg-transparent placeholder:text-white outline-none font-Poppins text-base leading-5 font-semibold ${currectaddress}`}
            placeholder="Your Current Location"
            value={currectaddress}
          />

          <img
            onClick={(e) => {
              currectaddress && e.stopPropagation();
              setCurrectaddress(currectaddress && "");
            }}
            className=""
            src={`${
              currectaddress ? "/svgs/cross.svg" : " /svgs/location.svg"
            }`}
            alt="svg icon"
            srcSet=""
          />
        </div>

        <button
          onClick={handleClick}
          disabled={!(pinCode?.length === 6 || currectaddress) ? true : false}
          className="font-Poppins disabled:opacity-70    opacity-100  transition-opacity text-[#1E1E1E] text-base font-medium leading-5  flex justify-center  px-4 py-3 border-2 border-[#E6F3FF]/50  max-h-12 max-w-[182px] bg-white  rounded-[52px]   my-10 mx-auto text-center"
        >
          Get Dealer Details
        </button>
      </section>
      <img
        className="mx-auto max-w-full max-h-full h-48"
        src="/images/paint-box-collage.png"
        alt="paint-box-collage"
      />
    </div>
  );
}

export default Location;
