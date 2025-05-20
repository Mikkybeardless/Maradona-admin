import { FaDotCircle } from "react-icons/fa";
import DashboardSearchBar from "../components/DashboardSearchBar";
import Car from "../assets/Product-page-car.png";
import { Link, useLocation } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { FaChevronRight } from "react-icons/fa6";

export default function AdminCustomer({ customer }: { customer: string }) {
  const location = useLocation();
  const { pathname } = location;
  const [menuDropdown, setMenuDropdown] = useState(false);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(menuDropdownRef, () => {
    setMenuDropdown(false);
  });

  function ProductComponent({ index }: any) {
    return (
      <div key={index} className="w-full flex items-center gap-x-2">
        <div className="w-[65%] flex gap-x-2 items-center">
          <img
            src={Car}
            alt="Product"
            className="w-[55px] h-[55px] rounded-lg object-contain bg-black/5 flex-shrink-0"
          />
          <div className="flex flex-col gap-y-1.5 w-full">
            <div className="flex gap-x-2 items-center text-xs">
              <span>ID: #1011</span>
              <span className="rounded-lg px-2 py-1 text-[#C38D00] bg-[#FFF9D9]">
                Pending
              </span>
            </div>
            <p className="line-clamp-1 font-medium">Toyota Camry, 2018</p>
            <span className="text-xs text-[#6D6D6D]">
              Purchased - Feb 16, 2024
            </span>
          </div>
        </div>

        <div className="w-[30%] flex flex-col gap-y-2">
          <p className="text-sm text-[#6D6D6D]">₦5,500,000 x 1</p>
          <p className="font-medium">₦5,500,000</p>
        </div>

        <div className="w-[5%]">
          <Link
            to={`/orders/order`}
            state={{ fromTransaction: true }}
            className="text-sm hover:underline text-[#B44500]"
          >
            View
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-10">
        <DashboardSearchBar />
      </div>

      <div className="px-10 w-full mt-4  flex flex-col flex-1">
        <div className="flex gap-x-4 mb-6 items-center">
          <Link to="/" className="text-sm opacity-60">
            Dashboard
          </Link>
          <FaChevronRight size={18} />
          <Link to="/buyers" className="text-sm capitalize opacity-60">
            {customer}s
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm capitalize">{customer}</span>
        </div>
        <div className="flex justify-between items-center">
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
                <Link
                  to={`/${customer}s/${customer}/feedback`}
                  className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                >
                  Feedback & Reviews
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className="w-full rounded-lg mt-7 py-2 grid grid-cols-4 border border-primaryBorder bg-white">
          <div className="flex flex-col gap-y-2 px-5 py-4 border-r border-r-primaryBorder">
            <p className="text-xs text-[#6D6D6D]">Orders</p>
            <p className="text-xl font-medium">6</p>
          </div>
          <div className="flex flex-col gap-y-2 px-5 py-4 border-r border-r-primaryBorder">
            <p className="text-xs text-[#6D6D6D]">Amount spent</p>
            <p className="text-xl font-medium">₦23,000</p>
          </div>
          <div className="flex flex-col gap-y-2 px-5 py-4 border-r border-r-primaryBorder">
            <p className="text-xs text-[#6D6D6D]">Conversion</p>
            <p className="text-xl font-medium">80%</p>
          </div>
          <div className="flex flex-col gap-y-2 px-5 py-4">
            <p className="text-xs text-[#6D6D6D]">Frequency</p>
            <p className="text-xl font-medium">63%</p>
          </div>
        </div>

        <div className="flex gap-x-4 mt-5">
          <div className="w-[50%] flex flex-col text-sm rounded-lg border border-primaryBorder bg-white">
            <h3 className="font-medium text-base p-4 border-b border-b-primaryBorder">
              Basic information
            </h3>
            <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Name:</p>
              <p className="font-medium">Rosemary Sunday</p>
            </div>
            <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Email:</p>
              <p className="font-medium">rsunday@gmail.com</p>
            </div>
            <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Phone number:</p>
              <p className="font-medium">07062393917</p>
            </div>
            <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Joined</p>
              <p className="font-medium">Sept 2, 2023</p>
            </div>
          </div>
          <div className="w-[50%] flex flex-col text-sm rounded-lg border border-primaryBorder bg-white">
            <h3 className="font-medium text-base p-4 border-b border-b-primaryBorder">
              Shipping
            </h3>
            <div className="flex flex-col p-4 py-3">
              <div className="flex gap-x-5 items-center">
                <p className="text-sm opacity-65">Delivery address 1:</p>
                <span className="border py-[2px] px-4 rounded-3xl text-defaultOrange border-defaultOrange">
                  Default
                </span>
              </div>

              <p className="font-medium">
                Mubinu. Osogbo, Osun, Ifedayo, Osun State , Nigeria
              </p>
            </div>
            <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Delivery address 2:</p>
              <p className="font-medium">
                Mubinu. Osogbo, Osun, Ifedayo, Osun State , Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-4 mt-5">
          <div className="w-full rounded-lg border border-primaryBorder bg-white">
            <h3 className="font-medium p-4">Recent order(s)</h3>

            <div className="w-full flex flex-col gap-y-7 px-3 py-4 custom-scrollbar overflow-y-auto border-t border-t-primaryBorder">
              {[1, 2, 3, 4, 5].map((num) => (
                <ProductComponent key={num} index={num} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
