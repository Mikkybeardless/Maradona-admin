import { Link, useLocation } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
// import { useEffect } from "react"

export default function AddProducts() {
  const location = useLocation();
  const { pathname } = location;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    // fileRejections,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 20000000,
  });

  const files = acceptedFiles.map((file, index) => {
    return (
      <img
        key={index}
        className="w-full h-[5rem] object-fill rounded-lg bg-gray-100"
        src={URL.createObjectURL(file)}
        alt="Car"
      />
    );
  });

  // useEffect(() => {
  //     if (fileRejections.length > 0) console.log(fileRejections)
  // }, [fileRejections])

  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-24 w-full mt-4 flex flex-col flex-1">
        <div className="flex gap-x-4 items-center">
          <Link to={`/`} className="text-sm opacity-60">
            Dashboard
          </Link>
          <FaChevronRight size={18} />
          <Link to={`/products`} className="text-sm opacity-60">
            Products
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Add products</span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h1 className="text-3xl font-bold">Add Products</h1>

          <div className="flex gap-x-5 items-center">
            <button className="text-sm text-defaultOrange hover:underline">
              Cancel
            </button>
            <button className="px-5 py-3 rounded-lg text-sm bg-defaultOrange hover:bg-defaultOrangeHover text-white">
              Publish
            </button>
          </div>
        </div>

        <div className="w-full flex items-start gap-x-8 mt-8">
          <div className="w-[70%] flex flex-col gap-y-5 overflow-hidden">
            <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold mb-4">Details</h4>
              <div className="w-full">
                <h5 className="text-sm mb-2 font-medium">Product name:</h5>
                <input
                  type="text"
                  className="p-3 w-full rounded-lg border border-primaryBorder text-sm outline-none"
                  placeholder="Enter name"
                />
              </div>
              <div className="w-full">
                <h5 className="text-sm mb-2 font-medium">
                  Product description:
                </h5>
                <ReactQuill theme="snow" className="!rounded-lg" />
              </div>
              <div className="w-full flex justify-between items-center gap-x-8">
                <div className="flex flex-col gap-y-1.5 flex-1">
                  <h5 className="text-sm mb-2 font-medium">Category:</h5>
                  <select className="p-3 outline-none w-full rounded-lg border border-primaryBorder">
                    <option>Select</option>
                  </select>
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1">
                  <h5 className="text-sm mb-2 font-medium">SKU number:</h5>
                  <input
                    type="text"
                    placeholder="######"
                    className="p-3 outline-none w-full rounded-lg border border-primaryBorder"
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

              <div
                {...getRootProps({ "aria-label": "drag and drop area" })}
                className="w-full h-[10rem] flex flex-col justify-center items-center gap-y-1 rounded-lg border border-[#B0B0B0] border-dashed cursor-pointer bg-[#F5F5F5]"
              >
                <input {...getInputProps()} />
                {!isDragActive ? (
                  <>
                    <IoCloudUploadOutline size={30} />
                    <p className="text-lg font-semibold text-center">
                      Drag files here or click to select
                    </p>
                    <p className="text-sm text-[#898989]">
                      Png, jpeg, Mp4 supported up to 20mb max
                    </p>
                  </>
                ) : (
                  <>
                    <p className="">Drop file(s) here...</p>
                  </>
                )}
              </div>

              <div className="w-full grid grid-cols-5 gap-5">{files}</div>

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
                      type="text"
                      placeholder="0.00"
                      className="py-3 outline-none w-full"
                    />
                    <span>NGN</span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
                  <h5 className="text-sm mb-2 font-medium">Sale price:</h5>
                  <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
                    <input
                      type="text"
                      placeholder="0.00"
                      className="py-3 outline-none w-full"
                    />
                    <span>NGN</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Pricing */}

            <div className="flex flex-col gap-y-1.5">
              <h4 className="text-lg font-semibold">
                Select the condition for this product
              </h4>
              <div className="rounded-lg p-5 grid grid-cols-3 gap-x-4 bg-white border border-primaryBorder">
                <div className="flex flex-col gap-y-3">
                  <h6 className="font-medium">Condition</h6>
                  <div className="flex gap-x-2 items-center text-sm">
                    <input
                      className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                      id="condition1"
                      type="checkbox"
                    />
                    <label htmlFor="condition1">New</label>
                  </div>
                  <div className="flex gap-x-2 items-center text-sm">
                    <input
                      className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                      id="condition2"
                      type="checkbox"
                    />
                    <label htmlFor="condition2">Old</label>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <h6 className="font-medium">Qty</h6>
                  <input
                    className="p-2.5 w-[40%] rounded-lg border border-primaryBorder"
                    placeholder="0"
                    min={0}
                    type="number"
                  />
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <h6 className="font-medium">Price(₦)</h6>
                  <input
                    className="p-2.5 w-[40%] rounded-lg border border-primaryBorder"
                    placeholder="0"
                    min={0}
                    type="number"
                  />
                </div>
              </div>
            </div>
            {/* product condition */}
          </div>

          <div className="w-[30%] flex flex-col gap-y-5 overflow-hidden">
            <div className="rounded-lg p-5 flex flex-col gap-y-2 bg-white border border-primaryBorder">
              <h5 className="text-sm">Status</h5>
              <select className="p-3 rounded-lg border border-primaryBorder text-sm outline-none">
                <option>Draft</option>
              </select>
            </div>
            {/* status */}

            <div className="w-full flex flex-col rounded-lg bg-white border border-primaryBorder">
              <div className="p-5 flex flex-col gap-y-2 border-b border-b-primaryBorder">
                <h5 className="text-sm">Tags</h5>
                <input
                  type="text"
                  className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                  placeholder="Type to search"
                />
              </div>

              <div className="p-5 flex flex-col gap-y-2 border-b border-b-primaryBorder">
                <h5 className="text-sm">Inventory</h5>
                <input
                  type="number"
                  className="p-3 rounded-lg border border-primaryBorder text-sm outline-none"
                />
                <div className="flex gap-x-1.5 text-xs">
                  <input
                    className="w-[18px] h-[18px]"
                    type="checkbox"
                    id="continue-selling"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
