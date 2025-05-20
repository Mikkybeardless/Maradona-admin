import { Link, useLocation, useParams } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import Car from "../assets/Product-page-car.png";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import ProductCarousel from "../components/ProductCarousel";
import productService from "../api/services/product.service";

interface ProductDetails {
  id: number;
  name: string;
  category_id: string;
  price: number;
  current_stock: number;
  status: string;
  featured: boolean;
  photos: string[];
  thumbnail_img: string;
  description: string;
  discount: number;
  discount_type: string;
  quantity: number;
  rating: number;
  brand_id: number | null;
  slug: string;
  added_by: string;
  shop: {
    id: number;
    name: string;
    logo: string;
  };
}
export default function ProductDetails() {
  const location = useLocation();
  const { pathname, state } = location;
  const [assignAgentModal, setAssignAgentModal] = useState(false);
  const assignAgentModalRef = useRef(null);
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetails>({
    id: 0,
    name: "",
    category_id: "",
    price: 0,
    current_stock: 0,
    status: "",
    featured: false,
    photos: [],
    thumbnail_img: "",
    description: "",
    discount: 0,
    discount_type: "",
    quantity: 0,
    rating: 0,
    brand_id: 0,
    slug: "",
    added_by: "",
    shop: {
      id: 0,
      name: "",
      logo: "",
    },
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const response = await productService.getProduct(parseInt(id));
          console.log("Product details:", response.data.product);
          setProduct(response.data.product);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      } else {
        console.error("Product ID is undefined.");
      }
    };

    fetchProductDetails();
  }, []);

  useClickAway(assignAgentModalRef, () => {
    setAssignAgentModal(false);
  });

  function openAssignAgentModal() {
    setAssignAgentModal(true);
  }

  function closeAssignAgentModal() {
    setAssignAgentModal(false);
  }

  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
      {assignAgentModal ? (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
          <div
            ref={assignAgentModalRef}
            className="w-[35%] h-[70%] rounded-[24px] flex flex-col p-8 bg-white"
          >
            <h2 className="text-2xl font-bold">Available Agents</h2>
            <div className="w-full flex flex-col flex-1 gap-y-4 mt-4 overflow-y-auto custom-scrollbar-low-opacity">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="flex items-center gap-x-3">
                  <input
                    className="size-[18px]"
                    type="radio"
                    name="agent"
                    id={"agent" + num}
                  />
                  <img
                    src={Car}
                    alt="Profile"
                    className="size-[40px] object-fill rounded-full bg-gray-300"
                  />
                  <label htmlFor={"agent" + num} className="">
                    Rosemary Sunday
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
              <button
                onClick={closeAssignAgentModal}
                className="rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button className="px-5 py-3 rounded-lg text-white bg-defaultOrange">
                Assign
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full py-5 px-5 md:px-10 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className=" px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        {state?.fieldAgent ? (
          <div className="flex gap-x-4 items-center">
            <Link
              state={{ fieldAgent: "request" }}
              to={`/agents`}
              className="text-sm opacity-60"
            >
              Field Agents
            </Link>
            <FaChevronRight size={18} />
            <span className="text-sm">Request</span>
          </div>
        ) : (
          <div className="flex gap-x-4 items-center">
            <Link to={`/`} className="text-sm opacity-60">
              Dashboard
            </Link>
            <FaChevronRight size={18} />
            <Link to={`/products`} className="text-sm opacity-60">
              Products
            </Link>
            <FaChevronRight size={18} />
            <span className="text-sm">Product Details</span>
          </div>
        )}
        <div className="flex justify-between items-center mt-6">
          <h1 className="md:text-3xl font-bold">Product Details</h1>

          {state?.fieldAgent ? (
            <button
              onClick={openAssignAgentModal}
              className="px-4 py-2.5 rounded-lg text-sm text-white bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              Assign Field Agent
            </button>
          ) : (
            <div className="flex gap-x-8 items-center">
              <Link
                to={"/products/add-product"}
                className="cursor-pointer flex items-center bg-defaultOrange text-white rounded-lg py-1 px-2 md:p-2"
              >
                <CiEdit size={26} title="Edit" /> Edit
              </Link>

              <BsTrash3
                color="#e65800"
                size={24}
                className="cursor-pointer"
                title="Delete"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-x-5 mt-10">
          <div className="w-full md:w-1/2">
            <ProductCarousel images={product.photos} />
          </div>
          {/* Images */}

          <div className="w-full md:w-1/2 flex flex-col gap-y-6">
            <div className="w-full bg-white space-y-2 flex flex-col rounded-xl p-4">
              <span className="text-sm opacity-70 ">Product Name:</span>
              <span className=" text-2xl font-bold">
                Toyota Camry LE (2024)
              </span>
              <div className="w-full flex    items-center gap-x-1">
                <span className="opacity-70 text-[#008000] rounded-3xl bg-[#D3FFD3] px-2 py-1 text-sm">
                  Active
                </span>
                <div className="flex gap-1 bg-black text-white rounded-full px-2 py-1 text-xs font-semibold">
                  <span className="text-sm font-semibold">Category:</span>
                  <span className=" text-sm">CAR</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl p-4 flex flex-col gap-y-1.5">
              <span className="text-sm font-semibold">Description</span>
              <span className="opacity-70 text-sm">
                A well-maintained Toyota Camry 2018 model with a sleek design
                and advanced features. Perfect for both city and highway
                driving.
              </span>
            </div>

            {/* key feature  */}
            <div className="w-full bg-white p-4 pl-7 rounded-xl flex gap-x-2 items-start">
              <div className="w-2/4">
                <span className="text-sm font-semibold">Key Features</span>
                <ul className="text-sm pl-3 flex flex-col gap-y-2 mt-2.5 list-disc">
                  <li className="opacity-70">Engine: 2.5L 4-cylinder</li>
                  <li className="opacity-70">Transmission: Automatic</li>
                  <li className="opacity-70">Mileage: 30,000 miles</li>
                  <li className="opacity-70">Color: Metallic Grey</li>
                  <li className="opacity-70">Fuel Type: Petrol</li>
                  <li className="opacity-70">Condition: Used</li>
                </ul>
              </div>
              <div className="w-2/4">
                <span className="text-sm font-semibold">
                  Pricing and Availabilty
                </span>
                <ul className="text-sm flex flex-col gap-y-2 mt-2.5 list-none">
                  <li className="opacity-70">Price: $5,500,000</li>
                  <li className="opacity-70">Negotiable: No</li>
                  <li className="opacity-70">Location: Lekki, Lagos</li>
                </ul>
              </div>
            </div>
          </div>
          {/* details */}
        </div>
      </div>
    </div>
  );
}
