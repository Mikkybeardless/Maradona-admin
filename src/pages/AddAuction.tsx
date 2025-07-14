import DashboardSearchBar from "../components/DashboardSearchBar";
import { Link } from "react-router-dom";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FileUpload } from "../components/FileUpload";

export default function AddAuction() {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-14 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-14 w-full mt-4 flex flex-col flex-1">
        <div className="flex gap-x-4 items-center">
          <Link to="/auctions" className="text-sm opacity-60">
            Auctions
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Auction</span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h1 className="text-3xl font-bold">Add Products</h1>

          <div className="flex gap-x-5 items-center">
            <Link
              to="/auctions"
              className="text-sm text-defaultOrange hover:underline"
            >
              Cancel
            </Link>
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

              <FileUpload
                acceptedFileTypes={{
                  "image/jpeg": [],
                  "image/png": [],
                  "video/mp4": [],
                }}
                maxSizeMB={20}
                Child={
                  <>
                    <IoCloudUploadOutline size={30} />
                    <p className="text-lg font-semibold text-center">
                      Drag files here or click to select
                    </p>
                    <p className="text-sm text-[#898989]">
                      Png, jpeg, Mp4 supported up to 20mb max
                    </p>
                  </>
                }
                // onFilesChange={handleMediaChange}
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
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <h5 className="text-sm mb-2 font-medium">Starting Bid:</h5>
                  <input
                    type="text"
                    placeholder="Type"
                    className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
                  />
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <h5 className="text-sm mb-2 font-medium">Reserve Price:</h5>
                  <input
                    type="text"
                    placeholder="Type"
                    className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
                  />
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <h5 className="text-sm mb-2 font-medium">Start Date:</h5>
                  <input
                    type="date"
                    placeholder="Type"
                    className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
                  />
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <h5 className="text-sm mb-2 font-medium">Start Time:</h5>
                  <input
                    type="time"
                    placeholder="Type"
                    className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
                  />
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <h5 className="text-sm mb-2 font-medium">End Date:</h5>
                  <input
                    type="date"
                    placeholder="Type"
                    className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
                  />
                </div>
                <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                  <h5 className="text-sm mb-2 font-medium">End Time:</h5>
                  <input
                    type="time"
                    placeholder="Type"
                    className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
                  />
                </div>
              </div>
            </div>
            {/* aution details */}

            <div className="flex flex-col gap-y-1.5 flex-1 w-full">
              <h5 className="mb-2 font-semibold">Incremental Bid Amount:</h5>
              <input
                type="text"
                placeholder="₦"
                className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
              />
            </div>

            <div className="flex flex-col gap-y-1.5 flex-1 w-full">
              <h5 className="mb-2 font-semibold">Minimum Increment Bid:</h5>
              <input
                type="text"
                placeholder="₦"
                className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
              />
            </div>

            <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold">Pricing</h4>

              <div className="w-full flex justify-between items-center gap-x-5">
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

            <div className="flex flex-col p-5 rounded-lg bg-white border border-primaryBorder">
              <h4 className="text-lg font-semibold">Enable Auto-Extend</h4>
              <div className="flex flex-col gap-y-4 mt-3">
                <div className="flex gap-x-2 items-center text-sm">
                  <input
                    className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                    id="condition1"
                    type="checkbox"
                  />
                  <label htmlFor="condition1">No</label>
                </div>
                <div className="flex gap-x-2 items-center text-sm">
                  <input
                    className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                    id="condition2"
                    type="checkbox"
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
