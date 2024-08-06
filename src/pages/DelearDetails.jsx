import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";

function DelearDetails() {
  const location = useLocation();
  const data = location.state.result.data;

  // console.log(location);

  if (data.length === 0) {
    return <h3> no location found or returned </h3>;
  }

  return (
    <div className=" pt-10 w-full h-full">
      <div className="px-6">
        <Header isarrow={true} />
      </div>
      <section className=" text-white px-6 mt-4 mb-5 ">
        <div className="flex items-center border-b-[0.5px] border-[#FFFFFF80] pb-2">
          <img src="/svgs/location-pin.svg" alt="Location-Pin" />
          <h6 className="font-Montserrat text-base font-medium">203022</h6>
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
                  <small className="text-xs font-normal ">
                    Contact: {dealer?.contact}
                  </small>
                </div>
              </div>
              <Link to={"#"}>
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
