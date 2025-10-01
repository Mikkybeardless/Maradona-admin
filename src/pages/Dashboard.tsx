import DashboardSearchBar from "../components/DashboardSearchBar";
import LineChartComponent from "../components/LineChart";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BsArrowUp } from "react-icons/bs";
import TEarnings from "../assets/TEarnings.svg";
import TUser from "../assets/TUser.svg";
import TSales from "../assets/TSales.svg";
import {
  buildCleanParams,
  formatAmountToNaira,
  generateRandomNumber,
} from "../helper/helperFunctions";
import { GridColDef } from "@mui/x-data-grid";
import MuiTableComponent from "../components/table/TableComponent";
import Car2 from "../assets/Dashboard-listing-car.png";
import { Props } from "recharts/types/component/DefaultLegendContent";
import { useWindowResizer } from "../hooks/useWindowResize";
import { ProgressUI } from "../components/common/progressUi";
import { useCallback, useEffect, useState } from "react";
import auctionService from "../api/services/auction.service";
import statsService from "../api/services/stats.service";
import { ProductLoadingSkeleton } from "../components/common/SquareLoadingState";
import CustomPeriodModal from "../components/modals/customPeriod";
import { DateSelect } from "../components/common/dateSelect";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { StatusSelect } from "../components/common/statusSelect";
import { FilterGroup } from "../components/common/FilterGroup";
import { useDebounce } from "../hooks/useDebounce";
import formatDayJs from "../helper/formatDateJs";
import { Dayjs } from "dayjs";
import DefaultImg from "../assets/no-image.png";
import { BidsColumns } from "../components/table/columns";
import bidsService from "../api/services/bids.service";
import { ErrorState } from "../components/common/ErrorState";
import { spawn } from "child_process";

type IFilter = {
  category: string;
  status: string;
  date: Dayjs | null;
};

