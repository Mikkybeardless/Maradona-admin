import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import ProductCarousel from "../components/ProductCarousel";
import productService from "../api/services/product.service";
import { DetailLoadingState } from "../components/common/detailLoadingState";
// import { formatAmountToNaira } from "../helper/helperFunctions";
import { DeleteButton } from "../components/modals/delete-modal";
import AssignAgentModal from "../components/modals/assignAgent";
import purchaseEnquiriesService from "../api/services/purchaseEnquiries.service";
import { toast } from "react-toastify";
import { KeyFeatures } from "../components/keyFeatures";

export default function ProductDetails() {
  const location = useLocation();
  const { state } = location;
  const [assignAgentModal, setAssignAgentModal] = useState(false);
  const assignAgentModalRef = useRef(null);
  const { id } = useParams();

  const initialProductDetails = {
    id: 0,
    created_at: "",
    updated_at: "",
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
    house_furnished: "furnished" as ProductFurnishedStatus,
    weight_unit: "kg" as WeightUnit,
    media: [],
    documents: [],
    status: "draft" as ProductStatus,
    tags: [],
    sku: "",
    inventory: 0,
    body_type: "SUV" as ProductBodyType,
    engine_type: "",
    accessibility: "main-road" as ProductAccessibility,
    fencing: "fenced" as ProductFencing,
    topography: "dry-land" as ProductTopography,
    land_type: "residential" as ProductLandType,
    // duration: "days",
    auction_duration: 0,
    transmission: "",
    condition: "new" as ProductCondition,
    house_condition: "newly-built" as HouseCondition,
    house_size: 0,
    house_beds: 0,
    auction_type: "auctioned" as ProductAuctionType,
    land_size: 0,
    gear_type: "manual" as ProductGearType,
    mileage: "",
    belongs_to_admin: false,
    approved_at: null,
  };
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(initialProductDetails);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const response = await productService.getProduct(parseInt(id));
          // console.log("Product details:", response.data);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Product ID is undefined.");
      }
    };

    fetchProductDetails();
  }, [id]);

  useClickAway(assignAgentModalRef, () => {
    setAssignAgentModal(false);
  });

  const handleDelete = async (id: string) => {
    await productService.deleteProduct(Number(id));
  };

  const handleAssignAgent = async (agentId: number) => {
    try {
      const response = await purchaseEnquiriesService.assignAgent(
        Number(id),
        agentId
      );
      if (response.status === 200) {
        return {
          success: true,
          message: "Agent successfully assigned",
        };
      } else {
        return {
          success: false,
          message: "Failed to assign agent, please try again",
        };
      }
    } catch (error) {
      console.error("Error assigning agent:", error);
      return {
        success: false,
        message: "An error occurred while assigning the agent",
      };
    }
  };

  const handleStatusUpdate = async (
    id: number,
    status: "approve" | "cancel"
  ) => {
    try {
      const response = await productService.approveOrRejectProduct(id, status);

      if (response.status === 200) {
        toast.success(
          `product ${
            status === "approve" ? "approved" : "rejected"
          } successfully`
        );
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      toast.error(
        `Failed to ${status === "approve" ? "approve" : "reject"} product`
      );
    }
  };

  return isLoading ? (
    <DetailLoadingState message="Loading product details" />
  ) : (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar pb-10 bg-[#F5F5F5]">
      <AssignAgentModal
        onSubmit={handleAssignAgent}
        assignAgentModal={assignAgentModal}
        closeAssignAgentModal={() => setAssignAgentModal(false)}
      />
      <div className="w-full py-5 px-5 md:px-10 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className=" px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        {state?.fieldAgent ? (
          <div className="flex gap-x-4 items-center">
            <Link
              state={{ fieldAgent: "request" }}
              to={`/admin/agents`}
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
            <Link to={`/admin/products`} className="text-sm opacity-60">
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
              onClick={() => setAssignAgentModal(true)}
              className="px-4 py-2.5 rounded-lg text-sm text-white bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              Assign Field Agent
            </button>
          ) : (
            <div className="flex gap-x-4 items-center">
              {!product.belongs_to_admin && product.approved_at === null && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(Number(id), "approve")}
                    className="text-sm text-green-500 hover:underline"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(Number(id), "cancel")}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Reject
                  </button>
                </>
              )}
              <Link
                to={`/admin/products/edit-product/${id}`}
                className="cursor-pointer flex items-center bg-defaultOrange text-white rounded-lg py-1 px-2 md:p-2"
              >
                <CiEdit size={26} title="Edit" /> Edit
              </Link>

              <DeleteButton
                itemId={id ?? ""}
                onDelete={(id) => handleDelete(id)}
                redirectPath={`/admin/products`}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-x-5 mt-10">
          <div className="w-full md:w-1/2">
            <ProductCarousel images={product.media} />
          </div>
          {/* Images */}

          <div className="w-full md:w-1/2 flex flex-col gap-y-6">
            <div className="w-full bg-white space-y-2 flex flex-col rounded-xl p-4">
              <span className="text-sm opacity-70 ">Product Name:</span>
              <span className=" md:text-2xl font-bold">{product.name}</span>
              <div className="w-full flex    items-center gap-x-1">
                <span className="opacity-70 text-[#008000] rounded-3xl bg-[#D3FFD3] px-2 py-1 text-sm">
                  Active
                </span>
                <div className="flex gap-1 bg-black text-white rounded-full px-2 py-1 text-xs font-semibold">
                  <span className="text-sm font-semibold">Category:</span>
                  <span className=" text-sm">{product.type}</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl p-4 flex flex-col gap-y-1.5">
              <span className="text-sm font-semibold">Description</span>
              <span className="opacity-70 text-sm">{product.description}</span>
            </div>

            {/* key feature  */}
            <KeyFeatures product={product} />
          </div>
          {/* details */}
        </div>
      </div>
    </div>
  );
}
