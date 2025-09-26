import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDateRange } from "../../hooks/DateRangeContex";
import reportService from "../../api/services/report.service";

interface IMonthlySalesSummary {
  chart_data: (
    | {
        month: string;
        month_key: string;
        revenue: number;
        orders: number;
      }
    | {
        month: string;
        month_key: string;
        revenue: string;
        orders: number;
      }
  )[];
  period: {
    start: string;
    end: string;
    description: string;
  };
}

const MonthlyRevenue = () => {
  return (
    <div className="bg-white py-9 px-7 mt-6 rounded-2xl w-full">
      <div className="flex justify-between items-center mb-7">
        <p className="font-bold text-base text-[#1E1A1C]">Monthly Revenue</p>
      </div>
      <div className="w-full h-[300px]">
        <MonthlyRevenueChart />
      </div>
    </div>
  );
};

export default MonthlyRevenue;

const MonthlyRevenueChart = () => {
  const [monthlyRevenueData, setMonthlyRevenueData] =
    useState<IMonthlySalesSummary>();

  const { debouncedRange } = useDateRange();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getMonthlyRevenueChart({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setMonthlyRevenueData(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={monthlyRevenueData?.chart_data}
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
            typeof value === "number" ? `${value / 1000}k` : value
          }
        />
        <Legend
          content={() => {
            return (
              <div className="flex justify-center items-center gap-x-1.5 pt-3">
                <span className="w-3 h-3 bg-[#0095FF] rounded-full "></span>{" "}
                <span>Monthly Revenue</span>
              </div>
            );
          }}
        />
        <Bar dataKey="revenue" fill="#0095FF" />
      </BarChart>
    </ResponsiveContainer>
  );
};
