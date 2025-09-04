// components/ProductTypeSection.tsx
import React, { useEffect, useState } from "react";
import { SearchableSelect } from "../common/SearchAndFilterSelect";
import { usePaginatedData } from "../../hooks/usePaginatedData";
import categoryService from "../../api/services/category.service";
import { useDebounce } from "../../hooks/useDebounce";

interface ProductTypeSectionProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ProductTypeSection: React.FC<ProductTypeSectionProps> = ({
  productDetails,
  handleInputChange,
  setProductDetails,
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
          value={productDetails.type}
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

      <SearchableSelect
        name="categories"
        label="Category"
        data={categoryOptions}
        loading={categories.loading}
        onSearch={(q) => setSearchQuery(q)}
        placeholder="Choose a category..."
        onSelectionChange={(option) =>
          setProductDetails((prev) => {
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
  );
};
