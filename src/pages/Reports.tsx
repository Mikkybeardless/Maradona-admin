import DashboardSearchBar from "../components/DashboardSearchBar";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
  generateBarChartData,
  generateLineChartData1SellerDashboard,
} from "../helper/generateFillData";
import LineChartComponent from "../components/LineChart";
import { VscCircleFilled } from "react-icons/vsc";
import { HiTag } from "react-icons/hi";
import { HiMiniChartBarSquare } from "react-icons/hi2";
import { AiFillFileText } from "react-icons/ai";
import { PiExport } from "react-icons/pi";
import { LuRefreshCw } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiCalendarEventLine } from "react-icons/ri";
import { MdInfo } from "react-icons/md";
import { ProgressUI } from "../components/common/progressUi";
import {
  buildCleanParams,
  formatAmountToNaira,
} from "../helper/helperFunctions";
import statsService from "../api/services/stats.service";
import { ProductLoadingSkeleton } from "../components/common/SquareLoadingState";

const data01 = [
  { name: "LAG", value: 40, color: "#FF00A5" },
  { name: "ABJ", value: 30, color: "#150C64" },
  { name: "PH", value: 20, color: "#000000" },
  { name: "Kano", value: 10, color: "#5F6260" },
];

export default function Reports() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
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
    topSellingProductsByType: {
      data: [],
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
  };
  const [stats, setStats] = useState<Stats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  //  const [isModalOpen, setIsModalOpen] = useState(false);
  //  const [customDate, setCustomDate] = useState({
  //    start_date: "",
  //    end_date: "",
  //  });
  const open = Boolean(anchorEl);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const handleToRevenuReport = () => {
    navigate("/admin/reports/revenue-report");
  };
  const handleToSaleReport = () => {
    navigate("/admin/reports/sale-report");
  };

  const handleToFinancialTracking = () => {
    navigate("/admin/reports/financial-tracking");
  };

  const handleToExpensesReport = () => {
    navigate("/admin/reports/expenses-report");
  };

  const fetchAllStats = async () => {
    setLoading(true);
    // const params = buildCleanParams(customDate).toString();
    try {
      const results = await Promise.allSettled([
        statsService.getTotalRevenue(),
        statsService.getTotalUsers(),
        statsService.getBestSellingProducts(),
        statsService.getTotalSales(),
        statsService.getMonthlyReport(),
        statsService.getTotalOrders(),
        statsService.getBestSellingTypes(),
      ]);

      const [
        revenueResult,
        usersResult,
        productsResult,
        salesResult,
        monthlyReportResult,
        totalOrdersResult,
        bestSellingTypesResult,
      ] = results;

      // Process successful results and log failed ones
      const newStats: Stats = { ...initialStats };
      const errors = [];

      if (revenueResult.status === "fulfilled") {
        newStats.totalRevenue = revenueResult.value.data;
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
      if (totalOrdersResult.status === "fulfilled") {
        newStats.totalOrders = totalOrdersResult.value.data;
      } else {
        console.error("Total orders fetch failed:", totalOrdersResult.reason);
        errors.push("Failed to load total orders");
      }

      if (bestSellingTypesResult.status === "fulfilled") {
        newStats.topSellingProductsByType = bestSellingTypesResult.value.data;
      } else {
        console.error(
          "Best selling types fetch failed:",
          bestSellingTypesResult.reason
        );
        errors.push("Failed to load best selling types");
      }

      console.log("Fetched stats:", newStats);
      setStats(newStats);

      // Set error if some failed, but still show partial data
      if (errors.length > 0) {
        setError(new Error(`Some data failed to load: ${errors.join(", ")}`));
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError(new Error("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllStats();
  }, []);

  const colors = ["#e65800", "#14199c", "#040421", "#22c55e"];

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col pt-10 custom-scrollbar pb-10">
      <div className="w-full py-3.5 px-5 md:pl-[260px] md:pr-[50px] fixed z-10 left-2 top-0 bg-white border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <main className="px-5 w-full mt-4 flex flex-col gap-y-5 flex-1">
        {/* Sales Summary */}
        {loading ? (
          <div className="flex flex-col mt-5">
            <div className="grid w-full grid-cols-1 bg-white p-6 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductLoadingSkeleton key={index} />
              ))}
            </div>
            <div className="w-full flex p-6 gap-5 bg-white ">
              <div className="basis-[60%]">
                <ProductLoadingSkeleton />
              </div>
              <div className="basis-[40%]">
                <ProductLoadingSkeleton />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500">
            {(error as Error)?.message ?? "An error occurred"}
          </div>
        ) : (
          <>
            <section id="sales-summary" className="flex flex-wrap gap-5 mb-5">
              <div className="bg-white py-5 px-5 mt-6 rounded-3xl flex-[3] w-full md:w-auto">
                <div className="flex justify-between mb-5 flex-wrap">
                  <h4 className="font-bold text-3xl text-[#05004E] mb-2 md:mb-0">
                    Sales Summary
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#FD6100",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#FD6100",
                        gap: "5px",
                        marginRight: "15px",
                        textTransform: "capitalize",
                      }}
                    >
                      <PiExport size={16} />
                      Export
                    </Button>
                    <Button
                      onClick={fetchAllStats}
                      variant="outlined"
                      sx={{
                        borderColor: "#FD6100",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#FD6100",
                        gap: "5px",
                        textTransform: "capitalize",
                      }}
                    >
                      <LuRefreshCw size={16} />
                      Refresh
                    </Button>
                  </div>
                </div>

                <div className="flex  flex-col md:flex-row justify-between gap-3">
                  <div className="w-full md:min-w-[210px] h-[184px] bg-[#1137D033] pl-5 pt-4 rounded-[16px]">
                    <div className="flex justify-end">
                      <p className="font-semibold text-xs text-[#1137D0] mr-2">
                        {stats.totalOrders.period.description}
                      </p>
                    </div>
                    <div className="w-[40px] h-[40px] bg-[#1137D0] flex items-center justify-center rounded-full">
                      <AiFillFileText size={24} color="#ffffff" />
                    </div>
                    <p className="font-semibold text-2xl text-[#151D48] my-4">
                      {stats.totalOrders.total_orders}
                    </p>
                    <p className="font-medium text-base text-[#425166]">
                      Total Orders
                    </p>
                    <div className="flex gap-3 mt-1 items-center">
                      <p className="flex items-center gap-3 text-xs">
                        <span>Direct sale</span>
                        <span>{stats.totalOrders.direct_sales_orders}</span>
                      </p>
                      <p className="text-xs flex items-center gap-3">
                        <span>Auction sale</span>
                        <span>{stats.totalOrders.auction_sales_orders}</span>
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:min-w-[210px] h-[184px] bg-[#04979E33] pl-5 p-2 pt-4 rounded-[16px]">
                    <div className="flex justify-between w-full">
                      <div className="w-[40px] h-[40px] bg-[#04979E] flex items-center justify-center rounded-full">
                        <HiMiniChartBarSquare size={24} color="#ffffff" />
                      </div>
                      <p className="font-semibold text-xs text-[#1137D0]">
                        {stats.totalSales.changes.unit_percentage_change}%{" "}
                        {stats.totalRevenue.period.description}
                      </p>
                    </div>
                    <p className="font-semibold text-2xl text-[#151D48] my-4">
                      {formatAmountToNaira(stats.totalRevenue.total_revenue)}
                    </p>
                    <p className="font-medium text-base text-[#425166]">
                      Total Revenue
                    </p>
                    <div className="flex flex-col ">
                      <p className="flex items-center gap-3 text-xs">
                        <span>Direct sale</span>
                        <span>
                          {formatAmountToNaira(
                            stats.totalRevenue.direct_sales_revenue
                          )}
                        </span>
                      </p>
                      <p className="text-xs flex items-center gap-3">
                        <span>Auction sale</span>
                        <span>
                          {formatAmountToNaira(
                            Number(stats.totalRevenue.auction_sales_revenue)
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:min-w-[270px] h-[184px] bg-[#FD610033] pl-5 p-2 pt-4 rounded-[16px]">
                    <div className="flex justify-between w-full">
                      <div className="w-[40px] h-[40px] bg-[#FD6100] flex items-center justify-center rounded-full">
                        <HiTag size={24} color="#ffffff" />
                      </div>

                      <div className="flex flex-col items-center">
                        <p className="font-bold text-sm text-[#150A13]">
                          Total units sold:{" "}
                          {stats.topSellingProducts.data[0]?.total_qty}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-2xl text-[#151D48] mt-4 mb-4">
                      Best Selling Product
                    </p>
                    <p className="font-medium text-base text-[#425166]">
                      {stats.topSellingProducts.data[0]?.product.name}
                    </p>
                    <div className="flex gap-3 mt-1 items-center">
                      <p className="flex items-center gap-3 text-xs">
                        <span>Direct sale</span>
                        <span>
                          {stats.topSellingProducts.data[0]?.direct_sales_qty}
                        </span>
                      </p>
                      <p className="text-xs flex items-center gap-3">
                        <span>Auction sale</span>
                        <span>
                          {stats.topSellingProducts.data[0]?.auction_sales_qty}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white py-5 px-5 mt-6 rounded-3xl flex-1">
                <p className="font-bold  mb-5">Top Performing Categories</p>

                {stats.topSellingProductsByType.data
                  .slice(0, 3)
                  .map((item: TopSellingByType, index: number) => (
                    <div key={index} className="mb-3">
                      <div className="flex items-center mb-2">
                        <VscCircleFilled size={10} color="#FD6100" />
                        <div className="ml-2">
                          <p className="font-normal text-sm sm:text-base text-[#5C4D58]">
                            {item.product_type}:{" "}
                            <span className="font-bold text-[#E65800]">
                              {item.growth_percentage | 100}%
                            </span>
                          </p>
                          <p className="font-normal text-xs text-[#5C4D58]">
                            {item.total_qty} units sold
                          </p>
                        </div>
                      </div>
                      <ProgressUI
                        rangeColor={colors[index]}
                        rangePercent={`100%`}
                        wholeColor={`#e5e7eb`}
                      />
                    </div>
                  ))}
                {/* <div className="mb-3">
                  <div className="flex items-center mb-2">
                    <VscCircleFilled size={10} color="#FD6100" />
                    <div className="ml-2">
                      <p className="font-normal text-sm sm:text-base text-[#5C4D58]">
                        Cars:{" "}
                        <span className="font-bold text-[#E65800]">64%</span>
                      </p>
                      <p className="font-normal text-xs text-[#5C4D58]">
                        800 units sold
                      </p>
                    </div>
                  </div>
                  <ProgressUI
                    rangeColor={"#FD6100"}
                    rangePercent={"64%"}
                    wholeColor={"#FD610040"}
                  />
                </div>

                <div className="mb-3">
                  <div className="flex items-center mb-2">
                    <VscCircleFilled size={10} color="#14199C" />
                    <div className="ml-2">
                      <p className="font-normal text-sm sm:text-base text-[#5C4D58]">
                        Houses:{" "}
                        <span className="font-bold text-[#14199C]">24%</span>
                      </p>
                      <p className="font-normal text-xs text-[#5C4D58]">
                        300 units sold
                      </p>
                    </div>
                  </div>
                  <ProgressUI
                    rangeColor={"#14199C"}
                    rangePercent={"24%"}
                    wholeColor={"#14199C40"}
                  />
                </div>

                <div className="mb-3">
                  <div className="flex items-center mb-2">
                    <VscCircleFilled size={10} color="#04979E" />
                    <div className="ml-2">
                      <p className="font-normal text-sm sm:text-base text-[#5C4D58]">
                        Lands:{" "}
                        <span className="font-bold text-[#04979E]">12%</span>
                      </p>
                      <p className="font-normal text-xs text-[#5C4D58]">
                        150 units sold
                      </p>
                    </div>
                  </div>
                  <ProgressUI
                    rangeColor={"#04979E"}
                    rangePercent={"12%"}
                    wholeColor={"#04979E40"}
                  />
                </div> */}
              </div>
            </section>

            {/* Sales Performance and major sales by location pie chart */}
            <section
              id="sales-performance"
              className="w-full  flex flex-col md:flex-row gap-5"
            >
              <div className="w-full md:w-[65%] rounded-2xl shadow-sm bg-white p-4 ">
                <div className="flex flex-col md:flex-row justify-between mb-12">
                  <h4 className="font-bold text-base text-[#1E1A1C]">
                    Sales Performance
                  </h4>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#5C4D58",
                        borderColor: "#EAE6E9",
                        textTransform: "capitalize",
                      }}
                    >
                      Print
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#5C4D58",
                        borderColor: "#EAE6E9",
                        textTransform: "capitalize",
                      }}
                      onClick={handleToSaleReport}
                    >
                      View more
                    </Button>
                    <IconButton
                      onClick={handleClick}
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <RiCalendarEventLine size={24} color="#5C4D58" />
                    </IconButton>
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar />
                      </LocalizationProvider>
                    </MenuItem>
                  </Menu>
                </div>

                <div className="h-[250px] w-full reports-page">
                  <LineChartComponent
                    chartData={generateLineChartData1SellerDashboard()}
                    legend={false}
                    tickCount={6}
                    xKey="xAxis"
                    lines={[
                      {
                        name: "expenditure",
                        type: "monotone",
                        color: "#e65800",
                        lineWidth: 3,
                        dotSize: 7,
                        dotShow: false,
                      },
                      {
                        name: "income",
                        type: "monotone",
                        color: "#0B0C52",
                        lineWidth: 3,
                        dotSize: 7,
                        dotShow: false,
                      },
                    ]}
                    tooltipBgColor="#E65800"
                    tooltipTextColor="#fff"
                  />
                </div>
              </div>

              <div className="w-full md:w-[35%] bg-white  gap-y-3 rounded-2xl p-4 shadow-sm overflow-hidden">
                <h4 className="self-start font-semibold mb-8">
                  Major Sales by Location
                </h4>
                <div style={{ position: "relative", width: 200, height: 200 }}>
                  {/* Center Circle with Text */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 80,
                      height: 80,
                      background: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    30 DAYS
                  </div>

                  {/* Pie Chart */}
                  <PieChart width={200} height={200}>
                    <Tooltip wrapperClassName="text-xs" />
                    <Pie
                      data={data01}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      activeIndex={activeIndex ?? undefined}
                      activeShape={(props: any) => (
                        <Sector {...props} outerRadius={100} />
                      )}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      animationDuration={300} // Smooth transition
                      cornerRadius={10} // Rounded edges
                    >
                      {data01.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  {/* Legend */}
                  <div className="absolute right-[-50%] top-1/2 transform -translate-y-1/2 text-sm">
                    {data01.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        ></span>
                        <span className="font-medium">{entry.name}</span>
                        <span className="font-bold">{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* View More Button */}
            {showMore === false && (
              <div className="text-right mb-14">
                <Button
                  onClick={handleShowMore}
                  sx={{
                    color: "#FD6100",
                    fontWeight: 700,
                    fontSize: "18px",
                    textTransform: "capitalize",
                  }}
                >
                  View More
                </Button>
              </div>
            )}

            {/* showMore */}
            {showMore === true && (
              <section id="detailed-reports">
                <div className="flex flex-col lg:flex-row justify-between gap-4 ">
                  {/* partOne  */}
                  <div className="flex-[3] w-full lg:w-3/5">
                    <div className="bg-white py-9 px-7 mt-6 rounded-2xl w-full">
                      <div className="flex justify-between items-center mb-7">
                        <p className="font-bold text-base text-[#1E1A1C]">
                          Monthly Revenue
                        </p>
                        <Button
                          variant="outlined"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#5C4D58",
                            borderColor: "#5C4D58",
                            textTransform: "capitalize",
                          }}
                          onClick={handleToRevenuReport}
                        >
                          View more
                        </Button>
                      </div>
                      <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={generateBarChartData()}
                            barSize={15}
                            barCategoryGap="50%"
                          >
                            <XAxis dataKey="month" />
                            <YAxis
                              tickFormatter={(value) => `${value / 1000}k`}
                              domain={[0, "auto"]}
                            />
                            <Tooltip
                              formatter={(value) =>
                                typeof value === "number"
                                  ? `${value / 1000}k`
                                  : value
                              }
                            />
                            <Legend
                              content={() => {
                                return (
                                  <div className="flex justify-center items-center gap-x-1.5 pt-3">
                                    <span className="w-3 h-3 bg-[#0095FF] rounded-full "></span>{" "}
                                    <span>Online Sales</span>
                                  </div>
                                );
                              }}
                            />
                            <Bar dataKey="revenue" fill="#0095FF" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white mt-6 rounded-2xl w-full">
                      <div className="bg-[#04979E] flex justify-between py-4 px-5 md:px-7 rounded-t-2xl items-center">
                        <p className="font-bold text-base text-white">
                          Financial Summaries
                        </p>
                        <div>
                          <Button
                            variant="outlined"
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#ffffff",
                              borderColor: "#ffffff",
                              padding: "5px 8px",
                              marginRight: "10px",
                              textTransform: "capitalize",
                            }}
                          >
                            Print
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "#ffffff",
                              borderColor: "#ffffff",
                              padding: "5px 8px",
                              textTransform: "capitalize",
                            }}
                            onClick={handleToFinancialTracking}
                          >
                            View More
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 px-5 md:px-7 mt-5">
                        <div>
                          {[
                            "Gross Revenue:",
                            "Net Revenue:",
                            "Commission to Platform",
                            "Commission to Agents",
                            "Promotion to Cost",
                            "Returns and Refunds:",
                          ].map((item, index) => (
                            <p
                              key={index}
                              className="text-sm font-normal text-[#040421] mb-3 flex items-center gap-1"
                            >
                              {item}{" "}
                              {[
                                "Commission to Platform",
                                "Commission to Agents",
                              ].includes(item) && (
                                <MdInfo size={14} color="#838383" />
                              )}
                            </p>
                          ))}
                        </div>
                        <div className="text-right">
                          {[
                            "₦350,000,000",
                            "₦320,000,000",
                            "3.5%",
                            "10%",
                            "₦30,000,000",
                            "₦8,000,000 (100 returns)",
                          ].map((value, index) => (
                            <p
                              key={index}
                              className="text-sm font-normal text-[#585858] mb-3"
                            >
                              {value}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-[2] w-full lg:w-2/5">
                    {/* Revenue Tracking */}
                    <div className="">
                      {[
                        {
                          title: "Revenue Tracking",
                          bg: "#1137D0",
                          handler: handleToRevenuReport,
                          color: "#14199C",
                        },
                      ].map((section, index) => (
                        <div
                          key={index}
                          className="bg-white mt-6 rounded-2xl w-full pb-16"
                        >
                          <div
                            className={`bg-[${section.bg}] flex justify-between py-4 px-5 md:px-7 rounded-t-2xl items-center`}
                          >
                            <p className="font-bold text-base text-white">
                              {section.title}
                            </p>
                            <div>
                              <Button
                                variant="outlined"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  color: "white",
                                  borderColor: "white",
                                  padding: "5px 8px",
                                  marginRight: "10px",
                                  textTransform: "capitalize",
                                }}
                              >
                                Print
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  color: "white",
                                  borderColor: "white",
                                  padding: "5px 8px",
                                  textTransform: "capitalize",
                                }}
                                onClick={section.handler}
                              >
                                View More
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 px-5 md:px-7 mt-5">
                            <div>
                              <p
                                className={`text-sm font-bold text-[${section.color}] mb-3`}
                              >
                                Category
                              </p>
                              {["Cars", "Houses", "Lands"].map((item, i) => (
                                <p
                                  key={i}
                                  className="text-sm font-normal text-[#040421] mb-3"
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold text-[${section.color}] mb-3`}
                              >
                                Revenue
                              </p>
                              {[
                                "₦320,000,000",
                                "₦30,000,000",
                                "₦8,000,000",
                              ].map((item, i) => (
                                <p
                                  key={i}
                                  className="text-sm font-normal text-[#585858] mb-3"
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold text-[${section.color}] mb-3`}
                              >
                                Percentage
                              </p>
                              {["62.9%", "25.7%", "11.4%"].map((item, i) => (
                                <p
                                  key={i}
                                  className="text-sm font-normal text-[#040421] mb-3"
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expenses Report  */}
                    <div className="bg-white pb-2 rounded-2xl">
                      {[
                        {
                          title: "Expenses",
                          bg: "#FD6100",
                          handler: handleToExpensesReport,
                          color: "#FD6100",
                        },
                      ].map((section, index) => (
                        <div key={index} className=" mt-6  w-full pb-16">
                          <div
                            className={`bg-[${section.bg}] flex justify-between py-4 px-5 md:px-7 rounded-t-2xl items-center`}
                          >
                            <p className="font-bold text-base text-white">
                              {section.title}
                            </p>
                            <div>
                              <Button
                                variant="outlined"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  color: "white",
                                  borderColor: "white",
                                  padding: "5px 8px",
                                  marginRight: "10px",
                                  textTransform: "capitalize",
                                }}
                              >
                                Print
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  color: "white",
                                  borderColor: "white",
                                  padding: "5px 8px",
                                  textTransform: "capitalize",
                                }}
                                onClick={section.handler}
                              >
                                View More
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 px-5 md:px-7 mt-5 ">
                            <div>
                              <p
                                className={`text-sm font-bold text-[#FD6100] mb-3`}
                              >
                                Expense Type
                              </p>
                              {[
                                "Marketing",
                                "Logistics",
                                "Marketing",
                                "Marketing",
                              ].map((item, i) => (
                                <p
                                  key={i}
                                  className="text-sm font-normal text-secondaryTextColor mb-3"
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold text-[${section.color}] mb-3`}
                              >
                                Amount
                              </p>
                              {["N35,000", "N35,000", "N35,000", "N35,000"].map(
                                (item, i) => (
                                  <p
                                    key={i}
                                    className="text-sm font-normal text-secondaryTextColor mb-3"
                                  >
                                    {item}
                                  </p>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-right ">
                        <Button
                          onClick={handleShowMore}
                          sx={{
                            color: "#FD6100",
                            fontWeight: 700,
                            fontSize: "18px",
                            textTransform: "capitalize",
                          }}
                        >
                          View Less
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
