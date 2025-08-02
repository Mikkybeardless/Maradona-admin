import MuiTableComponent from "../components/TableComponent";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { GridColDef } from "@mui/x-data-grid";
import { FaArrowLeftLong, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DateSelect } from "../components/common/dateSelect";
import { generateRandomNumber } from "../helper/helperFunctions";
import { DistanceRange } from "../components/shipmentRangeInput";
import { NumberInput } from "../components/shipmentAmountInput";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { StatusSelect } from "../components/common/statusSelect";
import { useDebounce } from "../hooks/useDebounce";
import { Dayjs } from "dayjs";
import ShipmentModal from "../components/modals/shipment-modal";

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

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      <ShipmentModal
        shipmentModal={shipmentModal}
        setShipmentModal={setShipmentModal}
      />
      <div className="w-full py-5 px-5 md:pl-[250px] md:pr-[100px] bg-white fixed z-10 left-10 top-0 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      {shipment.active ? (
        <main className=" px-4 md:px-10 mt-10 w-full  flex flex-col gap-y-6 flex-1">
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
                <h2 className=" text-lg md:text-2xl font-semibold">
                  Shipment 73KJFHIUDF4
                </h2>
                <p className="text-sm">
                  Jun 2, 2023{" "}
                  <span className="rounded-[100px] px-2 py-0.5 bg-[#FBF5D6]">
                    In transit
                  </span>
                </p>
              </div>
              <div className="flex flex-col md:flex-row  gap-2">
                <Link
                  to="/admin/shipments/track-shipment"
                  className="flex  justify-center rounded-lg text-xs md:text-sm md:px-5 px-3 py-1.5 md:py-2.5 text-white bg-defaultOrange"
                >
                  Track
                </Link>
                <button className="rounded-lg text-xs md:text-sm md:px-5 px-3 py-1 md:py-2.5 text-defaultOrange border border-defaultOrange">
                  Contact carrier
                </button>
              </div>
            </div>

            <div className="flex flex-col flex-1 mt-7">
              <h5 className="text-lg font-semibold mb-3">
                Shipment information
              </h5>
              <div className="flex items-center gap-5 md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">
                  Client Account Number:
                </span>
                <span className="font-medium">
                  {shipment.data.accountNumber}
                </span>
              </div>
              <div className="flex items-center gap-5 md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Customer Name:</span>
                <span className="font-medium">{shipment.data.name}</span>
              </div>
              <div className="flex items-center md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Item:</span>
                <span className="font-medium">{shipment.data.itemName}</span>
              </div>
              <div className="flex items-center gap-5 md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Tracking Number:</span>
                <span className="font-medium">
                  {shipment.data.trackingNumber}
                </span>
              </div>
              <div className="flex items-center gap-5 md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Shipping carrier:</span>
                <span className="font-medium">
                  {shipment.data.shippingCenter}
                </span>
              </div>
              <div className="flex items-center gap-5 md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Status:</span>
                <span className="font-medium">{shipment.data.status}</span>
              </div>
              <div className="flex items-center gap-5 md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">E.D.D:</span>
                <span className="">{shipment.data.edd}</span>
              </div>
              <div className="flex items-center gap-5 md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
                <span className="opacity-60 w-[200px]">Delivery Address:</span>
                <span className="font-medium">
                  {shipment.data.deliveryAddress}
                </span>
              </div>
              <div className="flex items-center gap-5 md:gap-x-[300px] text-sm border-b border-b-primaryBorder py-2">
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
              <section
                id="shipments-table"
                className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
              >
                <div className="min-w-[900px]">
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
