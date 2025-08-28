// components/ProductDocumentsSection.tsx
import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FileUpload } from "../FileUpload";
import { CustomCheckbox } from "../common/customCheckInput";

interface ProductDocumentsSectionProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  checkedDoc: CheckboxState;
  handleCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductDocumentsSection: React.FC<
  ProductDocumentsSectionProps
> = ({ productDetails, setProductDetails, checkedDoc, handleCheckChange }) => {
  const documentTypes = [
    { id: "COO", label: "C of O" },
    { id: "GC", label: "Governor's Consent" },
    { id: "LA", label: "Land Agreement" },
    { id: "RS", label: "Registered Survey" },
  ];

  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
      <h4 className="text-sm">Product Document</h4>

      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-x-10">
        <div className="flex flex-col gap-y-1.5 flex-1 md:w-[50%]">
          <div>
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
                  setProductDetails((prev: ProductDetails) => ({
                    ...prev,
                    documents:
                      typeof newFiles === "function"
                        ? newFiles(prev.documents)
                        : newFiles,
                  }));
                }}
              />
            </div>
            <p className="text-secondaryTextColor">
              Upload authentic documents of your product
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-1.5 flex-1 md:w-[50%]">
          <h5 className="text-sm">Document type</h5>

          {documentTypes.map((doc) => (
            <CustomCheckbox
              key={doc.id}
              id={doc.id}
              checked={checkedDoc.id === doc.id && checkedDoc.isChecked}
              onChange={(e) => handleCheckChange(e)}
              label={doc.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
