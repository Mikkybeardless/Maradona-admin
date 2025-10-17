// components/ProductDetailsSection.tsx
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SearchableSelect } from "../common/SearchAndFilterSelect";
import { usePaginatedData } from "../../hooks/usePaginatedData";
import categoryService from "../../api/services/category.service";
import { useDebounce } from "../../hooks/useDebounce";
import StateCitySelector2 from "../common/stateCitySelector";

interface AuctionTypeSectionProps {
  auctionDetails: Auction;
  setAuctionDetails: React.Dispatch<React.SetStateAction<Auction>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const AuctionTypeSection: React.FC<AuctionTypeSectionProps> = ({
  auctionDetails,
  setAuctionDetails,
  handleInputChange,
}) => {
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedCategoryQuery = useDebounce(searchQuery, 300);

  const [categories] = usePaginatedData(categoryService.getAllCategories, {
    initialPage: 1,
    initialPageSize: 20,
    dataName: "Categories",
    filters: {
      search: debouncedCategoryQuery,
    },
  });

  useEffect(() => {
    const options: { value: string; label: string }[] = (
      categories.rows as ApiCategory[]
    ).map((category) => ({
      value: String(category.id),
      label: category.name,
    }));
    setCategoryOptions(options);
  }, [categories]);
  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
      <h4 className="text-lg font-semibold">Product type</h4>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="productType" className="text-sm">
          Select product type
        </label>
        <select
          id="productType"
          onChange={handleInputChange}
          name="type"
          value={auctionDetails.type}
          className="p-3 outline-none w-full rounded-lg border border-primaryBorder"
        >
          <option disabled value="">
            Select
          </option>
          <option value="LAND">Land</option>
          <option value="CAR">Car</option>
          <option value="HOUSE">House</option>
        </select>
      </div>
      <div className="w-full">
        <h5 className="text-sm mb-2 font-medium">Product name:</h5>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={auctionDetails.name}
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
              setAuctionDetails((prev: Auction) => ({
                ...prev,
                location_city: city ? city.value : "",
              }))
            }
            onStateChange={(state) =>
              setAuctionDetails((prev: Auction) => ({
                ...prev,
                location_state: state ? state.value : "",
              }))
            }
          />
          <input
            type="text"
            name="location_address"
            value={auctionDetails.location_address}
            onChange={handleInputChange}
            className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
            placeholder="Address"
          />
        </div>
      </div>
      <div className="w-full">
        <h5 className="text-sm mb-2 font-medium">Product description:</h5>
        <ReactQuill
          defaultValue={
            auctionDetails.description
              ? `<p>${auctionDetails.description}</p>`
              : "<p></p>"
          }
          onChange={(...args) => {
            const editor = args[3];
            const text = editor.getText().trim();
            setAuctionDetails((prev: Auction) => ({
              ...prev,
              description: text,
            }));
          }}
          theme="snow"
          className="!rounded-lg"
        />
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-5 md:gap-x-8">
        <div className="flex flex-col w-full gap-y-1.5 md:flex-1">
          <SearchableSelect
            name="categories"
            label="Category"
            data={categoryOptions}
            loading={categories.loading}
            onSearch={(q) => setSearchQuery(q)}
            placeholder="Choose a category..."
            onSelectionChange={(option) =>
              setAuctionDetails((prev) => {
                const id = option.value;
                return {
                  ...prev,
                  category_id: id,
                };
              })
            }
            initialValue="selected category"
            isBold
          />
        </div>
        <div className="flex flex-col w-full gap-y-1 md:flex-1">
          <label htmlFor="sku" className="text-sm mb-2  font-medium">
            SKU number:
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            onChange={handleInputChange}
            value={auctionDetails.sku}
            placeholder="######"
            className="p-2.5 outline-none w-full rounded-lg border border-primaryBorder"
          />
        </div>
      </div>
    </div>
  );
};
