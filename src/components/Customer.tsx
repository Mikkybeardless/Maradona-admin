import { FaDotCircle } from "react-icons/fa";
import DashboardSearchBar from "../components/DashboardSearchBar";
// import Car from "../assets/Product-page-car.png";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { FaChevronRight } from "react-icons/fa6";
import { formatAmountToNaira } from "../helper/helperFunctions";
import { formatIsoString } from "../helper/formatIIsoString";

interface IAdminCustomer {
  customer: string;
  user: ApiBuyer | ApiSeller;
  buyerStats?: Customer;
}

export default function AdminCustomer({
  customer,
  user,
  buyerStats,
}: IAdminCustomer) {
  const location = useLocation();
  const { pathname } = location;
  const [menuDropdown, setMenuDropdown] = useState(false);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(menuDropdownRef, () => {
    setMenuDropdown(false);
  });

  function ProductComponent({ item }: { item: RecentOrder }) {
    return (
      <div className="w-full flex items-center justify-between gap-x-2">
        <div className=" flex gap-x-2 items-center">
          {/* <img
            src={Car}
            alt="Product"
            className="w-[55px] h-[55px] rounded-lg object-contain bg-black/5 flex-shrink-0"
          /> */}
          <div className="flex flex-col gap-y-1.5 w-full">
            <div className="flex gap-x-2 items-center text-xs">
              <span>ID: {item.id}</span>
              <span
                className={`rounded-lg px-2 py-1  ${
                  item.status === "pending"
                    ? "text-[#C38D00] bg-[#FFF9D9]"
                    : "text-green-500 bg-green-100"
                } `}
              >
                {item.status}
              </span>
            </div>
            <p className="line-clamp-1 font-medium">{item.product_name}</p>
            <span className="text-xs text-[#6D6D6D]">
              Purchased - {formatIsoString(item.created_at).formattedDate} at{" "}
              {formatIsoString(item.created_at).formattedTime}
            </span>
          </div>
        </div>

        <div className=" flex flex-col gap-y-2">
          <p className="text-sm text-[#6D6D6D]">{item.amount} x 1</p>
          <p className="font-medium">
            {formatAmountToNaira(Number(item.amount || 0))}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span>Order type</span>
          <span className="text-sm text-[#6D6D6D]">
            {item.type === "auction_purchase" ? "Auction Purchase" : "Direct"}
          </span>
        </div>
      </div>
    );
  }

  const metrices = [
    { label: "Orders", value: buyerStats?.stats.total_orders },
    {
      label: "Amount spent",
      value: formatAmountToNaira(buyerStats?.stats.amount_spent || 0),
    },
    { label: "Conversion", value: `${buyerStats?.stats.conversion_rate}%` },
    { label: "Frequency", value: `${buyerStats?.stats.frequency}` },
  ];

  const Breakdown = [
    { label: "Direct Orders", value: buyerStats?.breakdown.direct_orders },
    { label: "Auction Orders", value: buyerStats?.breakdown.auction_orders },
    {
      label: "Direct Spendings",
      value: formatAmountToNaira(
        Number(buyerStats?.breakdown.direct_spending || 0)
      ),
    },
    {
      label: "Auction Spendings",
      value: formatAmountToNaira(
        Number(buyerStats?.breakdown.auction_spending || 0)
      ),
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-4 md:px-10">
        <DashboardSearchBar />
      </div>

      <main className=" px-2 md:px-10 w-full mt-4  flex flex-col flex-1">
        <section className="flex gap-x-4 mb-6 items-center">
          <Link to="/" className="text-sm opacity-60">
            Dashboard
          </Link>
          <FaChevronRight size={18} />
          <Link
            to={`/admin/${customer}s`}
            className="text-sm capitalize opacity-60"
          >
            {customer}s
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm capitalize">{customer}</span>
        </section>

        <section
          id="customer-data"
          className="flex flex-col md:flex-row md:justify-between items-center"
        >
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-3xl font-bold flex items-start">
              {user?.name || "Rose Mary"}
            </h1>
            {/* <div className="flex gap-x-2 text-[#5D5D5D] items-center">
              <span className="text-sm">FCT, Abuja, Nigeria</span>
              <FaDotCircle size={5} color="#D9D9D9" />
              <span className="text-sm">2 days ago</span>
            </div> */}
          </div>
          {/* <div className="relative overflow-visible">
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
                  to={`/admin/${customer}s/${customer}/transaction-history`}
                  className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                >
                  Transaction History
                </Link>
                <Link
                  to={`/admin/${customer}s/${customer}/notifications`}
                  className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                >
                  Notifications
                </Link>
                <Link
                  to={`/admin/${customer}s/${customer}/feedback`}
                  className="text-sm px-4 py-3 whitespace-nowrap hover:underline"
                >
                  Feedback & Reviews
                </Link>
              </div>
            ) : null}
          </div> */}
        </section>

        {buyerStats && (
          <section
            id="customer-metrics"
            className="w-full rounded-lg mt-7 py-2 grid grid-cols-2 items-center md:items-start md:grid-cols-4 border border-primaryBorder bg-white"
          >
            {metrices.map((metric, index) => (
              <div
                key={index}
                className={`flex flex-col gap-y-2 px-5 py-4 items-center md:items-start md:border-b-0 md:border-r md:border-r-primaryBorder ${
                  index < 2 ? "border-b  border-b-primaryBorder" : ""
                }`}
              >
                <p className="text-xs text-[#6D6D6D]">{metric.label}</p>
                <p className="text-xl font-medium">{metric.value}</p>
              </div>
            ))}
          </section>
        )}

        <section
          id="customer-information"
          className="flex flex-col md:flex-row  gap-4 mt-5"
        >
          <div className=" w-full md:w-[50%] flex flex-col text-sm rounded-lg border border-primaryBorder bg-white">
            <h3 className="font-medium text-base p-4 border-b border-b-primaryBorder">
              Basic information
            </h3>
            <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Name:</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Email:</p>
              <p className="font-medium">{user.email}</p>
            </div>
            {/* <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Phone number:</p>
              <p className="font-medium">07062393917</p>
            </div> */}
            <div className="flex flex-col p-4 py-3">
              <p className="text-sm opacity-65">Joined</p>
              <p className="font-medium">
                {formatIsoString(user.created_at).formattedDate}
              </p>
            </div>
          </div>

          {buyerStats && (
            <div className="w-full md:w-[50%] flex flex-col text-sm rounded-lg border border-primaryBorder bg-white">
              <h3 className="font-medium text-base p-4 border-b border-b-primaryBorder">
                Total Breakdown
              </h3>

              {Breakdown.map((item, index) => (
                <div key={index} className="flex gap-2  p-4 py-3">
                  <p className="text-sm opacity-65">{item.label}:</p>

                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {buyerStats && (
          <section
            id="recent-orders"
            className="w-full flex flex-col gap-y-4 mt-5"
          >
            <div className="w-full rounded-lg border border-primaryBorder bg-white">
              <h3 className="font-medium p-4">Recent Orders)</h3>

              <div className="w-full flex flex-col gap-y-7 px-3 py-4 custom-scrollbar overflow-y-auto border-t border-t-primaryBorder">
                {buyerStats?.recent_orders.map((item) => (
                  <ProductComponent key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
