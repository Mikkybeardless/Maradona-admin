import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDateRange } from "../../hooks/DateRangeContex";
import reportService from "../../api/services/report.service";
import { formatAmountToNaira } from "../../helper/helperFunctions";

interface IFinancialSummary {
  direct_sales_revenue: number;
  auction_sales_revenue: string;
  total_sales_revenue: number;
  promotion_income: string;
  platform_commission: number;
  total_admin_revenue: number;
  total_admin_income: number;
  promotion_income_breakdown: {
    type: string;
    amount: string;
  }[];
  period: {
    start: string;
    end: string;
    description: string;
  };
}
const FinancialSummary = () => {
  const navigate = useNavigate();
  const handleToFinancialTracking = () => {
    navigate("/admin/reports/financial-tracking");
  };
  const [financialSummaryData, setFinancialSummaryData] =
    useState<IFinancialSummary>();

  const { debouncedRange } = useDateRange();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getFinancialSummary({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setFinancialSummaryData(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);

  return (
    <div className="bg-white mt-6 rounded-2xl w-full">
      <div className="bg-[#04979E] flex justify-between py-4 px-3 md:px-7 rounded-t-2xl items-center">
        <p className="font-bold text-sm md:text-base text-white">
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
          <p className="text-sm font-normal text-[#040421] mb-3 flex items-center gap-1">
            Direct Sale Revenue:
          </p>
          <p className="text-sm font-normal text-[#040421] mb-3 flex items-center gap-1">
            Auction Sale Revenue:
          </p>
          <p className="text-sm font-normal text-[#040421] mb-3 flex items-center gap-1">
            Commission to Platform
            <MdInfo size={14} color="#838383" />
          </p>
          <p className="text-sm font-normal text-[#040421] mb-3 flex items-center gap-1">
            Total Sales Revenue
          </p>
          <p className="text-sm font-normal text-[#040421] mb-3 flex items-center gap-1">
            Total Admin Revenue
          </p>
          <p className="text-sm font-normal text-[#040421] mb-3 flex items-center gap-1">
            Total Admin Income
          </p>

          {(financialSummaryData?.promotion_income_breakdown?.length ?? 0) >
          0 ? (
            financialSummaryData?.promotion_income_breakdown?.map(
              (item, index) => (
                <p
                  key={index}
                  className="text-sm font-normal text-[#040421] mb-3 flex items-center gap-1"
                >
                  {item.type ?? "-"}
                </p>
              )
            )
          ) : (
            <></>
          )}
        </div>

        <div className="text-right">
          <p className="text-sm font-normal text-[#585858] mb-3">
            {financialSummaryData
              ? formatAmountToNaira(
                  Number(financialSummaryData?.direct_sales_revenue)
                )
              : "-"}
          </p>
          <p className="text-sm font-normal text-[#585858] mb-3">
            {financialSummaryData
              ? formatAmountToNaira(
                  Number(financialSummaryData?.auction_sales_revenue)
                )
              : "-"}
          </p>
          <p className="text-sm font-normal text-[#585858] mb-3">
            {financialSummaryData
              ? formatAmountToNaira(financialSummaryData?.platform_commission)
              : "-"}
          </p>
          <p className="text-sm font-normal text-[#585858] mb-3">
            {financialSummaryData
              ? formatAmountToNaira(
                  Number(financialSummaryData?.total_sales_revenue)
                )
              : "-"}
          </p>
          <p className="text-sm font-normal text-[#585858] mb-3">
            {financialSummaryData?.total_admin_revenue ?? "-"}%
          </p>
          <p className="text-sm font-normal text-[#585858] mb-3">
            {financialSummaryData?.total_admin_income ?? "-"}%
          </p>

          {financialSummaryData?.promotion_income_breakdown?.length ? (
            financialSummaryData?.promotion_income_breakdown?.map(
              (item, index) => (
                <p
                  className="text-sm font-normal text-[#585858] mb-3"
                  key={index}
                >
                  {formatAmountToNaira(Number(item.amount ?? 0))}
                </p>
              )
            )
          ) : (
            <p className="text-sm font-normal text-[#585858] mb-3">-</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
