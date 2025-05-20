import { Link, useLocation } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { FileUpload } from "../components/FileUpload";
import { IoCloudUploadOutline } from "react-icons/io5";

type FileUpload = {
  images: File[];
  documents: File[];
  videos: File[];
};
export default function AddProducts() {
  const location = useLocation();
  const { pathname } = location;

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

  // media change
  const handleMediaChange = (newMedia: File[]) => {
    const images = newMedia.filter((file) => file.type.startsWith("image/"));
    const documents = newMedia.filter((file) =>
      file.type.startsWith("application/")
    );
    const videos = newMedia.filter((file) => file.type.startsWith("video/"));
    setMedia((prevMedia) => ({
      ...prevMedia,
      images: [...prevMedia.images, ...images],
      documents: [...prevMedia.documents, ...documents],
      videos: [...prevMedia.videos, ...videos],
    }));
    console.log("Updated Media:", {
      images: [...media.images, ...images],
      documents: [...media.documents, ...documents],
      videos: [...media.videos, ...videos],
    });
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
      images: [...prevDocument.images, ...images],
      documents: [...prevDocument.documents, ...docs],
      videos: [...prevDocument.videos, ...videos],
    }));
    console.log("Updated document:", {
      images: [...documents.images, ...images],
      documents: [...documents.documents, ...docs],
      videos: [...documents.videos, ...videos],
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();

    const { images, documents, videos } = media;
    // Here you would typically send the Media to your backend
    console.log("Submitting form with:");
    console.log("Images:", images);
    console.log("Documents:", documents);
    console.log("Videos:", videos);

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

    // You would then submit formData to your backend
    // axios.post('/api/upload', formData)
  };

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
                <ReactQuill  theme="snow" className="!rounded-lg" />
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
                    <h6 className="font-medium">Price (N)</h6>
                    <input
                      className="p-2.5 w-[40%] rounded-lg border border-primaryBorder"
                      placeholder="0"
                      min={0}
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3  md:w-1/2 rounded-lg p-5  bg-white border border-primaryBorder">
                  <h6 className="font-medium">Product Type</h6>
                  <div className="flex gap-x-4 items-center text-sm">
                    <input
                      className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                      id="auctioned"
                      type="checkbox"
                    />
                    <label htmlFor="auctioned">Auctioned</label>
                  </div>
                  <div className="flex gap-x-4 items-center text-sm">
                    <input
                      className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
                      id="condition2"
                      type="checkbox"
                    />
                    <label htmlFor="condition2">Non-auctioned</label>
                  </div>
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

            <div className="w-full flex flex-col rounded-lg bg-white border p-3 border-primaryBorder">
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
                  onFilesChange={handleDocumentChange}
                />
              </div>
              <p className="text-secondaryTextColor">
                Upload authentic documents of your product
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
