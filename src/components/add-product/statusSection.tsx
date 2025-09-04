// components/StatusSection.tsx
import React from "react";

interface StatusSectionProps {
  productDetails: ProductDetails;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const StatusSection: React.FC<StatusSectionProps> = ({
  productDetails,
  handleInputChange,
}) => {
  return (
    <div className="rounded-lg p-5 flex flex-col gap-y-2 bg-white border border-primaryBorder">
      <h5 className="text-sm">Status</h5>
      <select
        name="status"
        value={productDetails.status}
        onChange={handleInputChange}
        className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
      >
        <option value="draft">Draft</option>
        <option value="published">Publish</option>
      </select>
    </div>
  );
};
