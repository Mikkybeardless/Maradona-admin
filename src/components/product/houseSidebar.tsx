// components/HouseSidebarSection.tsx
import React from "react";
import { CustomCheckbox } from "../common/customCheckInput";

interface HouseSidebarSectionProps {
  productDetails: House;
  setProductDetails: React.Dispatch<React.SetStateAction<House>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const HouseSidebarSection: React.FC<HouseSidebarSectionProps> = ({
  productDetails,
  handleInputChange,
  setProductDetails,
}) => {
  const accessibilityOptions = [
    { id: "main-road", label: "Main road" },
    { id: "inner-road", label: "Inner road" },
  ];

  const houseConditionOptions = [
    { id: "new", label: "Newly built" },
    { id: "needs-renovation", label: "Needs renovation" },
    { id: "old", label: "Old" },
  ];

  return (
    <div className="w-full p-5 flex flex-col gap-y-6">
      {/* Number of Bedrooms Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">How many bed(s)</h5>
        <input
          type="number"
          name="house_beds"
          value={productDetails.house_beds}
          onChange={handleInputChange}
          className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
          placeholder="Enter number of bedrooms"
        />
        <p className="text-xs opacity-70">How many bedrooms?</p>
      </div>

      {/* House Size Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">House size</h5>
        <input
          type="number"
          name="house_size"
          value={productDetails.house_size}
          onChange={handleInputChange}
          className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
          placeholder="Enter house size"
        />
        <p className="text-xs opacity-70">
          What is the size of the house in Sqm?
        </p>
      </div>

      {/* House Type Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">House type</h5>
        <select
          name="house_type"
          value={productDetails.house_type}
          onChange={handleInputChange}
          className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
        >
          <option value="detached">Detached</option>
          <option value="semi-detached">Semi-detached</option>
          <option value="terraced">Terraced</option>
          <option value="bungalow">Bungalow</option>
          <option value="duplex">Duplex</option>
          <option value="apartment">Apartment</option>
        </select>
        <p className="text-xs opacity-70">What type of house is it?</p>
      </div>

      {/* Accessibility Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Accessibility</h5>
        {accessibilityOptions.map((option) => (
          <CustomCheckbox
            key={option.id}
            id={option.id}
            checked={productDetails.accessibility === option.id}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                accessibility: option.id as ProductAccessibility,
              }))
            }
            label={option.label}
          />
        ))}
        <p className="text-xs opacity-70">
          Is the house along the main road or inside?
        </p>
      </div>

      {/* House Condition Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Condition</h5>
        {houseConditionOptions.map((option) => (
          <CustomCheckbox
            key={option.id}
            id={option.id}
            checked={productDetails.house_condition === option.id}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                house_condition: option.id as HouseCondition,
              }))
            }
            label={option.label}
          />
        ))}
        <p className="text-xs opacity-70">How good is the house?</p>
      </div>

      {/* Furnished Status Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Furnished status</h5>
        <select
          name="house_furnished"
          value={productDetails.house_furnished}
          onChange={handleInputChange}
          className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
        >
          <option value="furnished">Fully furnished</option>
          <option value="semi-furnished">Semi-furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
        <p className="text-xs opacity-70">Furniture status of the house</p>
      </div>
    </div>
  );
};
