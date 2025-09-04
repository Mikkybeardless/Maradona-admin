// components/MediaSection.tsx
import React from "react";
import { FaPlus } from "react-icons/fa";
import { FileUpload } from "../FileUpload";

interface MediaSectionProps {
  productDetails: ProductDetails;
  setProductDetails: (details: any) => void;
}

export const MediaSection: React.FC<MediaSectionProps> = ({
  productDetails,
  setProductDetails,
}) => {
  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
      <div className="w-full flex justify-between items-start">
        <h4 className="text-lg font-semibold">Media</h4>
        <button className="flex gap-x-2 items-center hover:underline text-[#898989]">
          <FaPlus size={18} />
          <span className="text-sm">Embed media</span>
        </button>
      </div>

      <FileUpload
        acceptedFileTypes={{
          "image/jpeg": [],
          "image/png": [],
          "video/mp4": [],
        }}
        maxSizeMB={20}
        files={productDetails.media}
        setFiles={(newFiles) => {
          setProductDetails((prev: ProductDetails) => ({
            ...prev,
            media:
              typeof newFiles === "function" ? newFiles(prev.media) : newFiles,
          }));
        }}
      />

      <button className="flex gap-x-2 ml-auto hover:underline items-center text-[#898989]">
        <FaPlus size={18} />
        <span className="text-sm">Add guarantor's form</span>
      </button>
    </div>
  );
};
