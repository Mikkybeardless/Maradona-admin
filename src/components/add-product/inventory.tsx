// components/InventorySection.tsx
import React from "react";

interface InventorySectionProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  productDetails,
  setProductDetails,
  handleInputChange,
}) => {
  return (
    <div className="p-5 flex flex-col gap-y-2 border-b border-b-primaryBorder">
      <label htmlFor="inventory" className="text-sm">
        Inventory
      </label>
      <input
        type="number"
        name="inventory"
        id="inventory"
        value={productDetails.inventory}
        onChange={handleInputChange}
        className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
      />
      <div className="flex gap-x-1.5 text-xs">
        <input
          className="w-[18px] h-[18px]"
          type="checkbox"
          id="continue-selling"
          checked={productDetails.continue_selling}
          onChange={(e) =>
            setProductDetails((prev: ProductDetails) => ({
              ...prev,
              continue_selling: e.target.checked,
            }))
          }
        />
        <label htmlFor="continue-selling">
          Continue selling product when out of stock
        </label>
      </div>
    </div>
  );
};
