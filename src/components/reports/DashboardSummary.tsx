import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { HiMiniChartBarSquare, HiTag } from "react-icons/hi2";
import { LuRefreshCw } from "react-icons/lu";
import { PiExport } from "react-icons/pi";
import { useDateRange } from "../../hooks/DateRangeContex";
import reportService from "../../api/services/report.service";
import { formatPrice } from "../../helper/helperFunctions";

interface IDashboardSummary {
  total_orders: number;
  total_revenue: number;
  best_selling_product: {
    name: string;
    type: string;
    units_sold: number;
  };
  period: {
    start: string;
    end: string;
    description: string;
  };
}

const DashboardSummary = () => {
  const [dashboardSummary, setDashboardSummary] = useState<IDashboardSummary>();

  const { debouncedRange } = useDateRange();
  useState<IDashboardSummary>();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getDashboardSummary({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setDashboardSummary(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);

  return (
    <div className="bg-white py-5 px-5 mt-6 rounded-2xl flex-[4] w-full md:w-auto">
      <div className="flex justify-between mb-5 flex-wrap">
        <p className="font-bold text-2xl text-[#05004E] mb-2 md:mb-0">
          Sales Summary
        </p>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            sx={{
              borderColor: "#C3D3E2",
              fontWeight: 500,
              fontSize: "14px",
              color: "#1137D0",
              gap: "5px",
              marginRight: "15px",
              textTransform: "capitalize",
            }}
          >
            <PiExport size={16} />
            Export
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#C3D3E2",
              fontWeight: 500,
              fontSize: "14px",
              color: "#1137D0",
              gap: "5px",
              textTransform: "capitalize",
            }}
          >
            <LuRefreshCw size={16} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex lg:justify-around flex-wrap gap-3">
        <div className="w-full sm:w-[230px] lg:w-1/4 h-[200px] bg-[#1137D033] pl-7 pt-4 rounded-[16px]">
          <div className="w-[40px] h-[40px] bg-[#1137D0] flex items-center justify-center rounded-full">
            <AiFillFileText size={24} color="#ffffff" />
          </div>
          <p className="font-semibold text-xl text-[#151D48] mt-4 mb-6">
            {dashboardSummary?.total_orders ?? "---"}
          </p>
          <p className="font-medium text-base text-[#425166]">Total Orders</p>
        </div>

        <div className="w-full sm:w-[230px] lg:w-1/4 h-[200px] bg-[#04979E33] p-7 pt-4 rounded-[16px]">
          <div className="flex justify-between w-full">
            <div className="w-[40px] h-[40px] bg-[#04979E] flex items-center justify-center rounded-full">
              <HiMiniChartBarSquare size={24} color="#ffffff" />
            </div>
            {/* <p className="font-semibold text-xs text-[#1137D0]">
							+8% Yesterday
						</p> */}
          </div>
          <p className="font-semibold text-xl text-[#151D48] mt-4 mb-6">
            {(dashboardSummary?.total_revenue &&
              formatPrice(dashboardSummary?.total_revenue)) ??
              "---"}
          </p>
          <p className="font-medium text-base text-[#425166]">Total Revenue</p>
        </div>

        <div className="w-full sm:w-[230px] lg:w-2/5 h-[200px] bg-[#FD610033] p-7 pt-4 rounded-[16px]">
          <div className="flex justify-between w-full">
            <div className="w-[40px] h-[40px] bg-[#FD6100] flex items-center justify-center rounded-full">
              <HiTag size={24} color="#ffffff" />
            </div>
            <p className="font-bold text-xs text-[#150A13]">
              Units sold:{" "}
              {dashboardSummary?.best_selling_product
                ? dashboardSummary?.best_selling_product.units_sold ?? "---"
                : "0"}
            </p>
          </div>

          <p className="font-semibold text-xl text-[#151D48] mt-4 mb-6">
            Best Selling Product
          </p>
          <p className="font-medium text-base text-[#425166]">
            {dashboardSummary?.best_selling_product
              ? dashboardSummary?.best_selling_product.name ?? "---"
              : "No bestseller yet"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;

// const [loading, setLoading] = useState(true);
// const [error, setError] = useState<unknown>(null);

// // setting data to be displayed
// const [monthlyRevenue, setMonthlyRevenue] = useState<TypeMonthlyRevenue[]>();
// const [totalOrders, setTotalOrders] = useState<TotalOrders>();
// const [totalSales, setTotalSales] = useState<TotalSales>();
// const [totalRevenue, setTotalRevenue] = useState<TotalRevenue>();
// const [bestSellingProducts, setBestSellingProducts] =
// 	useState<BestSellingProductResponseData>();

// const fetchData = React.useCallback(
// 	async () => {
// 		setLoading(true);
// 		// setProductData((prev) => ({ ...prev, loading: true }));
// 		try {
// 			const fetchMonthlyRevenue = await reportService.getMonthlyRevenue();
// 			const fetchTotalOrders = await reportService.getTotalOrders();
// 			const fetchTotalSales = await reportService.getTotalSales();
// 			const fetchTotalRevenue = await reportService.getTotalRevenue();
// 			const fetchDashboardSummary =
// 				await reportService.getBestSellingProduct();

// 			if (fetchMonthlyRevenue.status === 200) {
// 				setMonthlyRevenue(() => fetchMonthlyRevenue.data.data);
// 			}
// 			if (fetchTotalOrders.status === 200) {
// 				setTotalOrders(() => fetchTotalOrders.data);
// 			}
// 			if (fetchTotalSales.status === 200) {
// 				setTotalSales(() => fetchTotalSales.data.data);
// 			}
// 			if (fetchTotalRevenue.status === 200) {
// 				setTotalRevenue(() => fetchTotalRevenue.data);
// 			}
// 			if (fetchDashboardSummary.status === 200) {
// 				setBestSellingProducts(() => fetchDashboardSummary.data);
// 			}
// 		} catch (error) {
// 			console.error("Unexpected error:", error);
// 			// setError(new Error("An unexpected error occurred"));
// 		} finally {
// 			setLoading(false);
// 		}
// 	},
// 	[
// 		// JSON.stringify(filters),
// 		// JSON.stringify(productData.pagination),
// 		// debouncedSearchQuery,
// 	]
// );

// useEffect(() => {
// 	fetchData();
// }, [fetchData]);
