import Header from "../components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";

function DelearDetails() {
  const location = useLocation();
  const data = location.state.result.data;

  console.log(location);
  

  const navigate=useNavigate()

  // console.log(location);

  

  if (!data || data.length===0) {
    
    return (
      <div className="flex h-full flex-col justify-center items-center gap-2">
        <h3 className="text-xl font-medium text-white"> Delaler not found </h3>;
        <button
          onClick={() => navigate(-1)}
          className="rounded-[1rem] px-5  mx-6 bg-white font-Poppins text-xl font-semibold text-center py-4  border-2 border-[#F7F7F7]/50  mb-16 hover:shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className=" pt-6 w-full h-full self-start">
      <div className="px-6">
        <Header isarrow={true} />
      </div>
      <section className=" text-white px-6 mt-4 mb-5 ">
        <div className="flex items-center border-b-[0.5px] border-[#FFFFFF80] pb-2">
          <img src="/svgs/location-pin.svg" alt="Location-Pin" />
          <h6 className="font-Montserrat text-base font-medium">{location?.state?.postcode || location?.state?.pinCode ||""}</h6>
        </div>
      </section>
      <section className="px-6">
        {data?.map((dealer, index) => {
          return (
            <div
              key={index}
              className="p-[10px] bg-white flex items-center rounded-lg mb-2"
            >
              <div className="flex flex-1 gap-1">
                <img
                  className="rounded-full w-14 h-14"
                  src="/images/Haier Onam (9) 2.png"
                  alt="Haier Onam"
                  srcSet=""
                />
                <div className="flex flex-col gap-1">
                  <small className="text-sm font-semibold font-Montserrat">
                    {dealer.name}
                  </small>
                  <small className="text-xs font-semibold ">location</small>
                  <p className="text-xs font-normal ">
                    {dealer?.location}
                    {/* Address: A-35, First Floor, Karol Bagh, New Delhi - 110011 */}
                  </p>
                  <small className="text-xs font-normal">
                    {/* <a href={"tel:+91"+ dealer?.contact}>Contact: {dealer?.contact} </a> */}

                    {dealer?.contact}


                    {/* Contact: {dealer?.contact} */}
                  </small>
                </div>
              </div>
              <Link to={"tel:+91"+ dealer.contact}>
                <strong className="underline font-normal font-Montserrat  text-base">
                  Connect
                </strong>
              </Link>
            </div>
          );
        })}

      </section>
    </div>
  );
}

export default DelearDetails;
