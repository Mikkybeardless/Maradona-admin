// components/CarSpecificationsSection.tsx
import React from "react";

interface CarSpecificationsSectionProps {
  productDetails: Car;
  setProductDetails: React.Dispatch<React.SetStateAction<Car>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CarSpecificationsSection: React.FC<
  CarSpecificationsSectionProps
> = ({ productDetails, handleInputChange, setProductDetails }) => {
  return (
    <>
      <h4 className="text-lg font-semibold">Select engine Transmission</h4>

      <div className="w-full rounded-lg p-5 bg-white border border-primaryBorder">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
          <div>
            <h5 className="text-sm mb-2 font-medium">Gear type</h5>
            <div className="flex flex-col gap-2">
              <div className="flex gap-x-2 items-center text-sm">
                <input
                  className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                  id="manual"
                  onChange={() =>
                    setProductDetails((prev) => ({
                      ...prev,
                      gear_type: "Manual",
                    }))
                  }
                  checked={
                    productDetails.gear_type === "Manual" ||
                    productDetails.gear_type === "manual"
                  }
                  type="checkbox"
                />
                <label htmlFor="manual">Manual</label>
              </div>

              <div className="flex gap-x-2 items-center text-sm">
                <input
                  className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                  id="automatic"
                  onChange={() =>
                    setProductDetails((prev) => ({
                      ...prev,
                      gear_type: "Automatic",
                    }))
                  }
                  checked={
                    productDetails.gear_type === "Automatic" ||
                    productDetails.gear_type === "automatic"
                  }
                  type="checkbox"
                />
                <label htmlFor="automatic">Automatic</label>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm mb-2 font-medium">Engine Type</h5>
            <input
              type="text"
              name="engine_type"
              value={productDetails.engine_type}
              onChange={handleInputChange}
              className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
              placeholder="2.5L 4-cylinder"
            />
          </div>

          <div>
            <h5 className="text-sm mb-2 font-medium">Mileage (miles)</h5>
            <input
              type="text"
              name="mileage"
              value={productDetails.mileage}
              onChange={handleInputChange}
              className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
              placeholder="30,000"
            />
          </div>
        </div>
      </div>
    </>
  );
};
