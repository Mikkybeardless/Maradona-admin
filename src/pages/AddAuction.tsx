import DashboardSearchBar from "../components/DashboardSearchBar";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { FileUpload } from "../components/FileUpload";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { usePaginatedData } from "../hooks/usePaginatedData";
import categoryService from "../api/services/category.service";
import tagService from "../api/services/tag.service";
import auctionService from "../api/services/auction.service";
import { toast } from "react-toastify";
import { appendArrayField } from "../helper/appendArrayField";
import CustomDateInput from "../components/common/dateInput";
import { SearchableSelect } from "../components/common/SearchAndFilterSelect";
import { Spinner } from "../components/common/spinner";
import { IoCloudUploadOutline } from "react-icons/io5";
import formatDateToYYYYMMDD from "../helper/formatDate";
import PriceInput from "../components/common/priceInput";

export default function AddAuction() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [tagOptions, setTagOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState({
    tags: "",
    categories: "",
  });
  const debouncedTagQuery = useDebounce(searchQuery.tags, 300);
  const debouncedCategoryQuery = useDebounce(searchQuery.categories, 300);
  const initialAuctionDetails: Auction = {
    name: "",
    type: "LAND",
    description: "",
    category_id: "2",
    sku: "",
    price: "",
    // sale_price: "",
    inventory: 0,
    media: [],
    documents: [],
    status: "draft",
    starting_bid: "",
    reserve_price: "",
    start_time: "",
    end_time: "",
    tags: [],
    incremental_bid_amount: "",
    minimum_bid_increment: "",
    auto_extend: "",
  };
  const [auctionDetails, setAuctionDetails] = useState<Auction>(
    initialAuctionDetails
  );
  const [date, setDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [time, setTime] = useState<{
    start: string | number;
    end: string | number;
  }>({
    start: "",
    end: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAuctionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // console.log("Product Details:", auctionDetails);

    if (!date.start || !date.end) {
      toast.error("Please select both start and end dates.");
      return;
    }
    const fullStartTime = `${formatDateToYYYYMMDD(date.start)} ${
      time.start
    }:00`;
    const fullEndTime = `${formatDateToYYYYMMDD(date.end)} ${time.end}:00`;
    const apiData = {
      ...auctionDetails,
      start_time: fullStartTime,
      end_time: fullEndTime,
      inventory: String(auctionDetails.inventory),
    };
    console.log("API Data:", apiData);
    // Convert to FormData
    const formData = new FormData();

    for (const [key, value] of Object.entries(apiData)) {
      // Global empty check for all fields
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        toast.error(`The field "${key}" cannot be empty.`);
        return;
      }

      // Special handling for array-required fields
      if (key === "documents") {
        appendArrayField(formData, key, value as File[], true);
        continue;
      }
      if (key === "media") {
        appendArrayField(formData, key, value as File[], true);
        continue;
      }
      if (key === "tags") {
        appendArrayField(formData, key, value as string[], false);
        continue;
      }

      // Append the rest
      if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string | Blob);
      }
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setIsLoading(true);
      const response = await auctionService.addAuction(formData);

      if (response.status === 201) {
        toast.success("Auction created successfully!");
        setAuctionDetails(initialAuctionDetails);
      }
    } catch (err: any) {
      toast.error(() => {
        switch (err.status) {
          case 500:
            return `Failed to create product.\nCheck your internet connection`;
          default:
            return "An error occurred. Please try again.";
        }
      });
      console.error("Error adding product:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    // Reset auction details or navigate away
    setIsLoading(false);
    setAuctionDetails(initialAuctionDetails);
    navigate("/admin/auctions");
  };

  // api call to fetch tags & categories
  const [tags] = usePaginatedData(tagService.getAllTags, {
    initialPage: 1,
    initialPageSize: 20,
    dataName: "Tags",
    filters: {
      search: debouncedTagQuery,
    },
  });

  const [categories] = usePaginatedData(categoryService.getAllCategories, {
    initialPage: 1,
    initialPageSize: 20,
    dataName: "Categories",
    filters: {
      search: debouncedCategoryQuery,
    },
  });
  const handleSelectionChange = (
    option: { value: string; label: string },
    type: "tags" | "categories"
  ) => {
    if (type === "tags") {
      const tag = option.value;
      setAuctionDetails((prev) => {
        return {
          ...prev,
          tags: (prev.tags || []).includes(tag)
            ? prev.tags
            : [...(prev.tags || []), tag],
        };
      });
    } else if (type === "categories") {
      const id = option.value as Category_id;
      setAuctionDetails((prev) => {
        return {
          ...prev,
          category_id: id,
        };
      });
    }
  };

  useEffect(() => {
    const options: { value: string; label: string }[] = (
      tags.rows as ApiTag[]
    ).map((tag) => ({
      value: String(tag.id),
      label: tag.name,
    }));
    console.log("Tag options:", options);
    setTagOptions(options);
  }, [tags]);

  useEffect(() => {
    const options: { value: string; label: string }[] = (
      categories.rows as ApiCategory[]
    ).map((category) => ({
      value: String(category.id),
      label: category.name,
    }));
    console.log("Category options:", options);
    setCategoryOptions(options);
  }, [categories]);

  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-4 md:px-14 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-4 md:px-14 w-full mt-4 flex flex-col flex-1">
        <div className="flex gap-x-4 items-center">
          <Link to="/auctions" className="text-sm opacity-60">
            Auctions
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Auction</span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h1 className="text-3xl font-bold">Add Auction</h1>
          <div className="flex gap-x-5 items-center">
            <button
              onClick={handleCancel}
              className="text-sm text-defaultOrange hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-3 rounded-lg text-sm bg-defaultOrange hover:bg-defaultOrangeHover text-white"
            >
              {isLoading ? <Spinner /> : "Publish"}
            </button>
          </div>
        </div>

        <main className="w-full flex flex-col md:flex-row items-start gap-y-5 gap-x-8 mt-8">
          <section className="w-full md:w-[70%] flex flex-col gap-y-5 overflow-hidden">
            <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold mb-4">Details</h4>
              <div className="w-full flex flex-col  gap-2">
                <label htmlFor="productType" className="text-sm">
                  Select product type
                </label>
                <select
                  id="productType"
                  onChange={handleInputChange}
                  name="type"
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
                <h5 className="text-sm mb-2 font-medium">Auction name:</h5>
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
                <h5 className="text-sm mb-2 font-medium">
                  Auction description:
                </h5>
                <ReactQuill
                  onChange={(...args) => {
                    const editor = args[3];
                    const text = editor.getText().trim();
                    setAuctionDetails((prev) => ({
                      ...prev,
                      description: text,
                    }));
                  }}
                  // style={{ height: "80px" }}
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
                    onSearch={(q) =>
                      setSearchQuery((prev) => ({ ...prev, categories: q }))
                    }
                    placeholder="Choose a category..."
                    onSelectionChange={(option) =>
                      handleSelectionChange(option, "categories")
                    }
                    // fetchOptions={refetchCategory}
                    initialValue="selected category"
                    containerStyle="rounded-lg md:p-5  flex flex-col gap-y-2 bg-white"
                    bordered={false}
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
            {/* details & description */}

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
                files={auctionDetails.media}
                setFiles={(newFiles) => {
                  setAuctionDetails((prev) => ({
                    ...prev,
                    media:
                      typeof newFiles === "function"
                        ? newFiles(prev.media)
                        : newFiles,
                  }));
                }}
              />

              <button className="flex gap-x-2 ml-auto hover:underline items-center text-[#898989]">
                <FaPlus size={18} />
                <span className="text-sm">Add guarantor's form</span>
              </button>
            </div>
            {/* media upload */}

            <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold">Auction Details</h4>

              <div className="w-full grid grid-cols-2 gap-x-5 gap-y-8">
                <PriceInput
                  onChange={(value) =>
                    setAuctionDetails((prev) => ({
                      ...prev,
                      starting_bid: value,
                    }))
                  }
                  id="starting_bid"
                  label="Starting Bid:"
                  name="starting_bid"
                />

                <PriceInput
                  onChange={(value) =>
                    setAuctionDetails((prev) => ({
                      ...prev,
                      reserve_price: value,
                    }))
                  }
                  id="reserve_price"
                  label="Reserve Price:"
                  name="reserve_price"
                />
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <CustomDateInput
                    label="Start Date:"
                    onChange={(newDate) => {
                      console.log("New start date:", newDate);
                      setDate((prevDate) => ({
                        ...prevDate,
                        start: newDate,
                      }));
                    }}
                    iconColor="text-defaultOrange"
                    value={date.start}
                  />
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <h5 className="text-sm mb-2 font-medium">Start Time:</h5>
                  <input
                    type="time"
                    value={time.start}
                    onChange={(e) => {
                      setTime((prevTime) => ({
                        ...prevTime,
                        start: e.target.value,
                      }));
                    }}
                    className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
                  />
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <CustomDateInput
                    label="End Date:"
                    onChange={(newDate) => {
                      setDate((prevDate) => ({
                        ...prevDate,
                        end: newDate,
                      }));
                    }}
                    iconColor="text-defaultOrange"
                    value={date.end}
                  />
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <h5 className="text-sm mb-2 font-medium">End Time:</h5>
                  <input
                    type="time"
                    value={time.end}
                    onChange={(e) => {
                      setTime((prevTime) => ({
                        ...prevTime,
                        end: e.target.value,
                      }));
                    }}
                    className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
                  />
                </div>
              </div>
            </div>
            {/* aution details */}

            <div className="flex flex-col gap-y-1.5 flex-1 w-full">
              <label
                htmlFor="incremental_bid_amount"
                className="mb-2 font-semibold"
              >
                Incremental Bid Amount:
              </label>
              <PriceInput
                onChange={(value) => {
                  console.log("Incremental Bid Amount:", value);
                  setAuctionDetails((prev) => ({
                    ...prev,
                    incremental_bid_amount: value,
                  }));
                }}
                id="incremental_bid_amount"
                name="incremental_bid_amount"
                placeholder="₦"
              />
            </div>

            <div className="flex flex-col gap-y-1.5 flex-1 w-full">
              <label
                htmlFor="minimum_bid_increment"
                className="mb-2 font-semibold"
              >
                Minimum Increment Bid:
              </label>
              <PriceInput
                onChange={(value) =>
                  setAuctionDetails((prev) => ({
                    ...prev,
                    minimum_bid_increment: value,
                  }))
                }
                id="minimum_bid_increment"
                name="minimum_bid_increment"
                placeholder="₦"
              />
            </div>

            <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold">Pricing</h4>

              <div className="w-full flex justify-between items-center gap-x-5">
                <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
                  <label htmlFor="price" className="text-sm mb-2 font-medium">
                    Price:
                  </label>
                  <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
                    <PriceInput
                      onChange={(value) =>
                        setAuctionDetails((prev) => ({
                          ...prev,
                          price: value,
                        }))
                      }
                      id="price"
                      name="price"
                      placeholder="0.00"
                      inputClassName="py-3 outline-none w-full"
                    />
                    <span>NGN</span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
                  <label
                    htmlFor="sale_price"
                    className="text-sm mb-2 font-medium"
                  >
                    Sale price:
                  </label>
                  <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
                    <PriceInput
                      // onChange={(value) =>
                      //   setAuctionDetails((prev) => ({
                      //     ...prev,
                      //     sale_price: value,
                      //   }))
                      // }
                      id="sale_price"
                      name="sale_price"
                      placeholder="0.00"
                      inputClassName="py-3 outline-none w-full"
                    />
                    <span>NGN</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Pricing */}

            <div className="flex flex-col p-5 rounded-lg bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold">Enable Auto-Extend</h4>
              <div className="flex flex-col gap-y-4 mt-3">
                <div className="flex gap-x-2 items-center text-sm">
                  <input
                    className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                    id="condition1"
                    checked={auctionDetails.auto_extend === "2"}
                    type="checkbox"
                    onChange={() =>
                      setAuctionDetails((prev) => ({
                        ...prev,
                        auto_extend: "2",
                      }))
                    }
                  />
                  <label htmlFor="condition1">No</label>
                </div>
                <div className="flex gap-x-2 items-center text-sm">
                  <input
                    className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                    id="condition2"
                    checked={auctionDetails.auto_extend === "1"}
                    type="checkbox"
                    onChange={() =>
                      setAuctionDetails((prev) => ({
                        ...prev,
                        auto_extend: "1",
                      }))
                    }
                  />

                  <label
                    htmlFor="condition2"
                    className="flex items-end gap-x-1"
                  >
                    Yes
                    <span className="text-xs">
                      (Extend auction end time if a bid is placed in the last
                      few minutes)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {/* enable auto extend */}
          </section>

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
                  onSearch={(q) =>
                    setSearchQuery((prev) => ({ ...prev, tags: q }))
                  }
                  placeholder="Choose a tag..."
                  onSelectionChange={(option) =>
                    handleSelectionChange(option, "tags")
                  }
                  // fetchOptions={refetchTag}
                  initialValue="Select tag"
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
                <div className="flex gap-x-1.5 text-xs">
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
                </div>
              </div>

              <div className="w-full p-5 flex flex-col gap-y-2 border-b border-b-primaryBorder">
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
              </div>

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
                          <span className="text-[#E65800]">
                            click to select
                          </span>
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
        </main>
      </div>
    </div>
  );
}
