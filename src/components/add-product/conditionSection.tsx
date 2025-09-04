// components/ConditionSection.tsx

import React from "react";

interface ConditionSectionProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
}

export const ConditionSection: React.FC<ConditionSectionProps> = ({
  productDetails,
  setProductDetails,
}) => {
  return (
    <div className="flex flex-col gap-y-1.5">
      <h4 className="text-lg font-semibold">
        Select the condition for this product
      </h4>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex justify-between gap-12 w-full md:w-1/2 rounded-lg p-5 bg-white border border-primaryBorder">
          <div className="flex flex-col gap-y-3">
            <h6 className="font-medium">Condition</h6>

            <div className="flex gap-x-2 items-center text-sm">
              <input
                className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                id="new"
                onChange={() =>
                  setProductDetails((prev) => ({ ...prev, condition: "new" }))
                }
                checked={productDetails.condition === "new"}
                type="checkbox"
              />
              <label htmlFor="new">New</label>
            </div>

            <div className="flex gap-x-2 items-center text-sm">
              <input
                className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                id="old"
                checked={productDetails.condition === "old"}
                onChange={() =>
                  setProductDetails((prev) => ({ ...prev, condition: "old" }))
                }
                type="checkbox"
              />
              <label htmlFor="old">Old</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-3 md:w-1/2 rounded-lg p-5 bg-white border border-primaryBorder">
          <h6 className="font-medium">Auction Type</h6>

          <div className="flex gap-x-4 items-center text-sm">
            <input
              className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
              id="auctioned"
              onChange={() =>
                setProductDetails((prev) => ({
                  ...prev,
                  auction_type: "auctioned",
                }))
              }
              checked={productDetails.auction_type === "auctioned"}
              type="checkbox"
            />
            <label htmlFor="auctioned">Auctioned</label>
          </div>

          <div className="flex gap-x-4 items-center text-sm">
            <input
              className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
              id="non-auctioned"
              onChange={() =>
                setProductDetails((prev) => ({
                  ...prev,
                  auction_type: "non-auctioned",
                }))
              }
              checked={productDetails.auction_type === "non-auctioned"}
              type="checkbox"
            />
            <label htmlFor="condition2">Non-auctioned</label>
          </div>
        </div>
      </div>
    </div>
  );
};
