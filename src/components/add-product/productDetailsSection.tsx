// components/ProductDetailsSection.tsx
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StateCitySelector2 from "../common/stateCitySelector";

interface ProductDetailsSectionProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  productDetails,
  setProductDetails,
  handleInputChange,
}) => {
  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
      <h4 className="text-lg font-semibold mb-4">Details</h4>

      <div className="w-full">
        <h5 className="text-sm mb-2 font-medium">Product name:</h5>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={handleInputChange}
          className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
          placeholder="Enter name"
        />
      </div>

      <div className="w-full">
        <label htmlFor="location" className="text-sm mb-2 font-medium">
          Location:
        </label>
        <div className="flex items-center gap-x-2 mb-2">
          <StateCitySelector2
            onCityChange={(city) =>
              setProductDetails((prev: ProductDetails) => ({
                ...prev,
                city: city ? city.value : "",
              }))
            }
            onStateChange={(state) =>
              setProductDetails((prev: ProductDetails) => ({
                ...prev,
                state: state ? state.value : "",
              }))
            }
          />
          <input
            type="text"
            name="address"
            value={productDetails.address}
            onChange={handleInputChange}
            className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
            placeholder="Address"
          />
        </div>
      </div>

      <div className="w-full">
        <h5 className="text-sm mb-2 font-medium">Product description:</h5>
        <ReactQuill
          value={
            productDetails.description
              ? `<p>${productDetails.description}</p>`
              : "<p></p>"
          }
          onChange={(...args) => {
            const editor = args[3];
            const text = editor.getText().trim();
            setProductDetails((prev: ProductDetails) => ({
              ...prev,
              description: text,
            }));
          }}
          theme="snow"
          className="!rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-y-1.5 flex-1">
        <h5 className="text-sm mb-2 font-medium">SKU number:</h5>
        <input
          type="text"
          name="sku"
          value={productDetails.sku}
          onChange={handleInputChange}
          placeholder="######"
          className="p-3 outline-none w-full rounded-lg border border-primaryBorder"
        />
      </div>
    </div>
  );
};
