import { Button } from "@mui/material";
import { useState } from "react";
import { DateRangeProvider } from "../hooks/DateRangeContex";
import DashboardSearchBar from "../components/DashboardSearchBar";
import DashboardSummary from "../components/reports/DashboardSummary";
import BestSellingProducts from "../components/reports/BestSellingProduct";
import SalesPerfformance from "../components/reports/SalePerformance";
import MonthlyRevenue from "../components/reports/MonthlyRevenue";
import FinancialSummary from "../components/reports/FinancialSummary";
import RevenueTracking from "../components/reports/RevenueTracking";
import ExpensesReport from "../components/reports/ExpensesReport";
import DateRangeSelector from "../components/common/DateRangeSelector";

// Move function to utils file later
// const formatRevenueTick = (value: number): string => {
// 	if (value >= 1_000_000_000) {
// 		return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "b";
// 	} else if (value >= 1_000_000) {
// 		return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
// 	} else if (value >= 1_000) {
// 		return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
// 	}
// 	return value.toString();
// };

export default function Reports2() {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <DateRangeProvider>
      <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10">
        <div className="w-full py-3.5 px-6 sm:px-12 md:px-24 border-b border-b-primaryBorder">
          <DashboardSearchBar />
        </div>

        <main className="bg-[#F2F2F2]">
          <div className="w-full px-4 md:px-14 mx-auto">
            <div className="flex justify-between items-center flex-wrap">
              <h1 className="text-xl md:text-3xl font-bold pt-10">Reports</h1>
              <DateRangeSelector />
            </div>
            {/* first */}
            <div className="flex flex-wrap gap-5 mb-5">
              <DashboardSummary />

              <BestSellingProducts />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-5 mb-6">
              {/* Left Section */}
              <SalesPerfformance />

              {/* Right Section */}
              {/* <SalesByLocation /> */}
            </div>

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

            {showMore === true && (
              <div>
                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-14">
                  {/* partOne  */}
                  <div className="flex-[3] w-full lg:w-3/5">
                    <MonthlyRevenue />

                    <FinancialSummary />
                  </div>

                  <div className="flex-[2] w-full lg:w-2/5">
                    {/* Revenue Tracking */}
                    <RevenueTracking />

                    {/* Expenses Report  */}
                    <ExpensesReport />
                  </div>
                </div>

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
                    View Less
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </DateRangeProvider>
  );
}
