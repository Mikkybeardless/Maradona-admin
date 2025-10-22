import { Link, useLocation, useParams } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import DefaultImage from "../assets/no-image.png";
import AssignAgentModal from "../components/modals/assignAgent";
import { HiDotsHorizontal } from "react-icons/hi";
import purchaseEnquiriesService from "../api/services/purchaseEnquiries.service";
import { formatIsoString } from "../helper/formatIIsoString";
import { formatPrice } from "../helper/helperFunctions";
import { MarkAsSoldModal } from "../components/modals/MarKAsSold-modal";
import ActionModal from "../components/modals/actionModal";
import { DetailLoadingState } from "../components/common/detailLoadingState";

export default function Enquiry() {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  // retrieve the state object
  const initialEnquiry: ApiEnquiry = {
    product_id: "",
    buyer_id: "",
    message: "",
    status: "",
    agent_id: null,
    qty_sold: null,
    sold_price: null,
    sold_at: null,
    product: null,
    buyer: null,
    agent: null,
    inspection_request: null,
    id: 0,
    created_at: "",
    updated_at: "",
  };
  const [enquiry, setEnquiry] = useState<ApiEnquiry>(initialEnquiry);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [markAsSoldModal, setMarkAsSoldModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  // const [markModal, setMarkModal] = useState(false);
  // const [cancelModal, setCancelModal] = useState(false);
  // const [invoiceModal, setInvoiceModal] = useState(false);
  // const [shipmentModal, setShipmentModal] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const shipment = {
    data: {
      accountNumber: "0491190391",
      name: "Rosemary Sunday",
      itemName: "Toyota Camry 2015",
      trackingNumber: "12345670",
      shippingCenter: "FedEx",
      status: "In transit",
      edd: new Date().toLocaleDateString(),
      deliveryAddress: "123 Main St, Springfiled, IL",
      phone: "+234902830830",
    },
  };

  const [assignAgentModal, setAssignAgentModal] = useState(false);

  useClickAway(dropDownRef, () => {
    setShowDropdown(false);
  });
  // useClickAway(markModalRef, () => {
  //   setMarkModal(false);
  // });
  // useClickAway(cancelModalRef, () => {
  //   setCancelModal(false);
  // });
  // useClickAway(invoiceModalRef, () => {
  //   setInvoiceModal(false);
  // });
  // useClickAway(shipmentModalRef, () => {
  //   setShipmentModal(false);
  // });

  // function openMarkModal() {
  //   setMarkModal(true);
  // }

  // function openShipmentModal() {
  //   setShipmentModal(true);
  // }

  useEffect(() => {
    const fetchEnquiryDetails = async () => {
      if (id) {
        try {
          const response = await purchaseEnquiriesService.getEnquiry(
            parseInt(id)
          );
          // console.log("enquiry details:", response.data);
          setEnquiry(response.data);
        } catch (error) {
          console.error("Error fetching enquiry details:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Buyer ID is undefined.");
      }
    };

    fetchEnquiryDetails();
  }, [id]);

  const handleMarkAsSold = async (data: {
    qty_sold: string;
    sold_price: string;
  }) => {
    try {
      const response = await purchaseEnquiriesService.markAsSold(enquiry.id, {
        qty_sold: Number(data.qty_sold),
        sold_price: Number(data.sold_price),
      });
      if (response.status === 200) {
        return {
          success: true,
          message: "Product successfully marked as sold",
        };
      } else {
        return {
          success: false,
          message: "Failed to mark as sold, please try again",
        };
      }
    } catch (error) {
      console.error("Error marking as sold:", error);
      return {
        success: false,
        message: "An error occurred while marking as sold",
      };
    }
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

  return isLoading ? (
    <DetailLoadingState message="Loading Enquiry details" />
  ) : (
    <>
      {/* {markModal ? (
        <div className="fixed z-30 flex justify-center items-center top-0 left-0 w-screen h-screen bg-black/50">
          <div
            ref={markModalRef}
            aria-label="mark order modal"
            className="md:w-[35%] flex flex-col gap-y-7 rounded-2xl p-7 bg-white"
          >
            <div className="w-full flex justify-between items-center">
              <span className="text-2xl font-semibold">Mark Order as</span>
              <FaTimes
                onClick={() => setMarkModal(false)}
                size={25}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center gap-x-3">
                <input
                  className="size-[20px] border border-primaryBorder"
                  type="checkbox"
                  id="process"
                />
                <label htmlFor="process">Process</label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  className="size-[20px] border border-primaryBorder"
                  type="checkbox"
                  id="returned"
                />
                <label htmlFor="returned">Returned</label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  className="size-[20px] border border-primaryBorder"
                  type="checkbox"
                  id="cancelled"
                />
                <label htmlFor="cancelled">Cancelled</label>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 text-sm">
              <button className="px-4 py-2.5 rounded-lg text-defaultOrange bg-secondaryOrange">
                Keep order
              </button>
              <button className="px-4 py-2.5 rounded-lg text-white bg-defaultOrange">
                Cancel order
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {cancelModal ? (
        <div className="fixed z-30 flex justify-center items-center top-0 left-0 w-screen h-screen bg-black/50">
          <div
            ref={cancelModalRef}
            aria-label="Cancel order modal"
            className="md:w-[40%] flex flex-col rounded-2xl p-7 bg-white"
          >
            <div className="w-full flex justify-between items-center">
              <span className="text-2xl font-semibold">Cancel order</span>
              <FaTimes
                onClick={() => setCancelModal(false)}
                size={25}
                className="cursor-pointer"
              />
            </div>
            <p className="text-sm mt-3">
              Cancelling this order means that you have decided not to proceed
              with the delivery. This may result in a full refund if the order
              hasn't been processed or shipped yet.
            </p>
            <div className="flex flex-col gap-y-1 w-full mt-5">
              <label className="font-semibold">Reason for cancellation</label>
              <select className="w-full p-3 rounded-lg border border-primaryBorder outline-none">
                <option>Customer changed/cancelled order</option>
              </select>
            </div>
            <h6 className="font-semibold mt-5">Settings</h6>
            <div className="flex items-center text-sm gap-x-3 mt-1">
              <input
                className="size-[20px] border border-primaryBorder"
                type="checkbox"
                id="addBack"
              />
              <label htmlFor="addBack">Add item back to stock</label>
            </div>
            <div className="flex items-center text-sm gap-x-3 mt-2">
              <input
                className="size-[20px] border border-primaryBorder"
                type="checkbox"
                id="sendNotification"
              />
              <label htmlFor="sendNotification">
                Send a notification to the customer
              </label>
            </div>
            <div className="flex justify-end items-center gap-x-2 text-sm mt-7">
              <button className="px-4 py-2.5 rounded-lg text-defaultOrange bg-secondaryOrange">
                Keep order
              </button>
              <button className="px-4 py-2.5 rounded-lg text-white bg-defaultOrange">
                Cancel order
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {invoiceModal ? (
        <div className="fixed z-30 flex justify-center items-center top-0 left-0 w-screen h-screen bg-black/50">
          <div
            ref={invoiceModalRef}
            aria-label="invoice modal"
            className="w-[40%] flex flex-col rounded-2xl p-7 bg-white"
          >
            <div className="w-full flex justify-between items-center">
              <span className="text-2xl font-semibold">Cancel order</span>
              <FaTimes
                onClick={() => setInvoiceModal(false)}
                size={25}
                className="cursor-pointer"
              />
            </div>
            <p className="text-sm mt-3">
              Sending an invoice will generate a document detailing the purchase
              and payment information for this order. The invoice will be sent
              to the email address associated with this account.
            </p>
            <div className="flex flex-col gap-y-1 w-full mt-5">
              <label className="font-semibold">Email address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 text-sm mt-7">
              <button className="px-4 py-2.5 rounded-lg text-defaultOrange bg-secondaryOrange">
                Cancel
              </button>
              <button className="px-4 py-2.5 rounded-lg text-white bg-defaultOrange">
                Send invoice
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {shipmentModal ? (
        <ShipmentModal
          shipmentModalRef={shipmentModalRef}
          setShipmentModal={setShipmentModal}
        />
      ) : null} */}
      {/* modals */}
      <AssignAgentModal
        onSubmit={handleAssignAgent}
        assignAgentModal={assignAgentModal}
        closeAssignAgentModal={() => setAssignAgentModal(false)}
      />
      <MarkAsSoldModal
        onSubmit={handleMarkAsSold}
        MarkAsSoldModal={markAsSoldModal}
        setMarkAsSoldModal={() => setMarkAsSoldModal(false)}
      />

      <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
        <div className="w-full py-3.5 px-4 md:px-10 border-b border-b-primaryBorder">
          <DashboardSearchBar />
        </div>

        <div className="px-4 md:px-10 w-full mt-4 flex flex-col flex-1">
          <div className="md:flex gap-x-4 hidden items-center">
            <Link to="/" className="text-sm opacity-60">
              Dashboard
            </Link>
            <FaChevronRight size={18} />
            <Link
              to={`/admin/purchase-enquiries`}
              className="text-sm opacity-60"
            >
              Purchase Enquiries
            </Link>
            <FaChevronRight size={18} />
            <span className="text-sm">Enquiry detail</span>
          </div>

          <section className="w-full flex justify-between items-center mt-6">
            <div className="flex flex-col gap-y-1">
              {/* <h2 className="text-2xl font-semibold">{enquiry.id}</h2> */}
              <p className="text-xs">
                Enquiry Date -{" "}
                {formatIsoString(enquiry?.created_at).formattedDate}
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => setActionModal(true)}
                className="p-3 rounded-full  bg-white border border-primaryBorder"
              >
                <HiDotsHorizontal />
              </button>
              <ActionModal
                showDropdown={actionModal}
                closeDropdown={() => setActionModal(false)}
                openAssignAgentModal={() => setAssignAgentModal(true)}
                openMarkAsSoldModal={() => setMarkAsSoldModal(true)}
                itemId={id ? parseInt(id) : 0}
              />
            </div>

            {/* dropdown div */}
          </section>

          <section className="w-full flex flex-col md:flex-row gap-6 mt-6">
            <div className=" w-full md:w-[70%] flex flex-col gap-y-5">
              <div className="w-full flex flex-col rounded-lg border border-primaryBorder bg-white">
                <div className="flex flex-col px-4 ">
                  <h4 className="py-5  flex gap-x-2 items-center font-medium">
                    Enquiry ID: {enquiry.id}
                  </h4>
                  <p className="flex gap-3 items-center">
                    <span>Status:</span>
                    <span className="rounded-[100px] capitalize text-xs font-normal px-2 py-1 bg-defaultOrange text-white">
                      {enquiry.status}
                    </span>
                  </p>
                  <p className="py-5  flex gap-x-2 items-center font-medium">
                    Product Name:{" "}
                    <span className="font-medium">{enquiry.product?.name}</span>
                  </p>
                </div>

                <div className="w-full flex flex-col border-y border-y-primaryBorder">
                  <div className="py-5 px-4 flex justify-between items-center gap-x-3">
                    <div className="flex gap-x-3 items-center">
                      <img
                        src={
                          (enquiry.product?.media[0] as unknown as string) ||
                          DefaultImage
                        }
                        alt="Product"
                        className="h-[50px] w-[66px] rounded-lg object-contain bg-gray-100"
                      />
                      <span className="font-medium line-clamp-2">
                        {enquiry.product?.type}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs opacity-70">
                      N{formatPrice(enquiry.product?.price || 0)} x{" "}
                      {enquiry.qty_sold || 0}
                    </span>
                    <span className="text-xs md:text-sm font-medium">
                      N{formatPrice(enquiry.product?.price || 0)}
                    </span>
                  </div>
                </div>

                {/* {!state?.fromTransaction ? (
                  <div className="flex justify-end py-3 px-4 border-t border-t-primaryBorder">
                    {state?.isProcessed ? (
                      <button
                        onClick={openShipmentModal}
                        className="py-3 px-5 rounded-lg text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
                      >
                        Create Shipment
                      </button>
                    ) : (
                      <button
                        onClick={openMarkModal}
                        className="py-3 px-5 rounded-lg text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                ) : null} */}
              </div>
              {/* create shipment approve */}

              <div className="w-full flex flex-col rounded-lg border border-primaryBorder bg-white">
                <h4 className="py-5 px-4 flex gap-x-2 items-center font-medium">
                  Message
                </h4>

                <div className="w-full flex flex-col border-y py-4 border-y-primaryBorder">
                  <p className="px-4 text-sm">{enquiry.message}</p>
                  {/* <div className="py-5 px-4 flex justify-between items-center gap-x-3">
                    <span className="font-medium text-sm">Subtotal</span>
                    <span className="text-sm opacity-70">1 item(s)</span>
                    <span className="text-sm font-medium">₦250,000</span>
                  </div>
                  <div className="py-5 px-4 flex justify-between items-center gap-x-3">
                    <span className="font-medium text-sm">Discount</span>
                    <span className="text-sm opacity-70">No discount</span>
                    <span className="text-sm font-medium">₦ 0</span>
                  </div>
                  <div className="py-5 px-4 flex justify-between items-center gap-x-3">
                    <span className="font-medium text-sm">Delivery</span>
                    <span className="text-sm opacity-70">
                      Peace mass transit
                    </span>
                    <span className="text-sm font-medium">₦1,000</span>
                  </div> */}
                </div>

                {/* <div className="w-full px-4 py-3 flex justify-between items-center">
                  <span className="text-lg font-medium text-defaultOrange">
                    Total:
                  </span>
                  <span className="text-lg font-semibold text-defaultOrange">
                    ₦250,000
                  </span>
                </div> */}
              </div>
            </div>

            <div className=" w-full md:w-[30%] flex flex-col gap-y-5">
              <div className="w-full flex flex-col rounded-lg bg-white border border-primaryBorder">
                <div className="flex justify-between items-center py-3 px-4 border-b border-b-primaryBorder">
                  <span className="font-medium">Customer Details</span>
                  {/* <GrEdit color="#e65800" /> */}
                </div>

                <div className="flex flex-col p-4 gap-y-6">
                  <div className="flex flex-col gap-y-1 text-sm">
                    <p className="opacity-80">Customer:</p>
                    <p className="font-medium">{enquiry.buyer?.name}</p>
                  </div>
                  <div className="flex flex-col gap-y-1 text-sm">
                    <p className="opacity-80">Email:</p>
                    <p className="font-medium">{enquiry.buyer?.email}</p>
                  </div>
                  {/* <div className="flex flex-col gap-y-1 text-sm">
                    <p className="opacity-80">Phone number:</p>
                    <p className="font-medium">07063797396</p>
                  </div>
                  <div className="flex flex-col gap-y-1 text-sm">
                    <p className="opacity-80">Order placed:</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-1 text-sm">
                    <p className="opacity-80">Payment method:</p>
                    <img
                      src={Paystack}
                      alt="payment logo"
                      className="h-[20px] w-fit"
                    />
                  </div> */}
                </div>
              </div>

              {/* <div className="w-full flex flex-col rounded-lg bg-white border border-primaryBorder">
                <div className="flex justify-between items-center py-3 px-4 border-b border-b-primaryBorder">
                  <span className="font-medium">Delivery details</span>
                 
                </div>

                <div className="flex flex-col p-4 gap-y-6">
                  <div className="flex flex-col gap-y-1 text-sm">
                    <p className="opacity-80">Delivery address:</p>
                    <p className="font-medium">
                      Mubinu. Osogbo, Osun, Ifedayo, Osun State , Nigeria
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-1 text-sm">
                    <p className="opacity-80">Delivery agent:</p>
                    <p className="font-medium">Peace mass transit</p>
                  </div>
                </div>
              </div> */}
            </div>
          </section>

          {state?.fromTransaction ? (
            <div className="w-full mt-5 rounded-[16px] p-6 flex flex-col border border-primaryBorder bg-white">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-xl md:text-2xl  font-semibold">
                    Shipment 73KJFHIUDF4
                  </h2>
                  <p className="text-sm">
                    Jun 2, 2023{" "}
                    <span className="rounded-[100px] px-2 py-0.5 bg-[#FBF5D6]">
                      In transit
                    </span>
                  </p>
                </div>
                <div className="flex gap-x-2">
                  <button className="rounded-lg text-xs  md:text-sm px-3 md:px-5 py-1 md:py-2.5 text-white bg-defaultOrange">
                    Track
                  </button>
                  <button className="rounded-lg text-xs  md:text-sm px-3 md:px-5 py-1 md:py-2.5 text-defaultOrange border border-defaultOrange">
                    Contact carrier
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-1 mt-7">
                <h5 className="text-lg font-semibold mb-3">
                  Shipment information
                </h5>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">Client Account Number:</span>
                  <span className="font-medium">
                    {shipment.data.accountNumber}
                  </span>
                </div>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">Customer Name:</span>
                  <span className="font-medium">{shipment.data.name}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">Item:</span>
                  <span className="font-medium">{shipment.data.itemName}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">Tracking Number:</span>
                  <span className="font-medium">
                    {shipment.data.trackingNumber}
                  </span>
                </div>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">Shipping carrier:</span>
                  <span className="font-medium">
                    {shipment.data.shippingCenter}
                  </span>
                </div>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">Status:</span>
                  <span className="font-medium">{shipment.data.status}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">E.D.D:</span>
                  <span className="">{shipment.data.edd}</span>
                </div>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">Delivery Address:</span>
                  <span className="font-medium">
                    {shipment.data.deliveryAddress}
                  </span>
                </div>
                <div className="flex items-center gap-x-2 text-sm border-b border-b-primaryBorder py-2">
                  <span className="opacity-60">Phone:</span>
                  <span className="font-medium">{shipment.data.phone}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
