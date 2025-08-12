import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
// import receiptItem from "../assets/receipt-item.svg";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import { BsBoxSeam, BsCart3 } from "react-icons/bs";
import { SlChart } from "react-icons/sl";
import { PiSealPercent, PiUsersLight } from "react-icons/pi";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { TbTie } from "react-icons/tb";
import { RiAuctionLine } from "react-icons/ri";
import SideBarRight from "../assets/sidebar-right.svg";
import { useWindowResizer } from "../hooks/useWindowResize";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { GiBlockHouse } from "react-icons/gi";
import { FaHandHoldingUsd } from "react-icons/fa";
import authService from "../api/services/auth.service";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function AdminSidebar() {
  const { windowWidth, isMobile } = useWindowResizer();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userCategoryOpen, setUserCategoryOpen] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIfMobile = () => {
      if (isMobile) {
        setIsSidebarOpen(false);
      } else {
        // Don't force open on larger screens to allow toggle functionality
        // But set it open initially if it wasn't explicitly closed
        if (isSidebarOpen === undefined) {
          setIsSidebarOpen(true);
        }
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [windowWidth]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setUserCategoryOpen(false); // Close user category dropdown when toggling sidebar
  };

  // Navigation links configuration
  const navLinks = [
    { to: "auctions", icon: <RiAuctionLine size={18} />, label: "Auctions" },
    { to: "orders", icon: <BsCart3 size={16} />, label: "Orders" },
    { to: "reports", icon: <SlChart size={16} />, label: "Reports" },
    {
      to: "promotions",
      icon: <PiSealPercent size={16} />,
      label: "Promotions & Discounts",
    },
    { to: "shipments", icon: <BsBoxSeam size={16} />, label: "Shipments" },
    { to: "agents", icon: <TbTie size={16} />, label: "Field Agents" },
    {
      to: "customer-care",
      icon: <MdOutlineHeadsetMic size={16} />,
      label: "Customer Care",
    },
  ];
  // Function to check if a link is active for root (/admin) dashboard
  const isActiveLink = (path: string) => {
    // Check if the current path matches the link's path
    return pathname === path;
  };

  const handleLogout = async () => {
    isMobile && setIsSidebarOpen(false);
    try {
      const response = await authService.logout();
      if (response.status === 200) {
        toast.success("Logout successful");
        setTimeout(() => {
          dispatch(logout());
          Cookies.remove("token");
        }, 500);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Overlay - shown only when sidebar is open on mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Toggle button for when sidebar is closed (both mobile and desktop) */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md flex items-center justify-center"
          onClick={toggleSidebar}
        >
          {isMobile ? (
            <HiOutlineMenuAlt2 size={24} />
          ) : (
            <div className="flex items-center">
              <img
                src={SideBarRight}
                alt="open sidebar"
                className="w-fit h-[25px]"
              />
            </div>
          )}
        </button>
      )}

      {/* Main sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:fixed h-full z-30 w-64 overflow-y-auto flex flex-col px-4 py-5 gap-y-2 border-r border-r-[#E6E6E6] bg-[#E6E6E6] transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center">
          <img className="h-[45px] w-fit" src={logo} alt="logo" />

          <img
            className="w-fit h-[25px] transform rotate-180 cursor-pointer"
            src={SideBarRight}
            alt="toggle sidebar"
            onClick={toggleSidebar}
          />
        </div>

        <div className="flex flex-col gap-y-2 flex-1 w-full mt-7">
          {/* Map through navigation links */}
          <NavLink
            to={"/admin"}
            className={`${
              isActiveLink("/admin")
                ? "text-white bg-defaultOrange"
                : "text-black hover:bg-defaultOrange hover:text-white"
            } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`}
            onClick={() => isMobile && setIsSidebarOpen(false)}
          >
            <span className="transition-none flex-shrink-0">
              <RxDashboard size={16} />
            </span>
            <span className="line-clamp-1">Dashboard</span>
          </NavLink>

          <NavLink
            to={"/admin/products"}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-white bg-defaultOrange"
                  : "text-black hover:bg-defaultOrange hover:text-white"
              } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
            }
            onClick={() => isMobile && setIsSidebarOpen(false)}
          >
            <span className="transition-none flex-shrink-0">
              <BsBoxSeam size={16} />
            </span>
            <span className="line-clamp-1">Products</span>
          </NavLink>

          {/* Users dropdown section */}
          <div
            className={`flex cursor-pointer ${
              userCategoryOpen && "bg-defaultOrange "
            } flex-col gap-y-2`}
          >
            <div
              onClick={() => setUserCategoryOpen((prev) => !prev)}
              role="button"
              aria-label="users dopdown menue"
              className=" rounded-[8px] p-2.5 px-3 flex items-center justify-between gap-x-3 text-sm w-full"
            >
              <div className="flex items-center gap-x-3">
                <PiUsersLight
                  size={16}
                  className="transition-none flex-shrink-0"
                />
                <span className="line-clamp-1">Users</span>
              </div>

              {userCategoryOpen ? (
                <FaChevronUp className="cursor-pointer" size={16} />
              ) : (
                <FaChevronDown className="cursor-pointer" size={16} />
              )}
            </div>
            <div
              className={` ${
                userCategoryOpen ? "flex" : "hidden"
              }  p-2.5 flex-col gap-1  shadow-lg `}
            >
              <NavLink
                to={"/admin/buyers"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-defaultOrange bg-white"
                      : "text-black hover:bg-white hover:text-defaultOrange"
                  } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                }
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <FaHandHoldingUsd /> Buyers
              </NavLink>

              <NavLink
                to={"/admin/sellers"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-defaultOrange bg-white"
                      : "text-black hover:bg-white hover:text-defaultOrange"
                  }  rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
                }
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <GiBlockHouse /> Sellers
              </NavLink>
            </div>
          </div>

          {/* remaining links */}
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={`/admin/${link.to}`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-white bg-defaultOrange"
                    : "text-black hover:bg-defaultOrange hover:text-white"
                } rounded-[8px] p-2.5 px-3 flex items-center gap-x-3 text-sm w-full`
              }
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <span className="transition-none flex-shrink-0">{link.icon}</span>
              <span className="line-clamp-1">{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Logout button */}
        <button
          className="w-full flex items-center gap-x-3 p-3 rounded-lg hover:bg-black/5"
          onClick={handleLogout}
        >
          <MdOutlineLogout size={16} color="crimson" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main content padding adjustment for when sidebar is open on desktop */}
      {!isMobile && isSidebarOpen && <div className="w-64"></div>}
    </>
  );
}
