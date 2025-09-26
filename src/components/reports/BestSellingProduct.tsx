import { useEffect, useState } from "react";
import { VscCircleFilled } from "react-icons/vsc";
import { useDateRange } from "../../hooks/DateRangeContex";
import reportService from "../../api/services/report.service";
import ProgressUI from "./ProgressUI";

interface IBestSellingProduct {
  categories: {
    category: string;
    revenue: string;
    units_sold: number;
    percentage: number;
  }[];
  total_revenue: number;
  period: {
    start: string;
    end: string;
    description: string;
  };
}

interface ProgressColors {
  fillColor: string;
  wholeColor: string;
}

const ProgressUiColors: ProgressColors[] = [
  {
    fillColor: "#FD6100",
    wholeColor: "#FD610040",
  },
  {
    fillColor: "#14199C",
    wholeColor: "#14199C40",
  },
  {
    fillColor: "#04979E",
    wholeColor: "#04979E40",
  },
];

const BestSellingProducts = () => {
  const [bestSellingProduct, setBestSellingProduct] =
    useState<IBestSellingProduct>();

  const { debouncedRange } = useDateRange();
  useState<IBestSellingProduct>();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      reportService.getCategoryPerformance({
        start_date: debouncedRange.startDate,
        end_date: debouncedRange.endDate,
      }),
    ])
      .then(([overviewRes]) => {
        if (!mounted) return;
        setBestSellingProduct(overviewRes.data ?? null);
      })
      .catch(() => {})
      .finally(() => {});

    return () => {
      mounted = false;
    };
  }, [debouncedRange.startDate, debouncedRange.endDate]);
  // const uniqueProducts = bestSellingProducts?.data.filter(
  // 	(item, index, self) =>
  // 		index ===
  // 		self.findIndex(
  // 			(p) => p.product.category_id === item.product.category_id
  // 		)
  // );
  return (
    <div className="bg-white py-5 px-5 mt-6 rounded-2xl flex-1">
      <p className="font-bold text-sm mb-5">Top Performing Categories</p>

      {bestSellingProduct?.categories.length ? (
        bestSellingProduct?.categories.map((product, index) => {
          return (
            <div className="mb-3" key={index}>
              <div className="flex items-center mb-2">
                <VscCircleFilled
                  size={10}
                  color={ProgressUiColors[index].fillColor}
                />
                <div className="ml-2">
                  <p className="font-normal text-sm sm:text-base text-[#5C4D58]">
                    {product.category}:{" "}
                    <span
                      className="font-bold"
                      style={{
                        color: ProgressUiColors[index].fillColor,
                      }}
                    >
                      {product.percentage}%
                    </span>
                  </p>
                  <p className="font-normal text-xs text-[#5C4D58]">
                    {product.units_sold} units sold
                  </p>
                </div>
              </div>
              <ProgressUI
                rangeColor={ProgressUiColors[index].fillColor}
                rangePercent={String(product.percentage)}
                wholeColor={ProgressUiColors[index].wholeColor}
                wholePercent={String(100 - product.percentage)}
              />
            </div>
          );
        })
      ) : (
        <div className="text-center">No Products yet</div>
      )}

      {/* <div className="mb-3">
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
                    wholePercent={"76%"}
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
                    wholePercent={"82%"}
                />
            </div> */}
    </div>
  );
};

export default BestSellingProducts;
