import { GridColDef } from "@mui/x-data-grid";
import { BiEditAlt } from "react-icons/bi";
import { FaChevronRight, FaRegEye } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "../components/table/TableComponent";
import { formatPrice, generateRandomNumber } from "../helper/helperFunctions";

const rows = (): any[] => {
  const loopArray = [1, 2, 3];
  const returnArray: any[] = [];
  loopArray.forEach((num) => {
    returnArray.push({
      id: "CAR100" + num,
      name: "Toyota Camry 2018",
      price: "₦ " + formatPrice(generateRandomNumber(20000000, 100000)),
      location: "Lekki, Lagos",
      uploadDate: new Date(),
      lastUpdated: new Date(),
    });
  });
  return returnArray;
};

export default function Listing() {
  const location = useLocation();
  const { pathname } = location;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, sortable: false },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "location", headerName: "Location", flex: 1, sortable: false },
    { field: "id", headerName: "Product ID", flex: 0.8, sortable: false },
    {
      field: "uploadDate",
      headerName: "Upload Date",
      flex: 0.8,
      type: "date",
    },
    {
      field: "lastUpdated",
      headerName: "Last Upadated",
      flex: 0.8,
      type: "date",
    },
    {
      field: "Action",
      renderCell: () => {
        return (
          <div className="h-full w-full relative flex gap-x-4 justify-center items-center overflow-visible">
            <Link to={`/products/product`}>
              <FaRegEye size={20} />
            </Link>
            <Link to={`/products/add-product`}>
              <BiEditAlt size={20} />
            </Link>
            <GoTrash className="flex-shrink-0" size={20} />
          </div>
        );
      },
      flex: 1,
      sortable: false,
      headerName: "",
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
      <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-24 w-full mt-4 flex flex-col flex-1">
        <div className="flex gap-x-4 items-center">
          <Link to={`/listings`} className="text-sm opacity-60">
            Listings
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Car</span>
        </div>

        <h1 className="text-3xl font-bold flex items-start mt-2">
          Car{" "}
          <span className="text-xs text-defaultOrange">{rows().length}</span>
        </h1>

        <div className="flex justify-between items-end mt-5 w-full">
          <div className="flex gap-x-5 items-center">
            <div className="flex flex-col gap-y-1">
              <p className="text-xs">Date uploaded:</p>
              <input
                className="p-2.5 text-sm rounded-lg border border-primaryBorder bg-white outline-none"
                type="date"
              />
            </div>
          </div>

          <div className="flex gap-x-2 px-3 basis-[25%] rounded-lg border border-primaryBorder">
            <CiSearch className="h-fit w-fit my-auto" size={24} />
            <input
              className="flex-1 py-2.5 outline-none border-none text-sm bg-transparent"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-1 w-full overflow-hidden bg-white">
          <MuiTableComponent
            columns={columns}
            rows={rows()}
            paginationActive={true}
            rowHeight={60}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
}