export default function Dashboard() {
  const { isMobile } = useWindowResizer();
  const initialStats = {
    totalRevenue: {
      direct_sales_revenue: 0,
      auction_sales_revenue: "",
      total_revenue: 0,
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    totalUsers: {
      data: [],
      total_users: 0,
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    topSellingProducts: {
      data: [],
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    totalSales: {
      current_period: {
        direct_sales_units: 0,
        direct_sales_amount: 0,
        auction_sales_units: 0,
        auction_sales_amount: 0,
        total_units: 0,
        total_amount: 0,
      },
      previous_period: {
        direct_sales_units: 0,
        direct_sales_amount: 0,
        auction_sales_units: 0,
        auction_sales_amount: 0,
        total_units: 0,
        total_amount: 0,
      },
      changes: {
        unit_change: 0,
        amount_change: 0,
        unit_percentage_change: 0,
        amount_percentage_change: 0,
      },
      period: {
        start: "",
        end: "",
        description: "",
      },
      comparison_period: {
        start: "",
        end: "",
      },
    },
    monthlyReport: {
      data: [],
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
  };
  const [bidData, setBidData] = useState({
    rows: [] as ApiBid[],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    totalRowCount: 0,
    loading: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    category: "",
    status: "",
    date: null,
  });

  const formatedDate = formatDayJs(filters.date);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customDate, setCustomDate] = useState({
    start_date: "",
    end_date: "",
  });

  const fetchBids = useCallback(async () => {
    setBidData((prev) => ({ ...prev, loading: true }));
    try {
      const params = buildCleanParams(
        {
          status: filters.status,
          type: filters.category,
          created_at: formatedDate,
        },
        debouncedSearchQuery,
        bidData.pagination.page,
        bidData.pagination.pageSize
      ).toString();
      const response = await bidsService.getAllBids(params);
      console.log("Bids response:", response.data.data);
      setBidData({
        rows: response.data.data,
        pagination: {
          page: response.data.current_page,
          pageSize: response.data.per_page,
        },
        totalRowCount: response.data.total,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setBidData((prev) => ({ ...prev, loading: false }));
    }
  }, [
    bidData.pagination.page,
    bidData.pagination.pageSize,
    filters.category,
    filters.status,
    debouncedSearchQuery,
  ]);

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  const fetchAllStats = useCallback(async () => {
    setLoading(true);
    const params = buildCleanParams(customDate).toString();
    try {
      const results = await Promise.allSettled([
        statsService.getTotalRevenue(params),
        statsService.getTotalUsers(params),
        statsService.getBestSellingProducts(params),
        statsService.getTotalSales(params),
        statsService.getMonthlyReport(params),
      ]);

      const [
        revenueResult,
        usersResult,
        productsResult,
        salesResult,
        monthlyReportResult,
      ] = results;

      // Process successful results and log failed ones
      const newStats: Stats = { ...initialStats };
      const errors = [];

      if (revenueResult.status === "fulfilled") {
        newStats.totalRevenue = revenueResult.value.data;
        localStorage.setItem(
          "totalRevenue",
          JSON.stringify(revenueResult.value.data)
        );
      } else {
        console.error("Revenue fetch failed:", revenueResult.reason);
        errors.push("Failed to load revenue data");
      }

      if (usersResult.status === "fulfilled") {
        newStats.totalUsers = usersResult.value.data;
      } else {
        console.error("Users fetch failed:", usersResult.reason);
        errors.push("Failed to load users data");
      }

      if (productsResult.status === "fulfilled") {
        newStats.topSellingProducts = productsResult.value.data;
      } else {
        console.error("Products fetch failed:", productsResult.reason);
        errors.push("Failed to load products data");
      }

      if (salesResult.status === "fulfilled") {
        newStats.totalSales = salesResult.value.data;
      } else {
        console.error("Sales fetch failed:", salesResult.reason);
        errors.push("Failed to load sales data");
      }

      if (monthlyReportResult.status === "fulfilled") {
        newStats.monthlyReport = monthlyReportResult.value.data;
      } else {
        console.error(
          "Monthly report fetch failed:",
          monthlyReportResult.reason
        );
        errors.push("Failed to load monthly report");
      }
      // console.log("Fetched stats:", newStats);
      setStats(newStats);

      // Set error if some failed, but still show partial data
      if (errors.length > 0) {
        setError(
          new Error(
            `Some data failed to load, Please check your internet connection`
          )
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError(new Error("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  }, [customDate.end_date, customDate.start_date]);

  useEffect(() => {
    fetchAllStats();
  }, [fetchAllStats]);

  const data02 = [
    {
      name: "Abuja",
      value: 700,
      color: "#FFC633",
    },
    {
      name: "Lagos",
      value: 600,
      color: "#E65800",
    },
    {
      name: "Port Harcourt",
      value: 500,
      color: "#1A0079",
    },
    {
      name: "Kaduna",
      value: 100,
      color: "#000000",
    },
  ];
  const renderLegend2 = (props: Props) => {
    const { payload } = props;

    return (
      <ul className="flex flex-col justify-center gap-y-3">
        {payload?.map((entry: any, index: number) => (
          <li
            key={index}
            className="flex items-center gap-x-3 text-secondaryTextColor"
          >
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  const colors = ["#e65800", "#14199c", "#040421", "#22c55e"];

  const handleCustomPeriodApply = (customDate: {
    start_date: string;
    end_date: string;
  }) => {
    setCustomDate(customDate);
  };

  const handleRetry = () => {
    setError(null);
    fetchAllStats();
    fetchBids();
  };

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar py-20">
      {/* modals */}
      <CustomPeriodModal
        Modal={isModalOpen}
        setModal={setIsModalOpen}
        onApply={handleCustomPeriodApply}
      />
      <div className="w-full fixed z-10 left-2 top-0 py-5 px-5 bg-white border-b md:px-10">
        <DashboardSearchBar />
      </div>

      <main className="md:px-10 px-5 w-full mt-8">
        {loading ? (
          <div className="flex flex-col">
            <div className="grid w-full grid-cols-1 bg-white p-6 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProductLoadingSkeleton key={index} />
              ))}
            </div>
            <div className="w-full p-6 bg-white ">
              <ProductLoadingSkeleton />
            </div>
          </div>
        ) : error ? (
          <ErrorState
            message={(error as Error)?.message ?? "An error occurred"}
            onRetry={handleRetry}
          />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl text-darkBlue font-bold">Dashboard</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-defaultOrange text-white px-4 py-2 rounded-md"
              >
                Custom period
              </button>
            </div>
            {/* Dashboard Metrics */}
            <section
              id="dashboard-metrics"
              className="w-full p-6 grid gap-y-4 md:gap-x-4 grid-col-1 md:grid-cols-3 bg-white shadow-md rounded-lg my-7"
            >
              <div className="bg-darkBlue rounded-lg p-2 text-white">
                <div className="flex flex-col gap-y-1 border rounded-lg border-white p-2 pb-4">
                  <div className="flex gap-x-3 mb-5 items-center">
                    <img src={TEarnings} alt="DB Image" />
                    <p className="font-bold">Total Earnings</p>
                  </div>
                  {/* <p className="text-xs">Last 7 days</p> */}
                  <p className="flex gap-x-2 text-2xl font-bold">
                    {formatAmountToNaira(stats.totalRevenue.total_revenue)}

                    <span className="text-sm px-2 py-1 flex gap-1 items-center rounded-3xl bg-white text-green-500">
                      <BsArrowUp className="font-bold" />
                      {stats.totalSales.changes.unit_percentage_change}%
                    </span>
                  </p>
                  <p className="text-xs">
                    {/* Previous 7 days{" "} */}
                    {stats.totalRevenue.period.description}{" "}
                    {/* <span className="text-green-500">( + N235k)</span> */}
                  </p>
                </div>
              </div>

              <div className="bg-defaultOrange rounded-lg p-2 text-white">
                <div className="flex flex-col gap-y-1 border rounded-lg border-white p-2">
                  <div className="flex mb-5 gap-x-3 items-center">
                    <img src={TSales} alt="Sales Image" />
                    <p className="font-bold">Total Sales</p>
                  </div>
                  {/* <p className="text-xs">Last 7 days</p> */}
                  <p className="flex items-baseline text-2xl font-bold">
                    {stats.totalSales.current_period.total_units}{" "}
                    <span className="text-xs mr-2">Qty</span>
                    <span className="text-sm px-2 py-1 flex gap-1 items-center rounded-3xl bg-white text-black">
                      <BsArrowUp className="font-bold" />
                      {stats.totalSales.changes.unit_percentage_change}%
                    </span>
                  </p>
                  <p className="text-xs">
                    {/* Previous 7 days <span className="">(+ 25k)</span> */}
                    {stats.totalSales.period.description}{" "}
                  </p>
                </div>
              </div>

              <div className="bg-lightBlue rounded-lg p-2 text-white">
                <div className="flex flex-col gap-y-1 border rounded-lg border-white p-2">
                  <div className="flex mb-2 gap-x-3 items-center">
                    <img src={TUser} alt="DB Image" />
                    <p className="flex gap-4">
                      <span>Total Users</span>
                      <span>
                        {stats.totalUsers.data.reduce(
                          (sum, obj) => sum + Number(obj.count),
                          0
                        )}
                      </span>
                    </p>
                    {/* <p className="font-bold">Total Users</p> */}
                  </div>
                  {/* <p className="text-xs">Last 7 days</p> */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {stats.totalUsers.data.map((item, index) => (
                      <p className="flex gap-4" key={index}>
                        <span className="capitalize">{item.user_type}</span>
                        <span>{item.count}</span>
                      </p>
                    ))}
                    {/* <span className="text-sm px-2 py-1 flex gap-1 items-center rounded-3xl bg-white text-green-500">
                      <BsArrowUp className="font-bold" />
                      10.4%
                    </span> */}
                  </div>

                  <p className="text-xs">
                    {stats.totalUsers.period.description}{" "}
                    {/* Previous 7 days{" "}
                    <span className="text-green-500">( + N200k)</span> */}
                  </p>
                </div>
              </div>
            </section>
            {/* Top selling products */}
            <section
              id="top-selling-product"
              className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between text-darkBlue gap-10"
            >
              <div className="flex flex-col gap-x-6">
                <div className="flex gap-6 justify-between mb-4">
                  <h2 className="md:text-xl font-bold text-darkBlue">
                    Top Selling Products
                  </h2>{" "}
                  <span className="bg-defaultOrange rounded-lg p-1 px-2 text-white">
                    {stats.topSellingProducts.period.description}
                  </span>
                </div>

                {stats.topSellingProducts.data
                  .slice(0, 3)
                  .map((item: any, index: number) => (
                    <div key={index} className="mb-4">
                      <p className="flex gap-1 items-center text-[30px] font-bold text-darkBlue">
                        {item.total_qty}
                        <span className="text-base font-normal">sold</span>
                      </p>
                      <p className="flex justify-between">
                        <span>{item.product.name}</span>{" "}
                        <span className="text-darkBlue font-semibold">
                          {index + 1}st
                        </span>
                      </p>
                      <ProgressUI
                        rangeColor={colors[index]}
                        rangePercent="100%"
                        height="8px"
                        rounded="24px"
                        wholeColor="#e5e7eb"
                      />
                    </div>
                  ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.topSellingProducts.data
                  .slice(0, 4)
                  .map((item: any, index: number) => (
                    <div key={index} className="flex flex-col gap-3">
                      <img
                        src={item.product.media?.[0] || DefaultImg}
                        className="w-full md:w-[123px] h-fit md:h-[77px]"
                        alt={`${item.product.name}`}
                      />
                      <p>{item.product.name}</p>
                      <p className="text-defaultOrange font-semibold">
                        {item.product.weight || "N/A"}kg
                      </p>
                    </div>
                  ))}
              </div>

              <div className=" flex flex-col gap-4 md:gap-[53px] items-center justify-center md:justify-between">
                <div className="text-center">
                  <p className="text-darkBlue font-semibold text-[18px]">
                    Total Direct Sales
                  </p>
                  <p className="text-[70px] font-bold text-defaultOrange">
                    {stats.totalSales.current_period.direct_sales_units}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-darkBlue font-semibold text-[18px]">
                    Total Auction Sales
                  </p>
                  <p className="text-[70px] font-bold text-lightBlue">
                    {stats.totalSales.current_period.auction_sales_units}
                  </p>
                </div>
              </div>
            </section>

            {/* Active Bids */}

            <section
              id="active-bids"
              className="bg-white shadow-md rounded-lg p-6 my-5"
            >
              <div className="flex text-darkBlue justify-between items-center">
                <h2 className="md:text-2xl  font-bold">Active Bids</h2>
              </div>

              {/* Filters & Search Bar */}
              <div className="">
                <FilterGroup
                  filters={filters}
                  onChange={(updated) => {
                    setFilters((prev) => ({ ...prev, ...updated }));
                  }}
                  selects={[
                    {
                      name: "category",
                      placeholder: "Category",
                      options: [
                        { label: "House", value: "HOUSE" },
                        { label: "Car", value: "CAR" },
                        { label: "Land", value: "LAND" },
                      ],
                    },
                  ]}
                  extraFilters={
                    <>
                      <StatusSelect
                        options={[
                          { label: "Sold", value: "sold" },
                          { label: "Pending", value: "pending" },
                        ]}
                        onChange={(value) => {
                          setFilters((prev) => ({ ...prev, status: value }));
                        }}
                        value={filters.status}
                      />
                      {/* <DateSelect
                        onChange={(date) => {
                          setFilters((prev) => ({ ...prev, date }));
                        }}
                        value={filters.date}
                      /> */}
                    </>
                  }
                  searchNode={
                    <TableSearchInput
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      placeholder="Search orders"
                    />
                  }
                />
              </div>
              {/* table */}
              <div className="mt-0 h-[500px] flex flex-1 w-full overflow-hidden">
                <MuiTableComponent
                  columns={BidsColumns}
                  currentPage={bidData.pagination.page}
                  showCheckbox={false}
                  rows={bidData.rows}
                  rowHeight={60}
                  pageSize={10}
                  onPageChange={(model) => {
                    setBidData((prev) => ({
                      ...prev,
                      pagination: {
                        page: model.page,
                        pageSize: model.pageSize,
                      },
                    }));
                  }}
                  headerStyle={{
                    backgroundColor: "#f3f4f6",
                    fontWeight: "bold",
                  }}
                />
              </div>
            </section>

            {/* Income */}
            <section
              id="income-graph"
              className="p-3.5 bg-white shadow-md rounded-lg mt-7"
            >
              <div className="flex w-full justify-between gap-1 items-center">
                <div className="flex md:gap-14 items-center">
                  <h5 className="md:text-lg font-bold text-[#1E1A1C]">
                    Income
                  </h5>
                  <div className="mt-2 hidden md:flex flex-row gap-3 md:gap-x-8 items-center">
                    <p className="text-xs flex flex-col font-semibold text-darkBlue">
                      Total income:{" "}
                      <span className="md:text-lg text-defaultOrange">
                        {formatAmountToNaira(stats.totalRevenue.total_revenue)}
                      </span>
                    </p>
                    <p className="text-xs flex flex-col font-semibold text-darkBlue">
                      Total expenditure:{" "}
                      <span className="md:text-lg text-defaultOrange">
                        ₦0.00
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-x-14 items-center">
                  <div className="flex flex-col md:flex-row gap-3">
                    <p className="flex gap-2 items-center">
                      <span className="w-1 h-1 md:w-3 md:h-3 rounded-full bg-[#0B0C52]"></span>
                      Income
                    </p>
                    <p className="flex gap-1 md:gap-2 items-center">
                      {" "}
                      <span className="w-1 h-1 md:w-3 md:h-3  rounded-full bg-defaultOrange"></span>
                      Expenses
                    </p>
                  </div>
                  <p className="text-sm rounded-lg outline-none p-2.5 bg-defaultOrange text-white border border-primaryBorder">
                    {stats.monthlyReport.period.description}
                  </p>
                </div>
              </div>

              <div className="w-full h-[15rem] mt-5">
                <LineChartComponent
                  chartData={stats.monthlyReport.data}
                  xKey="month"
                  lines={[
                    // {
                    //   name: "expenditure",
                    //   type: "monotone",
                    //   color: "#e65800",
                    //   lineWidth: 2,
                    //   dotSize: 7,
                    //   dotShow: false,
                    // },
                    {
                      name: "total_revenue",
                      type: "monotone",
                      color: "#0B0C52",
                      lineWidth: 2,
                      dotSize: 7,
                      dotShow: false,
                    },
                  ]}
                  tooltipBgColor="#E65800"
                  tooltipTextColor="#fff"
                />
              </div>
            </section>

            {/* sales order and top selling location */}

            <section
              id="sales-order"
              className="mt-7 flex flex-col md:flex-row gap-x-10"
            >
              {/* <div className="basis-[50%] rounded-lg bg-white">
                <div className="flex justify-between rounded-t-lg px-2.5 ">
                  <h5 className="font-bold py-4">Sales Order</h5>
                  <select className="bg-transparent outline-none text-sm">
                    <option>This month</option>
                  </select>
                </div>

                <div className="w-full h-[10rem] overflow-y-auto custom-scrollbar table-head-center">
                  <CompactTable
                    columns={salesColumnSellerDashoard}
                    data={{ nodes: salesTableSellerDashboard() }}
                    theme={tableTheme}
                    layout={{ fixedHeader: true }}
                  />
                </div>
              </div> */}

              <div className="w-full rounded-lg p-5 bg-white">
                <div className="flex justify-between rounded-t-lg ">
                  <h5 className="font-bold">Top Selling Locations</h5>
                </div>
                <ResponsiveContainer width="100%" height={230}>
                  <PieChart>
                    <Legend
                      align="left"
                      layout="vertical"
                      verticalAlign="middle"
                      content={renderLegend2}
                    />
                    <Tooltip wrapperClassName="text-xs" />

                    <Pie
                      data={data02}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={isMobile ? 50 : 80}
                      outerRadius={isMobile ? 70 : 110}
                      cornerRadius={5} // rounded edges
                      stroke="#ffffff" // Optional: white space between arcs
                      strokeWidth={2} // Thickness of the gap
                      fill="#121488"
                      labelLine={false}
                      label={({ cx, cy }) => (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="40"
                          className="font-semibold  fill-[#000000]"
                        >
                          30
                          <tspan
                            x={cx}
                            dy="1.7em" // moves down below the number
                            fontSize="20"
                            fontWeight="normal"
                          >
                            Days
                          </tspan>
                        </text>
                      )}
                    >
                      {data02.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/*sales order summary*/}

            {/* <section
              id="sales-order-summary"
              className="mt-7 rounded-lg border border-primaryBorder"
            >
              <div className="flex justify-between rounded-t-lg px-2.5 bg-[#F0F0F0]">
                <h5 className="font-medium py-2.5">
                  Sales Order Summary (in Naira)
                </h5>
                <p className="bg-transparent outline-none my-3 text-sm">
                  {stats?.totalSales.period.description}
                </p>
         
              </div>

              <div className="w-full h-[20rem] bg-white gap-x-5 flex flex-col md:flex-row">
                <div className="flex-1">
                  <LineChartComponent
                    chartData={generateLineChartData2SellerDashboard()}
                    xKey="xAxis"
                    lines={[
                      {
                        name: "sales",
                        color: "#e65800",
                        lineWidth: 1,
                        dotSize: 7,
                        dotShow: false,
                      },
                    ]}
                  />
                </div>
                <div className="basis-[22%] flex flex-col gap-y-3 px-5 py-5 border-l border-l-primaryBorder">
                  <p className="w-full font-medium">Total Sales</p>
                  <div className="rounded-[4px] pr-8 pl-3 py-2 w-fit border border-primaryBorder border-l-[5px] border-l-defaultOrange">
                    <p className="text-sm">Direct Sales</p>
                    <p className="text-sm">110,000</p>
                  </div>
                </div>
              </div>
            </section> */}
          </>
        )}
      </main>
    </div>
  );
}
