import { Button } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LineChartComponent from "../LineChart";
import { DateSelect } from "../common/dateSelect";
import { useDateRange } from "../../hooks/DateRangeContex";
import reportService from "../../api/services/report.service";
import { generateLineChartData1SellerDashboard } from "../../helper/generateFillData";

interface ISalesPerformanceChart {
  chart_data: {
    month: string;
    month_key: string;
    direct_sales_income: number;
    auction_sales_income: number;
    promotion_income: number;
    total_income: number;
    sales_income: number;
  }[];
  period: {
    start: string;
    end: string;
    description: string;
  };
}

const SalesPerfformance = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleToSaleReport = () => {
    navigate("/admin/reports/sale-report");
  };

  const [salesPerformanceData, setSalesPerformanceData] =
    useState<ISalesPerformanceChart>();

  const { debouncedRange } = useDateRange();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getSalesPerformanceChart({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setSalesPerformanceData(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);

  return (
    <div className="bg-white py-5 px-5 mt-6 rounded-2xl flex-1 md:flex-[3] w-full">
      <div className="flex flex-col md:flex-row justify-between mb-12">
        <p className="font-bold text-base text-[#1E1A1C]">Sales Performance</p>
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

          <DateSelect onChange={(newValue) => setDate(newValue)} value={date} />
        </div>
      </div>
      <div className="h-[250px] w-full reports-page">
        <LineChartComponent
          chartData={salesPerformanceData?.chart_data ?? []}
          xKey="month"
          yKey="total_income"
          lines={[
            {
              name: "direct_sales_income",
              type: "monotone",
              color: "#e65800",
              lineWidth: 3,
              dotSize: 7,
              dotShow: false,
            },
            {
              name: "auction_sales_income",
              type: "monotone",
              color: "#0B0C52",
              lineWidth: 3,
              dotSize: 7,
              dotShow: false,
            },
            {
              name: "promotion_income",
              type: "monotone",
              color: "#1137D0",
              lineWidth: 3,
              dotSize: 7,
              dotShow: false,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SalesPerfformance;
