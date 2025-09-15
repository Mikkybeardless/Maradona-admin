import { useEffect, useState } from "react";
import { SearchableSelect } from "../common/SearchAndFilterSelect";
import { useDebounce } from "../../hooks/useDebounce";
import { usePaginatedData } from "../../hooks/usePaginatedData";
import tagService from "../../api/services/tag.service";
import { FileUpload } from "../FileUpload";
import { IoCloudUploadOutline } from "react-icons/io5";

interface SideBarSectionProps {
  auctionDetails: Auction;
  setAuctionDetails: React.Dispatch<React.SetStateAction<Auction>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const SideBarSection = ({
  auctionDetails,
  setAuctionDetails,
  handleInputChange,
}: SideBarSectionProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tagOptions, setTagOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const debouncedTagQuery = useDebounce(searchQuery, 300);
  //   const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("Select tag");
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

  useEffect(() => {
    const fetchCurrentTag = async () => {
      try {
        const response = await tagService.getTag(
          Number(auctionDetails.tags?.[0] || 1)
        );
        console.log("tag:", response.data);
        if (response.status === 200) {
          setCurrentTag(response.data.name);
        }
      } catch (error) {
        console.error("error fetching tag:", error);
      }
    };

    fetchCurrentTag();
  }, []);
  return (
    <section className="w-full md:w-[30%] flex flex-col gap-y-5 overflow-hidden">
      <div className="rounded-lg p-5 flex flex-col gap-y-2 bg-white border border-primaryBorder">
        <h5 className="text-sm">Status</h5>
        <select
          name="status"
          onChange={handleInputChange}
          className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Publish</option>
        </select>
      </div>
      {/* status */}

      <div className="w-full flex flex-col rounded-lg bg-white border border-primaryBorder">
        <div className="flex flex-col gap-3">
          <SearchableSelect
            name="tags"
            label="Tags"
            data={tagOptions}
            loading={tags.loading}
            onSearch={(q) => setSearchQuery(q)}
            placeholder="Choose a tag..."
            onSelectionChange={(option) =>
              setAuctionDetails((prev: Auction) => {
                const tag = option.value; // keep as string
                return {
                  ...prev,
                  tags: (prev.tags || []).includes(tag)
                    ? prev.tags
                    : [...(prev.tags || []), tag],
                };
              })
            }
            // fetchOptions={refetchTag}
            initialValue={currentTag}
          />
          {/* {productDetails.tags.length > 0 && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Selected tag:{" "}
                        <strong>{productDetails.tags.join(", ")}</strong>
                      </p>
                    </div>
                  )} */}
        </div>

        <div className="p-5 flex flex-col gap-y-2 border-b border-b-primaryBorder">
          <label htmlFor="inventory" className="text-sm">
            Inventory
          </label>
          <input
            type="number"
            name="inventory"
            id="inventory"
            value={auctionDetails.inventory}
            onChange={handleInputChange}
            className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
          />
          {/* <div className="flex gap-x-1.5 text-xs">
            <input
              className="w-[18px] h-[18px]"
              type="checkbox"
              id="continue-selling"
              // checked={auctionDetails.continue_selling}
              // onChange={(e) =>
              //   setAuctionDetails((prev) => ({
              //     ...prev,
              //     continue_selling: e.target.checked,
              //   }))
              // }
            />
            <label htmlFor="continue-selling">
              Continue selling product when out of stock
            </label>
          </div> */}
        </div>

        {/* <div className="w-full p-5 flex flex-col gap-y-2 border-b border-b-primaryBorder">
          <h5 className="text-sm">Weight</h5>
          <div className="px-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
            <input type="number" className="outline-none w-full" />
            <select className="px-2 py-2.5 rounded-lg h-[100%] outline-none bg-[#F2F2F2]">
              <option>g</option>
            </select>
          </div>
          <p className="text-xs opacity-70">
            Used to calculate shipping rates at checkout
          </p>
        </div> */}

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
              files={auctionDetails.documents}
              setFiles={(newFiles) => {
                setAuctionDetails((prev) => ({
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
    </section>
  );
};
