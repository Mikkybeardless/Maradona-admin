import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import { IoCloudUploadOutline } from "react-icons/io5";
import StateCitySelector2 from "../components/common/stateCitySelector";
import { CustomCheckbox } from "../components/common/customCheckInput";

type FileUpload = {
  images: File[];
  documents: File[];
  videos: File[];
};
export default function AddProducts() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<Product>({
    productType: "land",
    productName: "",
    description: "",
    productPrice: 0,
    salePrice: 0,
    address: "",
    city: "",
    houseType: "",
    continueSelling: false,
    state: "",
    furnishedStatus: "furnished",
    propertySize: 0,
    weightUnit: "kg",
    skuNumber: "",
    media: [],
    documents: [],
    status: "draft",
    tags: "",
    inventory: "",
    weight: 0,
    bodyType: "SUV",
    engineType: "",
    accessibility: "main-road",
    fencing: "fenced",
    topography: "dry-land",
    landType: "residential",
    duration: "days",
    auctionDuration: 0,
    transmission: "",
    condition: "new",
    houseCondition: "newly-built",
    auctionType: "auctioned",
    landSize: 0,
    gearType: "manual",
    mileage: "",
  });

  const [media, setMedia] = useState<FileUpload>({
    images: [],
    documents: [],
    videos: [],
  });
  const [documents, setDocuments] = useState<FileUpload>({
    images: [],
    documents: [],
    videos: [],
  });

  const [checkedDoc, setCheckedDoc] = useState({
    id: "",
    isChecked: false,
  });
  const [checkedCar, setCheckedCar] = useState({
    bodyType: {
      id: "",
      isChecked: false,
    },
    gearType: { id: "", isChecked: false },
  });
  const [checkedLand, setCheckedLand] = useState({
    accessibility: { id: "", isChecked: false },
    fencing: { id: "", isChecked: false },
    topography: { id: "", isChecked: false },
    landType: { id: "", isChecked: false },
  });
  const [checkedHouse, setCheckedHouse] = useState({
    accessibility: { id: "", isChecked: false },
    houseCondition: { id: "", isChecked: false },
  });

  // media change
  const handleMediaChange = (newMedia: File[]) => {
    const images = newMedia.filter((file) => file.type.startsWith("image/"));
    const documents = newMedia.filter((file) =>
      file.type.startsWith("application/")
    );
    const videos = newMedia.filter((file) => file.type.startsWith("video/"));
    setMedia((prevMedia) => ({
      ...prevMedia,
      images: [...images],
      documents: [...documents],
      videos: [...videos],
    }));
    setProductDetails((prev) => ({
      ...prev,
      media: [...newMedia],
    }));
    // console.log("Updated Media:", {
    //   images: [...media.images, ...images],
    //   documents: [...media.documents, ...documents],
    //   videos: [...media.videos, ...videos],
    // });
  };

  // document change
  const handleDocumentChange = (newdocument: File[]) => {
    const images = newdocument.filter((file) => file.type.startsWith("image/"));
    const docs = newdocument.filter((file) =>
      file.type.startsWith("application/")
    );
    const videos = newdocument.filter((file) => file.type.startsWith("video/"));
    setDocuments((prevDocument) => ({
      ...prevDocument,
      images: [...images],
      documents: [...docs],
      videos: [...videos],
    }));
    setProductDetails((prev) => ({
      ...prev,
      documents: [...newdocument],
    }));
    // console.log("Updated document:", {
    //   images: [...documents.images, ...images],
    //   documents: [...documents.documents, ...docs],
    //   videos: [...documents.videos, ...videos],
    // });
  };
  const handleSubmit = () => {
    // e.preventDefault();

    const { images, documents, videos } = media;
    // Here you would typically send the Media to your backend

    console.log("Product Details:", productDetails);

    // Example of creating FormData for submission
    const formData = new FormData();

    // Add all image Media
    images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    // Add all document Media
    documents.forEach((file, index) => {
      formData.append(`documents[${index}]`, file);
    });

    // Add all video Media
    videos.forEach((file, index) => {
      formData.append(`videos[${index}]`, file);
    });

    console.log("Form Data:", formData);

    // You would then submit formData to your backend
    // axios.post('/api/upload', formData)
  };

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
    console.log("Updated product details:", {
      ...productDetails,
      [name]: value,
    });
  };

  const handleCancel = () => {
    const initialProductDetails: Product = {
      productType: "land",
      productName: "",
      description: "",
      productPrice: 0,
      salePrice: 0,
      address: "",
      city: "",
      houseType: "",
      continueSelling: false,
      state: "",
      furnishedStatus: "furnished",
      propertySize: 0,
      weightUnit: "kg",
      skuNumber: "",
      media: [],
      documents: [],
      status: "draft",
      tags: "",
      inventory: "",
      weight: 0,
      bodyType: "SUV",
      engineType: "",
      accessibility: "main-road",
      fencing: "fenced",
      topography: "dry-land",
      landType: "residential",
      duration: "days",
      auctionDuration: 0,
      transmission: "",
      condition: "new",
      houseCondition: "newly-built",
      auctionType: "auctioned",
      landSize: 0,
      gearType: "manual",
      mileage: "",
    };
    // Reset product details or navigate away
    setProductDetails(initialProductDetails);
    navigate("/admin/products");
  };
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-4 md:px-24 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-4 md:px-24 w-full mt-4 flex flex-col flex-1">
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
              Publish
            </button>
          </div>
        </div>

        <main className="w-full flex  flex-col md:flex-row gap-y-5 gap-x-8 mt-8">
          <div className=" w-full md:w-[70%] flex flex-col gap-y-5 overflow-hidden">
            <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold">Product type</h4>
              <div className="w-full flex flex-col  gap-2">
                <label htmlFor="productType" className="text-sm">
                  Select product type
                </label>
                <select
                  onChange={handleInputChange}
                  name="productType"
                  className="p-3 outline-none w-full rounded-lg border border-primaryBorder"
                >
                  <option disabled value="">
                    Select
                  </option>
                  <option value="land">Land</option>
                  <option value="car">Car</option>
                  <option value="house">House</option>
                </select>
              </div>
            </div>
            {/* product type */}

            <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold mb-4">Details</h4>
              <div className="w-full">
                <h5 className="text-sm mb-2 font-medium">Product name:</h5>
                <input
                  type="text"
                  name="productName"
                  value={productDetails.productName}
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
                  onChange={(e) =>
                    setProductDetails((prev) => {
                      return {
                        ...prev,
                        description: e.valueOf() as string,
                      };
                    })
                  }
                  theme="snow"
                  className="!rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-y-1.5 flex-1">
                <h5 className="text-sm mb-2 font-medium">SKU number:</h5>
                <input
                  type="text"
                  name="skuNumber"
                  value={productDetails.skuNumber}
                  onChange={handleInputChange}
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
                onFilesChange={handleMediaChange}
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
                      name="productPrice"
                      value={productDetails.productPrice}
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
                      name="salePrice"
                      value={productDetails.salePrice}
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
                        handleConditionAuctionTypeChange(e, "auctionType")
                      }
                      checked={productDetails.auctionType === "auctioned"}
                      type="checkbox"
                    />
                    <label htmlFor="auctioned">Auctioned</label>
                  </div>
                  <div className="flex gap-x-4 items-center text-sm">
                    <input
                      className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                      id="non-auctioned"
                      onChange={(e) =>
                        handleConditionAuctionTypeChange(e, "auctionType")
                      }
                      checked={productDetails.auctionType === "non-auctioned"}
                      type="checkbox"
                    />
                    <label htmlFor="condition2">Non-auctioned</label>
                  </div>
                </div>
              </div>
            </div>
            {/* product condition */}
            {productDetails.productType === "land" ? (
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
                          onFilesChange={handleDocumentChange}
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
            ) : productDetails.productType === "car" ? (
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
                              handleCarCheckChange(e, "gearType")
                            }
                            checked={
                              checkedCar.gearType.id === "manual" &&
                              checkedCar.gearType.isChecked
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
                              handleCarCheckChange(e, "gearType")
                            }
                            checked={
                              checkedCar.gearType.id === "automatic" &&
                              checkedCar.gearType.isChecked
                            }
                            type="checkbox"
                          />
                          <label htmlFor="automatic">Automatic</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm mb-2 font-medium">Engine Type</h5>
                      <input
                        type="text"
                        name="engineType"
                        value={productDetails.engineType}
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
                        value={productDetails.mileage}
                        onChange={handleInputChange}
                        className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
                        placeholder="30,000"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="w-full md:w-[30%] flex flex-col gap-y-5 overflow-hidden">
            <div className="rounded-lg p-5 flex flex-col gap-y-2 bg-white border border-primaryBorder">
              <h5 className="text-sm">Status</h5>
              <select
                name="status"
                onChange={handleInputChange}
                className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
              >
                <option value="draft">Draft</option>
                <option value="publish">Publish</option>
              </select>
            </div>
            {/* status */}

            <div className="w-full flex flex-col rounded-lg bg-white border border-primaryBorder">
              <div className="p-5 flex flex-col gap-y-2 border-b border-b-primaryBorder">
                <h5 className="text-sm">Tags</h5>
                <input
                  type="text"
                  name="tags"
                  value={productDetails.tags}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                  placeholder="Type to search"
                />
              </div>

              <div className="p-5 flex flex-col gap-y-2 border-b border-b-primaryBorder">
                <h5 className="text-sm">Inventory</h5>
                <input
                  type="number"
                  name="inventory"
                  value={productDetails.inventory}
                  className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                />
                <div className="flex gap-x-1.5 text-xs">
                  <input
                    className="w-[18px] h-[18px]"
                    type="checkbox"
                    id="continue-selling"
                    checked={productDetails.continueSelling}
                    onChange={(e) =>
                      setProductDetails((prev) => ({
                        ...prev,
                        continueSelling: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="continue-selling">
                    Continue selling product when out of stock
                  </label>
                </div>
              </div>

              {productDetails.productType === "car" ? (
                <div className="w-full flex flex-col gap-y-6">
                  <div className="w-full p-5 flex flex-col gap-y-6 border-b border-b-primaryBorder">
                    <div className="flex flex-col gap-y-2">
                      <h5 className="text-sm">Weight</h5>
                      <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
                        <input
                          type="number"
                          name="weight"
                          value={productDetails.weight}
                          onChange={handleInputChange}
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
                          checkedCar.bodyType.id === "SUV" &&
                          checkedCar.bodyType.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "bodyType")}
                        label="SUV"
                      />

                      <CustomCheckbox
                        id="Sedan"
                        checked={
                          checkedCar.bodyType.id === "Sedan" &&
                          checkedCar.bodyType.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "bodyType")}
                        label="Sedan"
                      />

                      <CustomCheckbox
                        id="Coupe"
                        checked={
                          checkedCar.bodyType.id === "Coupe" &&
                          checkedCar.bodyType.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "bodyType")}
                        label="Coupe"
                      />

                      <CustomCheckbox
                        id="Truck"
                        checked={
                          checkedCar.bodyType.id === "Truck" &&
                          checkedCar.bodyType.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "bodyType")}
                        label="Truck"
                      />

                      <CustomCheckbox
                        id="Bus"
                        checked={
                          checkedCar.bodyType.id === "Bus" &&
                          checkedCar.bodyType.isChecked
                        }
                        onChange={(e) => handleCarCheckChange(e, "bodyType")}
                        label="Bus"
                      />
                      <p className="text-xs opacity-70">
                        What is the body of the car?
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <h5 className="text-sm">Auction Duration</h5>
                      <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
                        <input
                          type="number"
                          name="auctionDuration"
                          onChange={handleInputChange}
                          value={productDetails.auctionDuration}
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
                    </div>
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
                        onFilesChange={handleDocumentChange}
                      />
                    </div>
                    <p className="text-xs text-secondaryTextColor">
                      Upload authentic documents of your product
                    </p>
                  </div>
                </div>
              ) : productDetails.productType === "land" ? (
                <div className="w-full p-5 flex flex-col gap-y-6 ">
                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Land size</h5>

                    <input
                      type="number"
                      name="landSize"
                      value={productDetails.landSize}
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
                        checkedLand.landType.id === "residential" &&
                        checkedLand.landType.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "landType")}
                      label="Residential"
                    />
                    <CustomCheckbox
                      id="commercial"
                      checked={
                        checkedLand.landType.id === "commercial" &&
                        checkedLand.landType.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "landType")}
                      label="Commercial"
                    />
                    <CustomCheckbox
                      id="agricultural"
                      checked={
                        checkedLand.landType.id === "agricultural" &&
                        checkedLand.landType.isChecked
                      }
                      onChange={(e) => handleLandCheckChange(e, "landType")}
                      label="Agricultural"
                    />
                    <p className="text-xs opacity-70">What is the land type?</p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Auction Duration</h5>
                    <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
                      <input
                        type="number"
                        name="auctionDuration"
                        onChange={handleInputChange}
                        value={productDetails.auctionDuration}
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
                  </div>
                </div>
              ) : (
                <div className="w-full p-5 flex flex-col gap-y-6 ">
                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">How many bed(s)</h5>
                    <input
                      type="number"
                      className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                    />
                    <p className="text-xs opacity-70">how many bedrooms?</p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Property size</h5>
                    <input
                      type="number"
                      name="propertySize"
                      value={productDetails.propertySize}
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                    />
                    <p className="text-xs opacity-70">
                      What is the size of the house Sqm
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">House type</h5>
                    <select
                      name="houseType"
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
                        checkedHouse.houseCondition.id === "new" &&
                        checkedHouse.houseCondition.isChecked
                      }
                      onChange={(e) =>
                        handleHouseCheckChange(e, "houseCondition")
                      }
                      label="Newly built"
                    />
                    <CustomCheckbox
                      id="needs-renovation"
                      checked={
                        checkedHouse.houseCondition.id === "need-renovation" &&
                        checkedHouse.houseCondition.isChecked
                      }
                      onChange={(e) =>
                        handleHouseCheckChange(e, "houseCondition")
                      }
                      label="Needs renovation"
                    />

                    <CustomCheckbox
                      id="old"
                      checked={
                        checkedHouse.houseCondition.id === "old" &&
                        checkedHouse.houseCondition.isChecked
                      }
                      onChange={(e) =>
                        handleHouseCheckChange(e, "houseCondition")
                      }
                      label="Old"
                    />
                    <p className="text-xs opacity-70">How good is the house?</p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Furnished status</h5>
                    <select
                      name="furnishedStatus"
                      onChange={handleInputChange}
                      className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                    >
                      <option value="furnished">Fully furnished</option>
                    </select>
                    <p className="text-xs opacity-70">
                      Used to calculate shipping rates at checkout.
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <h5 className="text-sm">Auction Duration</h5>
                    <div className="pl-3 py-0.5 flex gap-x-2 rounded-lg border border-primaryBorder text-sm">
                      <input
                        type="number"
                        name="auctionDuration"
                        onChange={handleInputChange}
                        value={productDetails.auctionDuration}
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
