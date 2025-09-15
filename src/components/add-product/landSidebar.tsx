// components/LandSidebarSection.tsx
import React from "react";
import { CustomCheckbox } from "../common/customCheckInput";

interface LandSidebarSectionProps {
  productDetails: Land;
  setProductDetails: React.Dispatch<React.SetStateAction<Land>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LandSidebarSection: React.FC<LandSidebarSectionProps> = ({
  productDetails,
  setProductDetails,
  handleInputChange,
}) => {
  const accessibilityOptions = ["Main road", "Inner road"];
  const fencingOptions = ["Fenced", "Not fenced"];
  const topographyOptions = ["Dry land", "Swampy", "Water logged"];
  const landTypeOptions = ["Residential", "Commercial", "Agricultural"];

  return (
    <div className="w-full p-5 flex flex-col gap-y-6">
      {/* Land Size Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Land size</h5>
        <input
          type="number"
          name="land_size"
          value={productDetails.land_size || ""}
          onChange={handleInputChange}
          className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
          placeholder="Enter land size"
        />
        <p className="text-xs opacity-70">What is the size of the land?</p>
      </div>

      {/* Accessibility Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Accessibility</h5>
        {accessibilityOptions.map((option, index) => (
          <CustomCheckbox
            key={index}
            id={option}
            checked={productDetails.accessibility === option}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                accessibility: option as ProductAccessibility,
              }))
            }
            label={option}
          />
        ))}
        <p className="text-xs opacity-70">
          Is the land along the main road or inside?
        </p>
      </div>

      {/* Fencing Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Fencing</h5>
        {fencingOptions.map((option, index) => (
          <CustomCheckbox
            key={index}
            id={option}
            checked={productDetails.fencing === option}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                fencing: option as ProductFencing,
              }))
            }
            label={option}
          />
        ))}
        <p className="text-xs opacity-70">Is the land fenced or not?</p>
      </div>

      {/* Topography Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Topography</h5>
        {topographyOptions.map((option, index) => (
          <CustomCheckbox
            key={index}
            id={option}
            checked={productDetails.topography === option}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                topography: option as ProductTopography,
              }))
            }
            label={option}
          />
        ))}
        <p className="text-xs opacity-70">What is the land topography?</p>
      </div>

      {/* Land Type Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Land Type</h5>
        {landTypeOptions.map((option, index) => (
          <CustomCheckbox
            key={index}
            id={option}
            checked={productDetails.land_type === option}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                land_type: option as ProductLandType,
              }))
            }
            label={option}
          />
        ))}
        <p className="text-xs opacity-70">What is the land type?</p>
      </div>
    </div>
  );
};
