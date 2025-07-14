import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "../components/TableComponent";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { GridColDef } from "@mui/x-data-grid";
import { FaArrowLeftLong, FaPlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useClickAway } from "react-use";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { Link } from "react-router-dom";
import CustomDateInput from "../components/common/dateInput";
import { HiSortDescending } from "react-icons/hi";
import { DateSelect } from "../components/common/dateSelect";
import { generateRandomNumber } from "../helper/helperFunctions";
import { DistanceRange } from "../components/shipmentRangeInput";
import { NumberInput } from "../components/shipmentAmountInput";
import StateCitySelector from "../components/StateCitySelector";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { StatusSelect } from "../components/common/statusSelect";
import { useDebounce } from "../hooks/useDebounce";
import { Dayjs } from "dayjs";

interface IFilter {
  status: string;
  date: Dayjs | null;
}
export default function Shipments() {
  // const location = useLocation();
  // const { pathname } = location;
  const [shipment, setShipment] = useState({
    active: true,
    data: {
      accountNumber: "00224455856",
      name: "Rosemary Sunday",
      itemName: "Toyota Camry 2015",
      trackingNumber: "1234567890",
      shippingCenter: "",
      status: "In Transit",
      edd: new Date().toLocaleDateString(),
      deliveryAddress: "123 Main St, Springfield, IL",
      phone: "+234 5846 258",
    },
  });
  const [shipmentModal, setShipmentModal] = useState(false);
  const promotionModalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    zip: "",
    product: "",
    productDescription: "",
    shippingCarrier: "",
    edd: null,
    trackingNumber: "",
    deliveryAddress: "",
    streetAddress: "",
    address: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [actFilters, setActFilters] = useState<IFilter>({
    status: "",
    date: null,
  });
  const [compFilters, setCompFilters] = useState<IFilter>({
    status: "",
    date: null,
  });
  const [shipmentType, setShipmentType] = useState<
    "active" | "completed" | "settings"
  >("active");

  const [shippingSettings, setShippingSettings] = useState({
    distance: 0,
    price: 0,
  });

  useClickAway(promotionModalRef, () => {
    setShipmentModal(false);
  });

  function openShipmentModal() {
    setShipmentModal(true);
  }

  const handleSettingSave = () => {
    // Logic to save the shipping settings
    console.log("Shipping Settings Saved:", shippingSettings);
  };

  const rows = (): any[] => {
    const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const returnArray: any[] = [];
    loopArray.forEach((num) => {
      const randomNum = generateRandomNumber(3, 1);
      returnArray.push({
        id: num,
        name: "Toyota Camry 2015",
        trackingNumber: "12345670",
        shippingCarrier: "FedEx",
        status:
          randomNum === 1
            ? "Intransit"
            : randomNum === 2
            ? "Canceled"
            : "Delivered",
        edd: new Date(),
        address: "123 Main St, Springfield, IL",
      });
    });
    return returnArray;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", flex: 0.2 },
    { field: "name", headerName: "Item", flex: 1, sortable: false },
    {
      field: "trackingNumber",
      headerName: "Tracking Number",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "shippingCarrier",
      headerName: "Shipping Carrier",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ value }) => {
        return (
          <span
            className={`${
              value === "Canceled"
                ? "text-[#DC1313]"
                : value === "Intransit"
                ? "text-[#1316dc]"
                : "text-[#0C560B]"
            }`}
          >
            {value}
          </span>
        );
      },
      flex: 0.5,
      sortable: false,
    },
    { field: "edd", headerName: "E.D.D", flex: 0.5, type: "date" },
    { field: "address", headerName: "Delivery Address", flex: 1 },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      {shipmentModal && (
        <section className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
          <div
            ref={promotionModalRef}
            aria-modal
            className="w-[85%] md:w-[40%] h-[95%] flex flex-col gap-y-3 p-8 rounded-[24px]  bg-white"
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Create Shipment</h2>
              <FaTimes
                onClick={() => setShipmentModal(false)}
                className="cursor-pointer"
                size={24}
              />
            </div>

            <div className="flex-1 flex flex-col gap-y-6 mt-3 overflow-y-auto custom-scrollbar-low-opacity">
              <div className="flex flex-col gap-y-1 text-sm">
                <label className="font-medium">Customer Name:</label>
                <input
                  className="p-3 rounded-lg border border-[#B0B0B0]"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-1 text-sm">
                <label className="font-medium">Phone:</label>
                <div className="w-full flex items-end gap-x-6">
                  <PhoneInput
                    className="!w-full gap-x-5"
                    countrySelectorStyleProps={{
                      className: "w-[20%]",
                      buttonClassName:
                        "!h-[auto] w-full py-3 !rounded-lg border-[#B0B0B0]",
                    }}
                    defaultCountry="ng"
                    onChange={(val) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        phone: val,
                      }));
                    }}
                    value={formData.phone}
                    inputClassName="w-full !h-[unset] !py-3 !rounded-lg outline-none !border !border-[#B0B0B0] !text-base"
                  />
                </div>
              </div>

              <StateCitySelector
                onCityChange={(city) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    city: city?.value || "",
                  }));
                }}
                onStateChange={(state) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    state: state?.value || "",
                  }));
                }}
              />
              <div className="flex flex-col gap-y-1 text-sm">
                <label className="font-medium">Zip:</label>
                <input
                  className="p-3 rounded-lg border border-[#B0B0B0]"
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-1 text-sm">
                <label htmlFor="streetAddress" className="font-medium">
                  Street Address:
                </label>
                <input
                  className="p-3 rounded-lg border border-[#B0B0B0]"
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-1 text-sm">
                <label htmlFor="product" className="font-medium">
                  Product:
                </label>
                <input
                  className="p-3 rounded-lg border border-[#B0B0B0]"
                  type="text"
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-1 text-sm">
                <label htmlFor="productDescription" className="font-medium">
                  Product description:
                </label>
                <textarea
                  className="p-3 rounded-lg resize-none outline-none custom-scrollbar border border-[#B0B0B0]"
                  placeholder="Type"
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="flex flex-col gap-y-1 text-sm">
                <label htmlFor="shippingCarrier" className="font-medium">
                  Shipping carrier:
                </label>
                <input
                  className="p-3 rounded-lg border border-[#B0B0B0]"
                  type="text"
                  id="shippingCarrier"
                  name="shippingCarrier"
                  value={formData.shippingCarrier}
                  onChange={handleInputChange}
                  placeholder="Type"
                />
              </div>
              <div className="flex flex-col gap-y-1 text-sm">
                <CustomDateInput
                  label="E.D.D:"
                  value={formData.edd}
                  // onChange={(date) => {
                  //   setFormData((prevData) => ({
                  //     ...prevData,
                  //     edd: date ? date.toLocaleDateString() : null,
                  //   }));
                  // }}
                  // iconColor="text-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-x-2.5 text-sm">
              <button className="p-2.5 rounded-lg text-white bg-defaultOrange hover:bg-defaultOrangeHover">
                Create
              </button>
            </div>
          </div>
        </section>
      )}
      <div className="w-full py-5 px-10 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      {shipment.active ? (
        <main className="px-10 w-full mt-4 flex flex-col gap-y-6 flex-1">
          <button
            onClick={() =>
              setShipment({
                active: false,
                data: {
                  accountNumber: "",
                  name: "",
                  itemName: "",
                  trackingNumber: "",
                  shippingCenter: "",
                  status: "",
                  edd: new Date().toLocaleDateString(),
                  deliveryAddress: "",
                  phone: "",
                },
              })
            }
            className="flex gap-x-3 items-center text-sm hover:underline w-fit"
          >
            <FaArrowLeftLong />
            <span className="">Back to shipments</span>
          </button>

          <div className="flex-1 rounded-[16px] p-6 flex flex-col border border-primaryBorder bg-white">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-y-1">
                <h2 className="text-2xl font-semibold">Shipment 73KJFHIUDF4</h2>
                <p className="text-sm">
                  Jun 2, 2023{" "}
                  <span className="rounded-[100px] px-2 py-0.5 bg-[#FBF5D6]">
                    In transit
                  </span>
                </p>
              </div>
              <div className="flex gap-x-2">
                <Link
                  to="/shipments/track-shipment"
                  className="rounded-lg text-sm px-5 py-2.5 text-white bg-defaultOrange"
                >
                  Track
                </Link>
                <button className="rounded-lg text-sm px-5 py-2.5 text-defaultOrange border border-defaultOrange">
                  Contact carrier
                </button>
              </div>
            </div>

            <div className="flex flex-col flex-1 mt-7">
              <h5 className="text-lg font-semibold mb-3">
                Shipment information
              </h5>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">
                  Client Account Number:
                </span>
                <span className="font-medium">
                  {shipment.data.accountNumber}
                </span>
              </div>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Customer Name:</span>
                <span className="font-medium">{shipment.data.name}</span>
              </div>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Item:</span>
                <span className="font-medium">{shipment.data.itemName}</span>
              </div>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Tracking Number:</span>
                <span className="font-medium">
                  {shipment.data.trackingNumber}
                </span>
              </div>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Shipping carrier:</span>
                <span className="font-medium">
                  {shipment.data.shippingCenter}
                </span>
              </div>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Status:</span>
                <span className="font-medium">{shipment.data.status}</span>
              </div>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">E.D.D:</span>
                <span className="">{shipment.data.edd}</span>
              </div>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Delivery Address:</span>
                <span className="font-medium">
                  {shipment.data.deliveryAddress}
                </span>
              </div>
              <div className="flex items-center gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Phone:</span>
                <span className="font-medium">{shipment.data.phone}</span>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
          <div className="flex justify-between items-center mt-1">
            <h1 className="text-3xl font-bold flex items-start">Shipments</h1>

            <button
              onClick={openShipmentModal}
              className="rounded-lg flex items-center gap-x-3 text-sm px-3 py-1 md:px-5 md:py-2.5 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              <FaPlus />
              New Shipment
            </button>
          </div>

          <nav
            id="shipment-type-nav"
            className="w-full md:w-fit flex gap-x-10 justify-between md:justify-start items-center mt-3 text-sm border-b border-b-primaryBorder"
          >
            <button
              className={`${
                shipmentType === "active"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                shipmentType !== "active" ? setShipmentType("active") : null
              }
            >
              Active <span className="text-xs text-defaultOrange">10</span>
            </button>
            <button
              className={`${
                shipmentType === "completed"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                shipmentType !== "completed"
                  ? setShipmentType("completed")
                  : null
              }
            >
              Completed <span className="text-xs text-defaultOrange">23</span>
            </button>

            <button
              className={`${
                shipmentType === "settings"
                  ? "border-b-[3px] border-b-defaultOrange"
                  : "text-[#585858]"
              } py-3`}
              onClick={() =>
                shipmentType !== "settings" ? setShipmentType("settings") : null
              }
            >
              Shipment Settings
            </button>
          </nav>

          {shipmentType === "settings" && (
            <div className="mt-5 flex flex-col gap-[34px]">
              <p className="">Set your shipping cost per distance travelled</p>
              <div className="w-[250px] md:w-[400px]">
                <DistanceRange
                  onValueChange={(value, _) => {
                    setShippingSettings((prev) => ({
                      ...prev,
                      distance: value,
                    }));
                  }}
                />
              </div>

              <div>
                <p className="">Set Price</p>
                <NumberInput
                  min={0}
                  max={1000000}
                  step={10}
                  defaultValue={0}
                  onValueChange={(price: number) => {
                    setShippingSettings((prev) => ({
                      ...prev,
                      price,
                    }));
                  }}
                />
              </div>

              <button
                onClick={handleSettingSave}
                className="text-white w-fit bg-[#F16139] px-5 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          )}

          {shipmentType === "active" && (
            <section>
              <div className="flex flex-wrap gap-y-1  justify-between items-end mt-5 w-full">
                <div className="flex gap-x-5 items-center">
                  <StatusSelect
                    options={[
                      { label: "Published", value: "published" },
                      { label: "Pending", value: "pending" },
                      { label: "Cancelled", value: "cancelled" },
                    ]}
                    onChange={(value) => {
                      setActFilters((prev) => ({ ...prev, status: value }));
                    }}
                    value={actFilters.status}
                  />
                  <DateSelect
                    onChange={(date) => {
                      setActFilters((prev) => ({ ...prev, date }));
                    }}
                    value={actFilters.date}
                  />
                </div>

                <TableSearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  placeholder="Search orders"
                />
              </div>
              <div className="mt-3 flex flex-1 w-full min-h-[400px] overflow-hidden bg-white">
                <MuiTableComponent
                  columns={columns}
                  rows={rows()}
                  showCheckbox={false}
                  paginationActive={true}
                  rowHeight={60}
                  pageSize={10}
                />
              </div>
            </section>
          )}

          {shipmentType === "completed" && (
            <section>
              <div className="flex flex-wrap gap-y-1  justify-between items-end mt-5 w-full">
                <div className="flex gap-x-5 items-center">
                  <StatusSelect
                    options={[
                      { label: "Published", value: "published" },
                      { label: "Pending", value: "pending" },
                      { label: "Cancelled", value: "cancelled" },
                    ]}
                    onChange={(value) => {
                      setCompFilters((prev) => ({ ...prev, status: value }));
                    }}
                    value={compFilters.status}
                  />
                  <DateSelect
                    onChange={(date) => {
                      setCompFilters((prev) => ({ ...prev, date }));
                    }}
                    value={compFilters.date}
                  />
                </div>

                <TableSearchInput
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  placeholder="Search orders"
                />
              </div>
              <div className="mt-3 flex flex-1 w-full min-h-[400px] overflow-hidden bg-white">
                <MuiTableComponent
                  columns={columns}
                  rows={rows()}
                  showCheckbox={false}
                  paginationActive={true}
                  rowHeight={60}
                  pageSize={10}
                />
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
}
