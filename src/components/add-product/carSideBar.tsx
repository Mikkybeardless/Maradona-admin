// components/CarSidebarSection.tsx
import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FileUpload } from "../FileUpload";
import { CustomCheckbox } from "../common/customCheckInput";

interface CarSidebarSectionProps {
  productDetails: Car;
  setProductDetails: React.Dispatch<React.SetStateAction<Car>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const CarSidebarSection: React.FC<CarSidebarSectionProps> = ({
  productDetails,
  setProductDetails,
}) => {
  const bodyTypes = [
    { id: "SUV", label: "SUV" },
    { id: "Sedan", label: "Sedan" },
    { id: "Coupe", label: "Coupe" },
    { id: "Truck", label: "Truck" },
    { id: "Bus", label: "Bus" },
  ];

  return (
    <div className="w-full flex flex-col gap-y-6">
      {/* Weight Section */}
      <div className="w-full p-5 flex flex-col gap-y-6 border-b border-b-primaryBorder">
        {/* <div className="flex flex-col gap-y-2">
          <h5 className="text-sm">Weight</h5>
          <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
            <input
              type="number"
              name="weight"
              value={productDetails.weight || ""}
              onChange={handleInputChange}
              className="outline-none w-full py-2"
              placeholder="Enter weight"
            />
            <select
              name="weightUnit"
                value={productDetails.weightUnit || "kg"}
                onChange={handleInputChange}
              className="px-2 py-2.5 rounded-lg h-[100%] outline-none bg-[#F2F2F2]"
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <p className="text-xs opacity-70">
            Used to calculate shipping rates at checkout
          </p>
        </div> */}

        {/* Body Type Section */}
        <div className="flex flex-col gap-y-2">
          <h5 className="text-sm">Body Type</h5>
          {bodyTypes.map((bodyType) => (
            <CustomCheckbox
              key={bodyType.id}
              id={bodyType.id}
              checked={productDetails.body_type === bodyType.id}
              onChange={() =>
                setProductDetails((prev) => ({
                  ...prev,
                  body_type: bodyType.id as ProductBodyType,
                }))
              }
              label={bodyType.label}
            />
          ))}
          <p className="text-xs opacity-70">What is the body of the car?</p>
        </div>
      </div>

      {/* Product Document Section */}
      <div className="w-full p-5 flex flex-col gap-y-6 border-b border-b-primaryBorder">
        <h5 className="text-sm">Product Document</h5>
        <div className="w-full px-4 py-2">
          <FileUpload
            acceptedFileTypes={{
              "application/pdf": [],
              "image/png": [],
              "image/jpeg": [],
            }}
            maxSizeMB={20}
            Child={
              <>
                <IoCloudUploadOutline size={30} />
                <p className="text-sm font-semibold text-center">
                  Drag files here or{" "}
                  <span className="text-[#E65800]">click to select</span>
                </p>
                <p className="text-xs text-[#898989]">
                  Png, jpeg, PDF supported up to 20mb max
                </p>
              </>
            }
            files={productDetails.documents}
            setFiles={(newFiles) => {
              setProductDetails((prev: Car) => ({
                ...prev,
                documents:
                  typeof newFiles === "function"
                    ? newFiles(prev.documents)
                    : newFiles,
              }));
            }}
          />
        </div>
        <p className="text-xs text-secondaryTextColor">
          Upload authentic documents of your product
        </p>
      </div>
    </div>
  );
};
