import { Link, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { FileUpload } from "../components/FileUpload";
import { IoCloudUploadOutline } from "react-icons/io5";
import StateCitySelector2 from "../components/common/stateCitySelector";
import { CustomCheckbox } from "../components/common/customCheckInput";
import productService from "../api/services/product.service";
import { toast } from "react-toastify";
import { Spinner } from "../components/common/spinner";
import tagService from "../api/services/tag.service";
import { usePaginatedData } from "../hooks/usePaginatedData";
import { SearchableSelect } from "../components/common/SearchAndFilterSelect";
import { useDebounce } from "../hooks/useDebounce";
import { getProductShape } from "../helper/ReShapeData";
import { appendArrayField } from "../helper/appendArrayField";
import categoryService from "../api/services/category.service";

type FileUpload = {
  images: File[];
  documents: File[];
  videos: File[];
};
export default function AddProducts() {
  // const location = useLocation();
  // const { pathname } = location;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
  const initialProductDetails: ProductDetails = {
    type: "LAND",
    name: "",
    category_id: "2",
    description: "",
    price: 0,
    sale_price: 0,
    house_type: "",
    address: "",
    city: "",
    // weight: 0,
    continue_selling: false,
    state: "",
    house_furnished: "furnished",
    weight_unit: "kg",
    media: [],
    documents: [],
    status: "draft",
    tags: [],
    sku: "",
    inventory: 0,
    body_type: "SUV",
    engine_type: "",
    accessibility: "main-road",
    fencing: "fenced",
    topography: "dry-land",
    land_type: "residential",
    // duration: "days",
    auction_duration: 0,
    transmission: "",
    condition: "new",
    house_condition: "newly-built",
    house_size: 0,
    house_beds: 0,
    auction_type: "auctioned",
    land_size: 0,
    gear_type: "manual",
    mileage: "",
  };
  const [productDetails, setProductDetails] = useState<ProductDetails>(
    initialProductDetails
  );

  const [checkedDoc, setCheckedDoc] = useState({
    id: "",
    isChecked: false,
  });
  const [checkedCar, setCheckedCar] = useState({
    body_type: {
      id: "",
      isChecked: false,
    },
    gear_type: { id: "", isChecked: false },
  });
  const [checkedLand, setCheckedLand] = useState({
    accessibility: { id: "", isChecked: false },
    fencing: { id: "", isChecked: false },
    topography: { id: "", isChecked: false },
    land_type: { id: "", isChecked: false },
  });
  const [checkedHouse, setCheckedHouse] = useState({
    accessibility: { id: "", isChecked: false },
    house_condition: { id: "", isChecked: false },
  });

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setCheckedDoc((prev) => ({
      ...prev,
      id: id,
      isChecked: checked,
    }));
  };

  const handleCarCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof checkedCar
  ) => {
    const { id, checked } = e.target;
    setCheckedCar((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        id: id,
        isChecked: checked,
      },
    }));

    setProductDetails((prev) => {
      return {
        ...prev,
        [key]: id as ProductGearType | ProductBodyType,
      };
    });
  };

  const handleLandCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof checkedLand
  ) => {
    const { id, checked } = e.target;
    setCheckedLand((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        id: id,
        isChecked: checked,
      },
    }));

    setProductDetails((prev) => {
      return {
        ...prev,
        [key]: id as HouseCondition | ProductLandType,
      };
    });
  };

  const handleHouseCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof checkedHouse
  ) => {
    const { id, checked } = e.target;
    setCheckedHouse((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        id: id,
        isChecked: checked,
      },
    }));

    setProductDetails((prev) => {
      return {
        ...prev,
        [key]: id as HouseCondition,
      };
    });
  };

  const handleConditionAuctionTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof productDetails
  ) => {
    const { id } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [key]: id as ProductCondition | ProductAuctionType,
    }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payLoad = getProductShape(productDetails);
    console.log("Product Details:", payLoad);

    // Convert to FormData
    const formData = new FormData();

    for (const [key, value] of Object.entries(payLoad)) {
      // Global empty check for all fields
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
        toast.error(`The field "${capitalized}" cannot be empty.`);
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
        appendArrayField(formData, key, value as number[], false);
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
      const response = await productService.addProduct(formData);

      if (response.status === 201) {
        toast.success("Product created successfully!");
        setProductDetails(initialProductDetails);
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
    // Reset product details or navigate away
    setIsLoading(false);
    setProductDetails(initialProductDetails);
    navigate("/admin/products");
  };

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
      const tag = parseInt(option.value, 10);
      setProductDetails((prev) => {
        return {
          ...prev,
          tags: (prev.tags || []).includes(tag)
            ? prev.tags
            : [...(prev.tags || []), tag],
        };
      });
    } else if (type === "categories") {
      const id = option.value as Category_id;
      setProductDetails((prev) => {
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
          <Link to={`/`} className="text-sm opacity-60">
            Dashboard
          </Link>
          <FaChevronRight size={18} />
          <Link to={`/admin/products`} className="text-sm opacity-60">
            Products
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Add products</span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h1 className="md:text-3xl font-bold">Add Products</h1>

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

        <main className="w-full flex  flex-col md:flex-row gap-y-5 gap-x-8 mt-8">
          {/* left */}
          <section className=" w-full md:w-[70%] flex flex-col gap-y-5 overflow-hidden">
            <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold">Product type</h4>
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
                isBold
              />
            </div>

            {/* product type */}

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
                      setProductDetails((prev) => {
                        return {
                          ...prev,
                          city: city ? city.value : "",
                        };
                      })
                    }
                    onStateChange={(state) =>
                      setProductDetails((prev) => {
                        return {
                          ...prev,
                          state: state ? state.value : "",
                        };
                      })
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
                <h5 className="text-sm mb-2 font-medium">
                  Product description:
                </h5>
                <ReactQuill
                  onChange={(...args) => {
                    const editor = args[3];
                    const text = editor.getText().trim();
                    setProductDetails((prev) => ({
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
                  // value={productDetails.sku}
                  // onChange={handleInputChange}
                  placeholder="######"
                  className="p-3 outline-none w-full rounded-lg border border-primaryBorder"
                />
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
                // onFilesChange={handleMediaChange}
                files={productDetails.media}
                setFiles={(newFiles) => {
                  setProductDetails((prev) => ({
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
              <h4 className="text-lg font-semibold">Pricing</h4>

              <div className="w-full flex justify-between items-center gap-x-8">
                <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
                  <h5 className="text-sm mb-2 font-medium">Price:</h5>
                  <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
                    <input
                      type="number"
                      name="price"
                      value={productDetails.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="py-3 outline-none w-full"
                    />
                    <span className="text-secondaryTextColor">NGN</span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
                  <h5 className="text-sm mb-2 font-medium">Sale price:</h5>
                  <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
                    <input
                      type="number"
                      name="sale_price"
                      value={productDetails.sale_price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="py-3 outline-none w-full"
                    />
                    <span className="text-secondaryTextColor">NGN</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Pricing */}

            <div className="flex flex-col gap-y-1.5">
              <h4 className="text-lg font-semibold">
                Select the condition for this product
              </h4>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex justify-between gap-12 w-full md:w-1/2 rounded-lg p-5  bg-white border border-primaryBorder">
                  <div className="flex flex-col gap-y-3">
                    <h6 className="font-medium">Condition</h6>
                    <div className="flex gap-x-2 items-center text-sm">
                      <input
                        className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                        id="new"
                        onChange={(e) =>
                          handleConditionAuctionTypeChange(e, "condition")
                        }
                        checked={productDetails.condition === "new"}
                        type="checkbox"
                      />
                      <label htmlFor="new">New</label>
                    </div>
                    <div className="flex gap-x-2 items-center text-sm">
                      <input
                        className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                        id="old"
                        checked={productDetails.condition === "old"}
                        onChange={(e) =>
                          handleConditionAuctionTypeChange(e, "condition")
                        }
                        type="checkbox"
                      />
                      <label htmlFor="old">Old</label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-3  md:w-1/2 rounded-lg p-5  bg-white border border-primaryBorder">
                  <h6 className="font-medium">Auction Type</h6>
                  <div className="flex gap-x-4 items-center text-sm">
                    <input
                      className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                      id="auctioned"
                      onChange={(e) =>
                        handleConditionAuctionTypeChange(e, "auction_type")
                      }
                      checked={productDetails.auction_type === "auctioned"}
                      type="checkbox"
                    />
                    <label htmlFor="auctioned">Auctioned</label>
                  </div>
                  <div className="flex gap-x-4 items-center text-sm">
                    <input
                      className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                      id="non-auctioned"
                      onChange={(e) =>
                        handleConditionAuctionTypeChange(e, "auction_type")
                      }
                      checked={productDetails.auction_type === "non-auctioned"}
                      type="checkbox"
                    />
                    <label htmlFor="condition2">Non-auctioned</label>
                  </div>
                </div>
              </div>
            </div>
            {/* product condition */}
            {productDetails.type === "LAND" ? (
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
                                <span className="text-[#E65800]">
                                  click to select
                                </span>
                              </p>
                              <p className="text-xs text-[#898989]">
                                Png, jpeg, PDF supported up to 20mb max
                              </p>
                            </>
                          }
                          files={productDetails.documents}
                          setFiles={(newFiles) => {
                            setProductDetails((prev) => ({
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

                    <CustomCheckbox
                      id="COO"
                      checked={checkedDoc.id === "COO" && checkedDoc.isChecked}
                      onChange={handleCheckChange}
                      label="C of O"
                    />
                    <CustomCheckbox
                      id="GC"
                      checked={checkedDoc.id === "GC" && checkedDoc.isChecked}
                      onChange={handleCheckChange}
                      label="Governor's Consent"
                    />

                    <CustomCheckbox
                      id="LA"
                      checked={checkedDoc.id === "LA" && checkedDoc.isChecked}
                      onChange={handleCheckChange}
                      label="Land Agreement"
                    />

                    <CustomCheckbox
                      id="RS"
                      checked={checkedDoc.id === "RS" && checkedDoc.isChecked}
                      onChange={handleCheckChange}
                      label="Registered Survey"
                    />
                  </div>
                </div>
              </div>
            ) : (
              productDetails.type === "CAR" && (
                <>
                  <h4 className="text-lg font-semibold">
                    Select engine Transmission
                  </h4>
                  <div className="w-full rounded-lg p-5 bg-white border border-primaryBorder">
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
                      <div>
                        <h5 className="text-sm mb-2 font-medium">Gear type</h5>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-x-2 items-center text-sm">
                            <input
                              className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                              id="manual"
                              onChange={(e) =>
                                handleCarCheckChange(e, "gear_type")
                              }
                              checked={
                                checkedCar.gear_type.id === "manual" &&
                                checkedCar.gear_type.isChecked
                              }
                              type="checkbox"
                            />
                            <label htmlFor="manual">Manual</label>
                          </div>

                          <div className="flex gap-x-2 items-center text-sm">
                            <input
                              className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                              id="automatic"
                              onChange={(e) =>
                                handleCarCheckChange(e, "gear_type")
                              }
                              checked={
                                checkedCar.gear_type.id === "automatic" &&
                                checkedCar.gear_type.isChecked
                              }
                              type="checkbox"
                            />
                            <label htmlFor="automatic">Automatic</label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm mb-2 font-medium">
                          Engine Type
                        </h5>
                        <input
                          type="text"
                          name="engine_type"
                          value={(productDetails as Car).engine_type}
                          onChange={handleInputChange}
                          className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
                          placeholder="2.5L 4-cylinder"
                        />
                      </div>

                      <div>
                        <h5 className="text-sm mb-2 font-medium">
                          Mileage (miles)
                        </h5>
                        <input
                          type="text"
                          name="mileage"
                          value={(productDetails as Car).mileage}
                          onChange={handleInputChange}
                          className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
                          placeholder="30,000"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </section>

          {/* right */}
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
                  value={productDetails.inventory}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                />
                <div className="flex gap-x-1.5 text-xs">
                  <input
                    className="w-[18px] h-[18px]"
                    type="checkbox"
                    id="continue-selling"
                    checked={productDetails.continue_selling}
                    onChange={(e) =>
                      setProductDetails((prev) => ({
                        ...prev,
                        continue_selling: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="continue-selling">
                    Continue selling product when out of stock
                  </label>
                </div>
              </div>

              {productDetails.type === "CAR" ? (
                <div className="w-full flex flex-col gap-y-6">
                  <div className="w-full p-5 flex flex-col gap-y-6 border-b border-b-primaryBorder">
                    <div className="flex flex-col gap-y-2">
                      <h5 className="text-sm">Weight</h5>
                      <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
                        <input
                          type="number"
                          name="weight"
                          // value={productDetails.weight}
                          // onChange={handleInputChange}
                          className="outline-none w-full"
                        />
                        <select
                          name="weightUnit"
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
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <h5 className="text-sm">Body Type</h5>
                      <CustomCheckbox
                        id="SUV"
                        checked={
                          checkedCar.body_type.id === "SUV" &&
                          checkedCar.body_type.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "body_type")}
                        label="SUV"
                      />

                      <CustomCheckbox
                        id="Sedan"
                        checked={
                          checkedCar.body_type.id === "Sedan" &&
                          checkedCar.body_type.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "body_type")}
                        label="Sedan"
                      />

                      <CustomCheckbox
                        id="Coupe"
                        checked={
                          checkedCar.body_type.id === "Coupe" &&
                          checkedCar.body_type.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "body_type")}
                        label="Coupe"
                      />

                      <CustomCheckbox
                        id="Truck"
                        checked={
                          checkedCar.body_type.id === "Truck" &&
                          checkedCar.body_type.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "body_type")}
                        label="Truck"
                      />

                      <CustomCheckbox
                        id="Bus"
                        checked={
                          checkedCar.body_type.id === "Bus" &&
                          checkedCar.body_type.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "body_type")}
                        label="Bus"
                      />
                      <p className="text-xs opacity-70">
                        What is the body of the car?
                      </p>
                    </div>
                    {/* <div className="flex flex-col gap-y-2">
                      <h5 className="text-sm">Auction Duration</h5>
                      <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
                        <input
                          type="number"
                          name="auction_duration"
                          onChange={handleInputChange}
                          value={productDetails.auction_duration}
                          className="outline-none w-full"
                        />
                        <select
                          name="duration"
                          onChange={handleInputChange}
                          className="px-2 py-2.5 rounded-lg h-[100%] outline-none bg-[#F2F2F2]"
                        >
                          <option value="days">days</option>
                          <option value="weeks">weeks</option>
                          <option value="months">months</option>
                        </select>
                      </div>
                      <p className="text-xs opacity-70">
                        This is the Auction duration of the product
                      </p>
                    </div> */}
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
                        files={productDetails.documents}
                        setFiles={(newFiles) => {
                          setProductDetails((prev) => ({
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
              ) : productDetails.type === "LAND" ? (
                <div className="w-full p-5 flex flex-col gap-y-6 ">
                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Land size</h5>

                    <input
                      type="number"
                      name="land_size"
                      value={(productDetails as Land).land_size}
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                    />

                    <p className="text-xs opacity-70">
                      What is the size of the land?
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Accessibility</h5>
                    <CustomCheckbox
                      id="main-road"
                      checked={
                        checkedLand.accessibility.id === "main-road" &&
                        checkedLand.accessibility.isChecked
                      }
                      onChange={(e) =>
                        handleLandCheckChange(e, "accessibility")
                      }
                      label="Main road"
                    />

                    <CustomCheckbox
                      id="inner-road"
                      checked={
                        checkedLand.accessibility.id === "inner-road" &&
                        checkedLand.accessibility.isChecked
                      }
                      onChange={(e) =>
                        handleLandCheckChange(e, "accessibility")
                      }
                      label="Inner road"
                    />
                    <p className="text-xs opacity-70">
                      is the land along the main road or inside
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Fencing</h5>
                    <CustomCheckbox
                      id="fenced"
                      checked={
                        checkedLand.fencing.id === "fenced" &&
                        checkedLand.fencing.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "fencing")}
                      label="Fenced"
                    />

                    <CustomCheckbox
                      id="not-fenced"
                      checked={
                        checkedLand.fencing.id === "not-fenced" &&
                        checkedLand.fencing.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "fencing")}
                      label="Not fenced"
                    />
                    <p className="text-xs opacity-70">
                      is the land along the main road or inside
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Topography</h5>
                    <CustomCheckbox
                      id="dry-land"
                      checked={
                        checkedLand.topography.id === "dry-land" &&
                        checkedLand.topography.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "topography")}
                      label="Dry land"
                    />

                    <CustomCheckbox
                      id="swampy"
                      checked={
                        checkedLand.topography.id === "swampy" &&
                        checkedLand.topography.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "topography")}
                      label="Swampy"
                    />
                    <CustomCheckbox
                      id="water-logged"
                      checked={
                        checkedLand.topography.id === "water-logged" &&
                        checkedLand.topography.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "topography")}
                      label="Water logged"
                    />
                    <p className="text-xs opacity-70">
                      What is the land topography?
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Land Type</h5>
                    <CustomCheckbox
                      id="residential"
                      checked={
                        checkedLand.land_type.id === "residential" &&
                        checkedLand.land_type.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "land_type")}
                      label="Residential"
                    />
                    <CustomCheckbox
                      id="commercial"
                      checked={
                        checkedLand.land_type.id === "commercial" &&
                        checkedLand.land_type.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "land_type")}
                      label="Commercial"
                    />
                    <CustomCheckbox
                      id="agricultural"
                      checked={
                        checkedLand.land_type.id === "agricultural" &&
                        checkedLand.land_type.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "land_type")}
                      label="Agricultural"
                    />
                    <p className="text-xs opacity-70">What is the land type?</p>
                  </div>

                  {/* <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Auction Duration</h5>
                    <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
                      <input
                        type="number"
                        name="auction_duration"
                        onChange={handleInputChange}
                        value={productDetails.auction_duration}
                        className="outline-none w-full"
                      />
                      <select
                        name="duration"
                        onChange={handleInputChange}
                        className="px-2 py-2.5 rounded-lg h-[100%] outline-none bg-[#F2F2F2]"
                      >
                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                        <option value="months">months</option>
                      </select>
                    </div>
                    <p className="text-xs opacity-70">
                      This is the Auction duration of the product
                    </p>
                  </div> */}
                </div>
              ) : (
                <div className="w-full p-5 flex flex-col gap-y-6 ">
                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">How many bed(s)</h5>
                    <input
                      type="number"
                      name="house_beds"
                      value={(productDetails as House).house_beds}
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                    />
                    <p className="text-xs opacity-70">how many bedrooms?</p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">House size</h5>
                    <input
                      type="number"
                      name="house_size"
                      value={(productDetails as House).house_size}
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                    />
                    <p className="text-xs opacity-70">
                      What is the size of the house in Sqm
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">House type</h5>
                    <select
                      name="house_type"
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                    >
                      <option value="detached">Detached</option>
                    </select>
                    <p className="text-xs opacity-70">
                      What type of house is it
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Accessibility</h5>
                    <CustomCheckbox
                      id="main-road"
                      checked={
                        checkedHouse.accessibility.id === "main-road" &&
                        checkedHouse.accessibility.isChecked
                      }
                      onChange={(e) =>
                        handleLandCheckChange(e, "accessibility")
                      }
                      label="Main road"
                    />

                    <CustomCheckbox
                      id="inner-road"
                      checked={
                        checkedHouse.accessibility.id === "inner-road" &&
                        checkedHouse.accessibility.isChecked
                      }
                      onChange={(e) =>
                        handleHouseCheckChange(e, "accessibility")
                      }
                      label="Inner road"
                    />
                    <p className="text-xs opacity-70">
                      is the land along the main road or inside
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Condition</h5>
                    <CustomCheckbox
                      id="new"
                      checked={
                        checkedHouse.house_condition.id === "new" &&
                        checkedHouse.house_condition.isChecked
                      }
                      onChange={(e) =>
                        handleHouseCheckChange(e, "house_condition")
                      }
                      label="Newly built"
                    />
                    <CustomCheckbox
                      id="needs-renovation"
                      checked={
                        checkedHouse.house_condition.id === "need-renovation" &&
                        checkedHouse.house_condition.isChecked
                      }
                      onChange={(e) =>
                        handleHouseCheckChange(e, "house_condition")
                      }
                      label="Needs renovation"
                    />

                    <CustomCheckbox
                      id="old"
                      checked={
                        checkedHouse.house_condition.id === "old" &&
                        checkedHouse.house_condition.isChecked
                      }
                      onChange={(e) =>
                        handleHouseCheckChange(e, "house_condition")
                      }
                      label="Old"
                    />
                    <p className="text-xs opacity-70">How good is the house?</p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Furnished status</h5>
                    <select
                      name="house_furnished"
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                    >
                      <option value="furnished">Fully furnished</option>
                    </select>
                    <p className="text-xs opacity-70">
                      Used to calculate shipping rates at checkout.
                    </p>
                  </div>

                  {/* <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Auction Duration</h5>
                    <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
                      <input
                        type="number"
                        name="auction_duration"
                        onChange={handleInputChange}
                        value={productDetails.auction_duration}
                        className="outline-none w-full"
                      />
                      <select
                        name="duration"
                        onChange={handleInputChange}
                        className="px-2 py-2.5 rounded-lg h-[100%] outline-none bg-[#F2F2F2]"
                      >
                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                        <option value="months">months</option>
                      </select>
                    </div>
                    <p className="text-xs opacity-70">
                      This is the Auction duration of the product
                    </p>
                  </div> */}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
