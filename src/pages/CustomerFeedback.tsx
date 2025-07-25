import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useClickAway } from "react-use";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight, FaStar } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import { BsGear, BsThreeDots } from "react-icons/bs";
import Land from "../assets/Dashboard-land-1.png";

export default function CustomerFeedback({ customer }: { customer: string }) {
  const location = useLocation();
  const { pathname } = location;
  const [menuDropdown, setMenuDropdown] = useState(false);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(menuDropdownRef, () => {
    setMenuDropdown(false);
  });

  function Review() {
    return (
      <div className="p-8 flex flex-col gap-y-2 border-t border-t-primaryBorder">
        <p className="uppercase text-[#585858]">Service Feedback</p>
        <div className="flex gap-x-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar size={20} key={num} color="#FFD700" />
          ))}
        </div>
        <p className="text-sm font-medium whitespace-pre">Excellent Services</p>
        <p className="text-sm whitespace-pre">
          Couldn&apos;t have asked for a better service. Delivery was fast and
          they also have an ultimate warranty policy. Would highly recommend
          Distress Sales 24/7
        </p>
        <div className="">
          <img
            src={Land}
            alt="feedback"
            className="h-[40px] w-auto object-fill rounded-lg"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <main className="px-24 w-full mt-4 flex flex-col">
        <section className="flex gap-x-4 items-center">
          <Link to={`/${customer}s/${customer}`} className="text-sm opacity-60">
            Customer
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Feedback & Reviews</span>
        </section>

        <section
          id="customer-info"
          className="flex justify-between items-center mt-4"
        >
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-3xl font-bold flex items-start">
              Rosemary Sunday
            </h1>
            <div className="flex gap-x-2 text-[#5D5D5D] items-center">
              <span className="text-sm">FCT, Abuja, Nigeria</span>
              <FaDotCircle size={5} color="#D9D9D9" />
              <span className="text-sm">2 days ago</span>
            </div>
          </div>
          <div className="relative overflow-visible">
            <BsThreeDots
              onClick={() => setMenuDropdown(true)}
              className="cursor-pointer"
              size={30}
            />
            {menuDropdown ? (
              <div
                ref={menuDropdownRef}
                className="absolute flex flex-col top-[110%] right-0 z-20 py-1 rounded-lg bg-white border border-primaryBorder"
              >
                <Link
                  to={`/${customer}s/${customer}/transaction-history`}
                  className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                >
                  Transaction History
                </Link>
                <Link
                  to={`/${customer}s/${customer}/notifications`}
                  className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                >
                  Notifications
                </Link>
              </div>
            ) : null}
          </div>
        </section>

        <div className="flex gap-x-5 items-center mt-5">
          <div className="flex flex-col gap-y-1">
            <p className="text-xs">Date:</p>
            <input
              type="datetime-local"
              className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-xs">Price:</p>
            <select className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none">
              <option>Settled</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className="w-full rounded-t-lg mt-5">
          <div className="flex justify-between px-4 py-2.5 rounded-t-lg bg-[#E6E6E6]">
            <span className="text-sm font-semibold">Notification</span>
            <BsGear size={20} className="cursor-pointer" />
          </div>
          <div className="w-full flex flex-col bg-white">
            {[1, 2, 3, 4].map((num) => (
              <Review key={num} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
