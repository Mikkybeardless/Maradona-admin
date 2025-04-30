import { FaRegBell } from "react-icons/fa6";
import img1 from "../assets/discount-bg.png";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";

export default function DashboardSearchBar() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="w-full h-full flex justify-between items-center">
      {pathName === "/" && (
        <div className="flex items-stretch gap-x-4 w-[70%]">
          <div className="flex items-stretch gap-x-4 pl-4 flex-1 rounded-lg border bg-white border-primaryBorder">
            <CiSearch className="h-fit w-fit my-auto" size={24} />
            <input
              className="flex-1 py-3 outline-none border-none text-sm"
              placeholder="Property type, location, price range"
              type="text"
            />
            <select className="px-3 border text-sm border-primaryBorder rouunded-lg  bg-white">
              <option>All</option>
            </select>
          </div>
          <button className="px-10 rounded-lg text-sm  text-white bg-defaultOrange hover:bg-defaultOrangeHover">
            Search
          </button>
        </div>
      )}

      <div className="flex items-center gap-x-5 ml-auto">
        <FaRegBell
          className="cursor-pointer hover:text-defaultOrange"
          size={22}
        />
        <img
          className="w-[36px] h-[36px] rounded-full object-fill"
          src={img1}
          alt="Profile"
        />
      </div>
    </div>
  );
}
