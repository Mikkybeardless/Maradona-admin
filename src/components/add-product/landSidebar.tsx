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
  const accessibilityOptions = [
    { id: "main-road", label: "Main road" },
    { id: "inner-road", label: "Inner road" },
  ];

  const fencingOptions = [
    { id: "fenced", label: "Fenced" },
    { id: "not-fenced", label: "Not fenced" },
  ];

  const topographyOptions = [
    { id: "dry-land", label: "Dry land" },
    { id: "swampy", label: "Swampy" },
    { id: "water-logged", label: "Water logged" },
  ];

  const landTypeOptions = [
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "agricultural", label: "Agricultural" },
  ];

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
          Is the land along the main road or inside?
        </p>
      </div>

      {/* Fencing Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Fencing</h5>
        {fencingOptions.map((option) => (
          <CustomCheckbox
            key={option.id}
            id={option.id}
            checked={productDetails.fencing === option.id}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                fencing: option.id as ProductFencing,
              }))
            }
            label={option.label}
          />
        ))}
        <p className="text-xs opacity-70">Is the land fenced or not?</p>
      </div>

      {/* Topography Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Topography</h5>
        {topographyOptions.map((option) => (
          <CustomCheckbox
            key={option.id}
            id={option.id}
            checked={productDetails.topography === option.id}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                topography: option.id as ProductTopography,
              }))
            }
            label={option.label}
          />
        ))}
        <p className="text-xs opacity-70">What is the land topography?</p>
      </div>

      {/* Land Type Section */}
      <div className="flex flex-col gap-y-2">
        <h5 className="text-sm">Land Type</h5>
        {landTypeOptions.map((option) => (
          <CustomCheckbox
            key={option.id}
            id={option.id}
            checked={productDetails.land_type === option.id}
            onChange={() =>
              setProductDetails((prev) => ({
                ...prev,
                land_type: option.id as ProductLandType,
              }))
            }
            label={option.label}
          />
        ))}
        <p className="text-xs opacity-70">What is the land type?</p>
      </div>
    </div>
  );
};
