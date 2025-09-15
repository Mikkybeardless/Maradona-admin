import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import productService from "../api/services/product.service";
import { toast } from "react-toastify";
import { Spinner } from "../components/common/spinner";
import { getProductShape } from "../helper/ReShapeData";
import { appendUpdateDataField } from "../helper/AppendFormData";
import { DetailLoadingState } from "../components/common/detailLoadingState";
import { AddProductForm } from "../components/add-product";
// import { convertUrlsToFiles } from "../helper/helperFunctions";

export default function EditProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const initialProductDetails = {
    type: "LAND" as ProductType,
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
    house_furnished: "Furnished" as ProductFurnishedStatus,
    weight_unit: "kg" as WeightUnit,
    media: [],
    documents: [],
    status: "draft" as ProductStatus,
    tags: [],
    sku: "",
    inventory: 0,
    body_type: "SUV" as ProductBodyType,
    engine_type: "",
    accessibility: "Main road" as ProductAccessibility,
    fencing: "Fenced" as ProductFencing,
    topography: "Dry land" as ProductTopography,
    land_type: "residential" as ProductLandType,
    // duration: "days",
    auction_duration: 0,
    transmission: "",
    condition: "New" as ProductCondition,
    house_condition: "Newly built" as HouseCondition,
    house_size: 0,
    house_beds: 0,
    auction_type: "Auctioned" as ProductAuctionType,
    land_size: 0,
    gear_type: "Manual",
    mileage: "",
  };
  const [productDetails, setProductDetails] = useState<ProductDetails>(
    initialProductDetails
  );

  const [checkedDoc, setCheckedDoc] = useState({
    id: "",
    isChecked: false,
  });

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setCheckedDoc((prev) => ({
      ...prev,
      id: id,
      isChecked: checked,
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
    const payLoad = getProductShape(productDetails as ProductDetails);
    // console.log("Product Details:", payLoad);

    // Convert to FormData
    const formData = new FormData();

    for (const [key, value] of Object.entries(payLoad)) {
      const success = appendUpdateDataField(formData, key, value);
      if (!success) return; // stops on validation error
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setIsLoading(true);
      if (!id) throw new Error("Product ID is undefined");
      const response = await productService.updateProduct(Number(id), formData);

      if (response.status === 200) {
        toast.success("Product updated successfully!");
        setProductDetails(initialProductDetails);
      }
    } catch (err: any) {
      toast.error(() => {
        switch (err.status) {
          case 422: {
            const errors = err.response.data.errors;
            const secondKey = Object.keys(errors)[0];
            const message = errors[secondKey][0];
            return ` ${message}`;
          }
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
    navigate("/admin/products");
  };

  // Refactored useEffect
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) {
        console.error("Product ID is undefined.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await productService.getProduct(parseInt(id));
        console.log("Product details response:", response.data);
        const productData = response.data;
        // Set initial product details
        setProductDetails((prev) => ({
          ...prev,
          ...productData,
          documents: [],
          address: productData.location_address || "",
          city: productData.location_city || "",
          state: productData.location_state || "",
          media: [],
        }));

        // // Convert URLs to Files for both documents and media in parallel
        // const [documentFiles, mediaFiles] = await Promise.all([
        //   convertUrlsToFiles(productData.documents as string[], "existing-doc"),
        //   convertUrlsToFiles(productData.media as string[], "existing-media"),
        // ]);

        // // Update product details with converted files
        // setProductDetails((prev) => ({
        //   ...prev,
        //   ...(documentFiles.length > 0 && { documents: documentFiles }),
        //   ...(mediaFiles.length > 0 && { media: mediaFiles }),
        // }));
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return isLoading ? (
    <DetailLoadingState message="Loading..." />
  ) : (
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
          <span className="text-sm">Edit product</span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h1 className="md:text-3xl font-bold">Edit Product</h1>

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
              {isLoading ? <Spinner /> : "Update"}
            </button>
          </div>
        </div>

        <main className="w-full flex  flex-col md:flex-row gap-y-5 gap-x-8 mt-8">
          <AddProductForm
            productDetails={productDetails}
            setProductDetails={setProductDetails}
            handleInputChange={handleInputChange}
            checkedDoc={checkedDoc}
            handleCheckChange={handleCheckChange}
          />
        </main>
      </div>
    </div>
  );
}
