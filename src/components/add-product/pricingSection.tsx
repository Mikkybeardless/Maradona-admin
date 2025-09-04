// components/PricingSection.tsx
import React from "react";

interface PricingSectionProps {
  productDetails: ProductDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  productDetails,
  handleInputChange,
}) => {
  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
      <h4 className="text-lg font-semibold">Pricing</h4>

      <div className="w-full flex justify-between items-center gap-x-8">
        <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
          <h5 className="text-sm mb-2 font-medium">Price:</h5>
          <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
            <input
              type="number"
              name="price"
              value={productDetails.price}
              onChange={handleInputChange}
              placeholder="0.00"
              className="py-3 outline-none w-full"
            />
            <span className="text-secondaryTextColor">NGN</span>
          </div>
        </div>

        <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
          <h5 className="text-sm mb-2 font-medium">Sale price:</h5>
          <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
            <input
              type="number"
              name="sale_price"
              value={productDetails.sale_price}
              onChange={handleInputChange}
              placeholder="0.00"
              className="py-3 outline-none w-full"
            />
            <span className="text-secondaryTextColor">NGN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
