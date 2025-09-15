import DashboardSearchBar from "../components/DashboardSearchBar";
import { useState } from "react";
import PromoAd from "../components/Promo&Ad";
import { PromoSetting } from "../components/promotion/settings";
import { promoColumns } from "../components/table/columns";

export default function Promotions() {
  const [promotionType, setPromotionType] = useState("promotion");
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
                promotionType === "settings"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                promotionType !== "settings"
                  ? setPromotionType("settings")
                  : null
              }
            >
              Settings
            </button>
          </div>
        </div>

        {promotionType === "promotion" ? (
          <PromoAd columns={promoColumns} />
        ) : (
          <div className="max-w-xl">
            <PromoSetting />
          </div>
        )}
      </div>
    </div>
  );
}
