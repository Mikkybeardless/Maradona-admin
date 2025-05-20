import { Link } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import CustomDateInput from "../components/common/dateInput";
import { reFormatDate } from "../helper/helperFunctions";

interface FormData {
  promoName: string;
  promoType: string;
  discountValue: string;
  promoDesc: string;
  productCategory: string;
  promoCode: string;
  usageLimit: string;
  productType: string;
  startDate: Date | null;
  endDate: Date | null;
}
export default function AddPromotion() {
  const [phase, setPhase] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    promoName: "",
    promoType: "",
    discountValue: "",
    promoDesc: "",
    productCategory: "",
    promoCode: "",
    usageLimit: "",
    productType: "",
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
        <div className="px-5 md:px-10 w-full mt-4 flex flex-col gap-5 flex-1">
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
            <Link to="/promotions" className="text-sm opacity-60">
              Promotion
            </Link>
            <FaChevronRight size={18} />
            <span className="text-sm"> Create promotion</span>
          </div>

          <h2 className="text-3xl font-bold">Create Promotion</h2>

          {/* form */}
          <form className="flex flex-col md:flex-row w-full text-[#111111] text-sm gap-10 pb-10">
            {/* left side */}
            <div className="w-full md:w-1/2 flex flex-col text-sm gap-5">
              <div className="flex flex-col  gap-2">
                <label htmlFor="promoName">Promotion Name:</label>
                <input
                  type="text"
                  value={formData.promoName}
                  onChange={handleFormChange}
                  id="promoName"
                  placeholder="Type"
                  className="outline-none p-4 rounded-lg border border-[#B0B0B0]"
                />
              </div>

              <div className="flex flex-col text-[#111111] gap-2 text-sm">
                <label className="font-medium">Promotion Type:</label>
                <select
                  value={formData.promoType}
                  id="promoType"
                  onChange={handleFormChange}
                  className="p-4 rounded-lg border border-[#B0B0B0]"
                >
                  <option>Select</option>
                  <option value="Car">Car</option>
                  <option value="House">House</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                <div className="flex flex-col gap-y-1 text-sm">
                  <CustomDateInput
                    label="Start Date:"
                    onChange={handleStartDate}
                    iconColor="text-defaultOrange"
                    value={formData.startDate}
                  />
                </div>
                <div className="flex flex-col gap-y-1 text-sm">
                  <CustomDateInput
                    label="End Date:"
                    onChange={handleEndDate}
                    iconColor="text-defaultOrange"
                    value={formData.endDate}
                  />
                </div>
                <div className="flex flex-col gap-y-1 text-sm">
                  <label className="font-medium">Promo Code:</label>
                  <input
                    className="p-4 rounded-lg border border-[#B0B0B0]"
                    type="text"
                    id="promoCode"
                    onChange={handleFormChange}
                    value={formData.promoCode}
                    placeholder="Type"
                  />
                </div>
                <div className="flex flex-col gap-y-1 text-sm">
                  <label className="font-medium">Discount Value:</label>
                  <input
                    className="p-4 rounded-lg border border-[#B0B0B0]"
                    type="number"
                    id="discountValue"
                    onChange={handleFormChange}
                    value={formData.discountValue}
                    placeholder="Type"
                  />
                </div>
              </div>
              <div className="flex flex-col text-[#111111] gap-2">
                <label htmlFor="limit">Usage Limit:</label>
                <input
                  type="number"
                  id="usageLimit"
                  onChange={handleFormChange}
                  value={formData.usageLimit}
                  placeholder="Type"
                  className="outline-none p-4 rounded-lg border border-[#B0B0B0]"
                />
              </div>
            </div>

            {/* right side */}
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <div className="flex flex-col text-[#111111] gap-2">
                <label htmlFor="product">Product Type:</label>
                <input
                  type="text"
                  id="productType"
                  value={formData.productType}
                  onChange={handleFormChange}
                  placeholder="Type"
                  className="outline-none p-4 rounded-lg border border-[#B0B0B0]"
                />
              </div>

              <div className="flex flex-col gap-y-1 text-sm">
                <label className="font-medium">Promotion Description:</label>
                <textarea
                  className="p-4 rounded-lg resize-none outline-none custom-scrollbar border border-[#B0B0B0]"
                  placeholder="Type"
                  id="promoDesc"
                  onChange={handleFormChange}
                  value={formData.promoDesc}
                  rows={9}
                />
              </div>

              <div className="flex flex-col text-[#111111] gap-2 text-sm">
                <label className="font-medium">Product's Category:</label>
                <select
                  value={formData.productCategory}
                  onChange={handleFormChange}
                  id="productCategory"
                  className="p-4 rounded-lg border border-[#B0B0B0]"
                >
                  <option>Select</option>
                  <option value="house">House</option>
                  <option value="car">car</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="px-5 md:px-10 w-full mt-4 flex flex-col gap-5 flex-1">
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
              Create promotion
            </button>
            <FaChevronRight size={18} />
            <span className="text-sm">Summary </span>
          </div>

          <h2 className="text-3xl my-5 font-bold">Summary</h2>

          <div className="flex flex-col  md:flex-row text-[#111111] w-full justify-between gap-10 pb-10">
            {/* left side */}
            <div className=" w-full flex flex-col gap-5 md:w-[40%]">
              <div className="flex flex-col  gap-2">
                <span>Promotion Name:</span>
                <span className="font-bold">{formData.promoName}</span>
              </div>

              <div className="grid grid-col-1 md:grid-cols-2 gap-x-2 gap-y-3">
                <div className="flex flex-col  gap-3 ">
                  <span>Promotion Type:</span>
                  <span className="font-bold">{formData.promoType}</span>
                </div>
                <div className="flex flex-col gap-y-3 ">
                  <span>Product Type:</span>
                  <span className="font-bold">{formData.productType}</span>
                </div>
                <div className="flex flex-col gap-y-3 ">
                  <span>Start Date:</span>
                  <span className="font-bold">
                    {formData.startDate && reFormatDate(formData.startDate)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-3 ">
                  <span>End Date:</span>
                  <span className="font-bold">
                    {formData.endDate && reFormatDate(formData.endDate)}
                  </span>
                </div>
                <div className="flex flex-col gap-y-3 ">
                  <span>Promotion Code:</span>
                  <span className="font-bold">{formData.promoCode}</span>
                </div>

                <div className="flex flex-col  gap-3">
                  <span>Usage Limit:</span>
                  <span className="font-bold">{formData.usageLimit}</span>
                </div>
              </div>
            </div>

            {/* right side */}
            <div className="w-full flex flex-col gap-5 md:w-[40%]">
              <div className="flex flex-col  gap-3">
                <span>Promotion Description:</span>
                <p className="font-bold">{formData.promoDesc}</p>
              </div>

              {/* <div className="flex flex-col gap-y-3 ">
                <span>Maximum Redeemer Per User:</span>
                <span className="font-bold">Cashback</span>
              </div> */}

              <div className="flex flex-col md:flex-row justify-between gap-5">
                <div className="flex flex-col  gap-3 ">
                  <span>Product Category:</span>
                  <span className="font-bold">{formData.productCategory}</span>
                </div>

                <div className="flex flex-col  gap-3 ">
                  <span>Discount Value</span>
                  <span className="font-bold">{formData.discountValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
