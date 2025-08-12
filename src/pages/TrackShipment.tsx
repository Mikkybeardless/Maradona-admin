import { FaChevronLeft, FaCircle } from "react-icons/fa6";
import DashboardSearchBar from "../components/DashboardSearchBar";
import Profile from "../assets/sign-in-image.png";
import MapPreview from "../assets/map-image.png";
import { BiMessageDetail } from "react-icons/bi";
import { PiPhoneCall } from "react-icons/pi";
import { FaRegDotCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TrackShipment() {
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-24 w-full mt-4 flex flex-col gap-y-6 flex-1">
        <div className="flex justify-between items-center">
          <Link to="/admin/shipments" className="">
            <FaChevronLeft size={24} />
          </Link>

          <span className="flex gap-x-5 items-center font-semibold">
            Shipment 73KJFHIUDF4
            <span className="px-2 rounded-[100px] text-xs text-[#8A570A] bg-[#FBF5D6]">
              In transit
            </span>
          </span>
        </div>

        <div className="flex justify-between items-center mt-5">
          <div className="flex gap-x-2 items-center">
            <img
              src={Profile}
              alt="profile"
              className="size-[40px] rounded-full object-fill"
            />
            <div className="flex flex-col gap-y-1">
              <h4 className="text-lg font-semibold">Rosemary Sunday</h4>
              <span className="text-sm w-fit px-2 rounded-lg bg-[#FCDFD7] text-[#4A1E11]">
                Carrier
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <button className="p-2.5 rounded-full bg-defaultOrange hover:bg-defaultOrangeHover">
              <BiMessageDetail size={24} color="white" />
            </button>
            <button className="p-2.5 rounded-full bg-defaultOrange hover:bg-defaultOrangeHover">
              <PiPhoneCall size={24} color="white" />
            </button>
          </div>
        </div>

        <div className="flex items-center relative mt-3">
          <div className="w-[15rem] flex items-center">
            <div className="flex flex-col flex-shrink-0">
              <FaRegDotCircle
                className="flex-shrink-0"
                color="#2CA568"
                size={36}
              />
              <p className="text-sm absolute font-semibold top-[120%]">
                Processing
              </p>
            </div>
            <div className="h-[1.6px] flex-1 bg-[#2CA568]"></div>
          </div>
          <div className="w-[15rem] flex items-center">
            <div className="flex flex-col flex-shrink-0">
              <FaRegDotCircle
                className="flex-shrink-0"
                color="#2CA568"
                size={36}
              />
              <p className="text-sm absolute font-semibold top-[120%]">
                On Transit
              </p>
            </div>
            <div className="h-[1.6px] flex-1 bg-[#2CA568]"></div>
          </div>
          <div className="w-[15rem] flex items-center">
            <div className="flex flex-col flex-shrink-0">
              <FaRegDotCircle
                className="flex-shrink-0"
                color="#2CA568"
                size={36}
              />
              <p className="text-sm absolute font-semibold top-[120%]">
                In Abuja
              </p>
            </div>
            <div className="h-[1.6px] flex-1 bg-[#B5ABB3]"></div>
          </div>
          <div className="flex flex-col flex-shrink-0">
            <FaRegDotCircle
              className="flex-shrink-0"
              color="#B5ABB3"
              size={36}
            />
            <p className="text-sm absolute font-semibold top-[120%]">
              Delivered
            </p>
          </div>
        </div>
        {/* green progress bar */}

        <div className="flex flex-col gap-y-7 mt-16">
          <h2 className="text-xl font-semibold">Tracking Updates</h2>

          <div className="flex flex-col mt-6 w-[75%] text-sm">
            {[1, 2, 3, 4, 5, 6].map((num, index, array) => (
              <div key={index} className="flex w-full items-start h-[5rem]">
                <div className="flex flex-col w-[45%]">
                  <p className="font-semibold">Tue, Dec 18</p>
                  <p className="">01:30 pm</p>
                </div>
                <div className="flex flex-col relative items-center flex-shrink-0 w-[10%] h-full">
                  <FaCircle
                    className="flex-shrink-0"
                    size={14}
                    color="#e65800"
                  />
                  {num !== array.length ? (
                    <div className="h-full w-[1.5px] bg-defaultOrange"></div>
                  ) : null}
                </div>
                <div className="flex flex-col w-[45%] items-end">
                  <p className="font-semibold">Processing</p>
                  <p className="">
                    21 Velocity Street, Rapid City, Lagos, Nigeria
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-16">
          <img src={MapPreview} className="w-full h-auto bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
