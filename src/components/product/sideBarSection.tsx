// components/SidebarSection.tsx
import React, { useEffect, useState } from "react";
import { SearchableSelect } from "../common/SearchAndFilterSelect";
import { StatusSection } from "./statusSection";
import { InventorySection } from "./inventory";
import { CarSidebarSection } from "./carSideBar";
import { HouseSidebarSection } from "./houseSidebar";
import { LandSidebarSection } from "./landSidebar";
import { usePaginatedData } from "../../hooks/usePaginatedData";
import tagService from "../../api/services/tag.service";
import { useDebounce } from "../../hooks/useDebounce";

interface SidebarSectionProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  productDetails,
  setProductDetails,
  handleInputChange,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tagOptions, setTagOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const debouncedTagQuery = useDebounce(searchQuery, 300);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags] = usePaginatedData(tagService.getAllTags, {
    initialPage: 1,
    initialPageSize: 20,
    dataName: "Tags",
    filters: {
      search: debouncedTagQuery,
    },
  });
  useEffect(() => {
    const options: { value: string; label: string }[] = (
      tags.rows as ApiTag[]
    ).map((tag) => ({
      value: String(tag.id),
      label: tag.name,
    }));
    setTagOptions(options);
  }, [tags]);

  return (
    <section className="w-full md:w-[30%] flex flex-col gap-y-5 overflow-hidden">
      <StatusSection
        productDetails={productDetails}
        handleInputChange={handleInputChange}
      />

      <div className="w-full flex flex-col rounded-lg bg-white border border-primaryBorder">
        <div className="flex flex-col gap-3">
          <SearchableSelect
            name="tags"
            label="Tags"
            data={tagOptions}
            loading={tags.loading}
            onSearch={(q) => setSearchQuery(q)}
            placeholder="Choose a tag..."
            onSelectionChange={(option) => {
              const tag = parseInt(option.value, 10);
              const tagString = option.label;
              setProductDetails((prev: ProductDetails) => {
                return {
                  ...prev,
                  tags: (prev.tags || []).includes(tag)
                    ? prev.tags
                    : [...(prev.tags || []), tag],
                };
              });

              setSelectedTags((prev) => {
                if (prev.includes(tagString)) {
                  return prev.filter((t) => t !== tagString);
                }
                return [...prev, tagString];
              });
            }}
            initialValue="Select tag"
          />

          <p className="text-xs mx-auto text-gray-600">
            <span className="font-semibold">Selected Tags:</span>{" "}
            {selectedTags.join(", ")}
          </p>
        </div>

        <InventorySection
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          handleInputChange={handleInputChange}
        />

        {productDetails.type === "CAR" && (
          <CarSidebarSection
            productDetails={productDetails as Car}
            setProductDetails={
              setProductDetails as React.Dispatch<React.SetStateAction<Car>>
            }
            handleInputChange={handleInputChange}
          />
        )}

        {productDetails.type === "LAND" && (
          <LandSidebarSection
            productDetails={productDetails as Land}
            handleInputChange={handleInputChange}
            setProductDetails={
              setProductDetails as React.Dispatch<React.SetStateAction<Land>>
            }
          />
        )}

        {productDetails.type === "HOUSE" && (
          <HouseSidebarSection
            productDetails={productDetails as House}
            handleInputChange={handleInputChange}
            setProductDetails={
              setProductDetails as React.Dispatch<React.SetStateAction<House>>
            }
          />
        )}
      </div>
    </section>
  );
};
