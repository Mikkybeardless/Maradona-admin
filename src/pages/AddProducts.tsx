import { Link, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import productService from "../api/services/product.service";
import { toast } from "react-toastify";
import { Spinner } from "../components/common/spinner";
import { getProductShape } from "../helper/ReShapeData";
import { appendArrayField } from "../helper/appendArrayField";
import { AddProductForm } from "../components/add-product";

export default function AddProducts() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
      if (key === "documents" || key === "media") {
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
    setProductDetails(initialProductDetails);
    navigate("/admin/products");
  };

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
