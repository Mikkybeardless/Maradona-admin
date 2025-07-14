import DashboardSearchBar from "../components/DashboardSearchBar";
import { GridColDef } from "@mui/x-data-grid";
import { FaPlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { generateRandomNumber } from "../helper/helperFunctions";
import { Link, useLocation } from "react-router-dom";
import PromoAd from "../components/Promo&Ad";

const promosRow = () => {
  const data = Array.from({ length: 15 }, (_, index) => index + 1);
  return data.map((num) => {
    return {
      id: num,
      PromotionName: "Black friday",
      code: "BF2023",
      type: "Percentage",
      start: new Date(),
      end: new Date(),
      status: `${num % 2 === 0 ? "Active" : "Inactive"}`,
      metrics: "Usage: 50, Total Discount: ₦100,000",
    };
  });
};
const adsRow = () => {
  const data = Array.from({ length: 15 }, (_, index) => index + 1);
  return data.map((num) => {
    return {
      id: num,
      AdsName: "Black friday",
      code: "BF2023",
      type: "Percentage",
      start: new Date(),
      end: new Date(),
      status: `${num % 2 === 0 ? "Active" : "Inactive"}`,
      metrics: "Usage: 50, Total Discount: ₦100,000",
    };
  });
};

const promoColumns: GridColDef[] = [
  {
    field: "PromotionName",
    headerName: "Promotion Name",
    flex: 1,
    sortable: false,
  },
  {
    field: "code",
    headerName: "Code",
    flex: 0.5,
    sortable: false,
  },
  {
    field: "type",
    headerName: "Discount type",
    flex: 1,
    sortable: false,
  },
  {
    field: "start",
    headerName: "Start Date",
    type: "date",
    flex: 0.7,
  },
  {
    field: "end",
    headerName: "End Date",
    type: "date",
    flex: 0.7,
  },
  {
    field: "metrics",
    headerName: "Performance Metrics",
    flex: 1,
    cellClassName: "text-xs",
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: ({ value }) => {
      return (
        <span
          className={`${
            value === "Active" ? "text-[#008000]" : "text-[#DC1313]"
          }`}
        >
          {value}
        </span>
      );
    },
    flex: 0.6,
    sortable: false,
  },
];

const adsColumns: GridColDef[] = [
  {
    field: "AdsName",
    headerName: "Ads Name",
    flex: 1,
    sortable: false,
  },
  {
    field: "code",
    headerName: "Code",
    flex: 0.5,
    sortable: false,
  },
  {
    field: "type",
    headerName: "Discount type",
    flex: 1,
    sortable: false,
  },
  {
    field: "start",
    headerName: "Start Date",
    type: "date",
    flex: 0.7,
  },
  {
    field: "end",
    headerName: "End Date",
    type: "date",
    flex: 0.7,
  },
  {
    field: "metrics",
    headerName: "Performance Metrics",
    flex: 1,
    cellClassName: "text-xs",
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: ({ value }) => {
      return (
        <span
          className={`${
            value === "Active" ? "text-[#008000]" : "text-[#DC1313]"
          }`}
        >
          {value}
        </span>
      );
    },
    flex: 0.6,
    sortable: false,
  },
];

function generateLineChartData() {
  let data = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const lineChartData = data.map((month) => {
    return {
      xAxis: month,
      revenue: generateRandomNumber(2000000, 1000000),
    };
  });
  return lineChartData;
}

export default function Promotions() {
  const [promotionModal, setPromotionModal] = useState(false);
  const promotionModalRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const promotionTypeFromLocation = location.state?.promotionType;
  const [promotionType, setPromotionType] = useState(
    promotionTypeFromLocation || "promotion"
  );

  useClickAway(promotionModalRef, () => {
    setPromotionModal(false);
  });

  function openPromotionModal() {
    setPromotionModal(true);
  }

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col  custom-scrollbar py-20">
      <div className="w-full py-5 fixed z-10 left-2 top-0 px-5 md:px-10 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mt-1 mb-10">
          <div className="w-fit flex gap-x-10 items-center mt-3 text-sm border-b border-b-primaryBorder">
            <button
              className={`${
                promotionType === "promotion"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                promotionType !== "promotion"
                  ? setPromotionType("promotion")
                  : null
              }
            >
              Promotions <span className="text-xs text-defaultOrange">10</span>
            </button>
            <button
              className={`${
                promotionType === "ads"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                promotionType !== "ads" ? setPromotionType("ads") : null
              }
            >
              Ads <span className="text-xs text-defaultOrange">23</span>
            </button>
          </div>
          <Link
            to={`/admin/promotions/add-${promotionType}`}
            className="rounded-lg capitalize flex items-center gap-x-2 px-2 md:px-5 py-2.5 text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            <FaPlus />
            New {promotionType}
          </Link>
        </div>
        {promotionType === "promotion" ? (
          <PromoAd
            pageTitle="promtion"
            columns={promoColumns}
            rows={promosRow()}
            lineChartData={generateLineChartData()}
          />
        ) : (
          <PromoAd
            pageTitle="ads"
            columns={adsColumns}
            rows={adsRow()}
            lineChartData={generateLineChartData()}
          />
        )}
      </div>
    </div>
  );
}
