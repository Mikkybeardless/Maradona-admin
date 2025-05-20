import { Link } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import CustomDateInput from "../components/common/dateInput";
import { reFormatDate } from "../helper/helperFunctions";

interface FormData {
  promoName: string;
  targetedURL: string;
  budget: string;
  maxRedemption: string;
  userMaxRedemption: string;
  usageLimit: string;
  startDate: Date | null;
  endDate: Date | null;
}
export default function AddAdvert() {
  const [phase, setPhase] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    promoName: "",
    targetedURL: "",
    budget: "",
    maxRedemption: "",
    userMaxRedemption: "",
    usageLimit: "",
    startDate: null,
    endDate: null,
  });

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.currentTarget;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleStartDate = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      startDate: date,
    }));
  };

  const handleEndDate = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      endDate: date,
    }));
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7">
      <div className="w-full py-5 px-10 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>
      {phase === 1 ? (
        <div className=" px-5 md:px-10 w-full mt-4 flex flex-col gap-5 flex-1">
          <div className="flex gap-4 items-center justify-end">
            <button className="text-defaultOrange">Cancel</button>
            <button
              onClick={() => setPhase(2)}
              className="text-white rounded-lg px-4 py-2 bg-defaultOrange"
            >
              Next
            </button>
          </div>
          <div className="flex gap-x-4 items-center">
            <Link
              state={{ promotionType: "ads" }}
              to="/promotions"
              className="text-sm opacity-60"
            >
              Ads
            </Link>
            <FaChevronRight size={18} />
            <span className="text-sm"> Create Ads </span>
          </div>

          <h2 className="text-xl font-bold">Create Ads</h2>

          {/* form */}
          <form className="flex flex-col md:flex-row w-full gap-y-5 gap-x-10 pb-10">
            {/* left side */}
            <div className="w-full md:w-1/2 text-sm flex flex-col gap-5">
              <div className="flex flex-col text-[#111111] gap-2">
                <label htmlFor="promoName">Ad Headline</label>
                <input
                  type="text"
                  id="promoName"
                  value={formData.promoName}
                  onChange={handleFormChange}
                  placeholder="Type"
                  className="outline-none p-4 rounded-lg border border-[#B0B0B0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                <div className="flex flex-col gap-y-1  text-sm">
                  <CustomDateInput
                    label="Start Date:"
                    value={formData.startDate}
                    onChange={handleStartDate}
                    iconColor="text-blue-600"
                  />
                </div>
                <div className="flex flex-col gap-y-1 text-sm">
                  <CustomDateInput
                    label="End Date:"
                    value={formData.endDate}
                    onChange={handleEndDate}
                    iconColor="text-blue-600"
                  />
                </div>
                <div className="flex flex-col gap-y-1 text-sm">
                  <label htmlFor="budget" className="font-medium">
                    Budget:
                  </label>
                  <input
                    className="p-4 rounded-lg border border-[#B0B0B0]"
                    type="text"
                    id="budget"
                    value={formData.budget}
                    onChange={handleFormChange}
                    placeholder="Type"
                  />
                </div>
              </div>
              <div className="flex flex-col text-[#111111] gap-2">
                <label htmlFor="usageLimit">Usage Limit:</label>
                <input
                  type="text"
                  id="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleFormChange}
                  placeholder="Type"
                  className="outline-none p-4 rounded-lg border border-[#B0B0B0]"
                />
              </div>
            </div>

            {/* right side */}
            <div className="w-full md:w-1/2 flex flex-col text-sm gap-5">
              <div className="flex flex-col text-[#111111] gap-2">
                <label htmlFor="maxRedemption">Maximum Redemptions:</label>
                <input
                  type="text"
                  id="maxRedemption"
                  value={formData.maxRedemption}
                  onChange={handleFormChange}
                  placeholder="e.g 100 redemption per Ad"
                  className="outline-none p-4 rounded-lg border border-[#B0B0B0]"
                />
              </div>

              <div className="flex flex-col gap-y-1 ">
                <label htmlFor="userMaxRedemption" className="font-medium">
                  Maximum Redemption Per User:
                </label>
                <input
                  type="text"
                  id="userMaxRedemption"
                  value={formData.userMaxRedemption}
                  onChange={handleFormChange}
                  placeholder="e.g 100 redemption per Ad"
                  className="outline-none p-4 rounded-lg border border-[#B0B0B0]"
                />
              </div>

              <div className="flex flex-col text-[#111111] gap-2 text-sm">
                <label htmlFor="targetedURL" className="font-medium">
                  Targeted URL:
                </label>
                <input
                  type="text"
                  id="targetedURL"
                  value={formData.targetedURL}
                  onChange={handleFormChange}
                  placeholder="e.g https://"
                  className="outline-none p-4 rounded-lg border border-[#B0B0B0]"
                />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="px-10 w-full mt-4 flex flex-col gap-5 flex-1">
          <div className="flex gap-4 items-center justify-end">
            <button className="text-defaultOrange">Cancel</button>
            <button className="text-white rounded-lg px-4 py-2 bg-defaultOrange">
              Publish
            </button>
          </div>

          <div className="flex gap-x-4 items-center">
            <Link to="/promotions" className="text-sm opacity-60">
              Promotion
            </Link>
            <FaChevronRight size={18} />
            <button onClick={() => setPhase(1)} className="text-sm opacity-60">
              Create Ad
            </button>
            <FaChevronRight size={18} />
            <span className="text-sm">Summary </span>
          </div>

          <h2 className="text-3xl my-5 font-bold">Summary</h2>

          <div className="flex flex-col md:flex-row  w-full justify-between gap-10 pb-10">
            {/* left side */}
            <div className=" w-full flex flex-col gap-5 md:w-[40%]">
              <div className="flex flex-col text-[#111111] gap-2">
                <span>Ad Headline:</span>
                <span className="font-bold">{formData.promoName}</span>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                <div className="flex flex-col gap-y-1 text-sm">
                  <span>Start Date:</span>
                  <span className="font-bold">
                    {" "}
                    {formData.startDate && reFormatDate(formData.startDate)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-1 text-sm">
                  <span>End Date:</span>
                  <span className="font-bold">
                    {formData.endDate && reFormatDate(formData.endDate)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-[#111111] gap-2">
                <span>Budget:</span>
                <span className="font-bold">{formData.budget}</span>
              </div>
            </div>

            {/* right side */}
            <div className="w-full flex flex-col gap-5  md:w-[40%]">
              <div className="flex flex-col gap-y-1 text-sm">
                <span>Maximum Redeemer Per User:</span>
                <span className="font-bold">{formData.userMaxRedemption}</span>
              </div>

              <div className="flex flex-col text-[#111111] gap-2 text-sm">
                <span>Target URL</span>
                <span className="font-bold">{formData.targetedURL}</span>
              </div>

              <div className="flex flex-col text-[#111111] gap-2 text-sm">
                <span>Maximum Redemptions:</span>
                <span className="font-bold">{formData.maxRedemption}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
