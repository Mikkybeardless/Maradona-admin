import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import MuiTableComponent from "../components/TableComponent";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useClickAway } from "react-use";
import productService from "../api/services/product.service";
import Cookies from "js-cookie";
import { DateSelect } from "../components/common/dateSelect";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { FilterGroup } from "../components/common/FilterGroup";
import { Dayjs } from "dayjs";
import { useDebounce } from "../hooks/useDebounce";
import { StatusSelect } from "../components/common/statusSelect";

type ProdcutTableType = {
  name: string;
  type: "LAND" | "CAR" | "HOUSE";
  description: string;
  category_id: null | number;
  sku: null | string;
  price: string;
  sale_price: null | string;
  status: "draft" | "publish";
  inventory: null | string;
  weight: null | string;
  body_type: null | string;
  auction_duration: null | string;
  condition: null | string;
  mode: null | string;
  gear_type: null | string;
  engine_type: null | string;
  mileage: null | string;
  location_state: null | string;
  location_city: null | string;
  location_address: null | string;
};

// const rows = (): ProdcutTableType[] => {
//   const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//   const returnArray: ProdcutTableType[] = [];
//   loopArray.forEach((num) => {
//     const statusPicker = generateRandomNumber(3, 1);
//     returnArray.push({
//       id: num,
//       thumbnail_img: Car,
//       name: "Toyota Camry LE (2024)",
//       category: "Car",
//       price: generateRandomNumber(5000000, 100000),
//       stock: generateRandomNumber(10, 0),
//       status:
//         statusPicker === 1
//           ? "Published"
//           : statusPicker === 2
//           ? "Archived"
//           : statusPicker === 3
//           ? "Draft"
//           : "",
//     });
//   });
//   return returnArray;
// };

// function renderStatusColor(status: string) {
//   if (status.toLowerCase() === "published")
//     return "bg-[#E8F8E8] text-[#0C560B]";
//   else if (status.toLowerCase() === "archived")
//     return "bg-[#FEF3B8] text-[#D7B813]";
//   else if (status.toLowerCase() === "draft")
//     return "bg-[#DAE9FB] text-[#0B283E]";
// }

type IFilter = {
  category: string;
  status: string;
  date: Dayjs | null;
};

export default function Products() {
  // const location = useLocation();
  // const { pathname } = location;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const navigate = useNavigate();
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl2);
  const [rows, setRows] = useState<ProdcutTableType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    category: "",
    status: "",
    date: null,
  });

  useEffect(() => {
    const fetProducts = async () => {
      const response = await productService.getAllProducts();
      console.log("Products:", response.data.data);
      // setRows(response.data.data);
    };
    fetProducts();
  }, []);

  // useEffect(() => {
  //   const normalizedQuery = debouncedSearchQuery.toLowerCase();

  //   const filtered = allRows.filter((row) => {

  //     // Search filter (e.g., match against name or details)
  //     const searchMatch =
  //       row.name.toLowerCase().includes(normalizedQuery) ||
  //       row.details.toLowerCase().includes(normalizedQuery);

  //     // Custom filters
  //     const categoryMatch = filters.category ? row.category === filters.category : true;
  //     const statusMatch = filters.status ? row.status === filters.status : true;
  //     const dateMatch = filters.date
  //       ? row.date.startsWith(filters.date.toISOString().slice(0, 10))
  //       : true;

  //     // Combine
  //     return dateMatch && searchMatch && categoryMatch && statusMatch;
  //   });

  // }, [filters, debouncedSearchQuery]);

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/admin/products/product/${params.row.id}`);
  };

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: any) => {
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.1 },
    {
      field: "name",
      headerName: "Product",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div className="flex flex-1 h-full items-center gap-x-2">
            <img
              className="w-20 h-auto rounded-lg object-contain bg-gray-100"
              src={row.thumbnail_img}
              alt="Product"
            />
            <span className="text-sm">{row.productName}</span>
          </div>
        );
      },
      flex: 4,
    },
    { field: "category", headerName: "Category" },
    { field: "price", headerName: "Price(₦)", type: "number" },
    { field: "current_stock", headerName: "Stock", type: "number", flex: 1 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   renderCell: ({ row }) => {
    //     return (
    //       <div className="w-full h-full items-center flex justify-center">
    //         <span
    //           className={`${renderStatusColor(
    //             row.status
    //           )} rounded-[100px] !text-xs px-2.5 py-1`}
    //         >
    //           {row.status}
    //         </span>
    //       </div>
    //     );
    //   },
    //   flex: 1,
    // },
    // {
    //   field: "Action",
    //   flex: 0.5,
    //   renderCell: () => {
    //     return (
    //       <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
    //         <BsThreeDotsVertical
    //           aria-describedby={id}
    //           type="button"
    //           onClick={handleClick}
    //           size={16}
    //           className="cursor-pointer"
    //         />
    //         <Popper
    //           ref={dotsPopupRef}
    //           className="p-3 text-sm z-10 flex gap-x-4 items-center rounded-lg border border-primaryBorder bg-white"
    //           id={id}
    //           open={open}
    //           anchorEl={anchorEl}
    //         >
    //           <Link to={`/products/product`}>
    //             <FaRegEye size={18} />
    //           </Link>

    //           <BiEditAlt size={18} />
    //           <GoTrash size={18} />
    //         </Popper>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-5 md:px-10 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className=" px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex gap-x-4 items-center">
          <Link to={`/`} className="text-sm opacity-60">
            Dashboard
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Products</span>
        </div>

        <div className="flex justify-between items-center mt-1">
          <h1 className="text-3xl font-bold">Products</h1>
          <Link
            to={`/admin/products/add-product`}
            className="rounded-lg px-3 py-1 md:px-5 md:py-3 flex gap-x-3 items-center text-white text-sm bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            <FaPlus size={20} /> Add product
          </Link>
        </div>

        {/* Filters & Search Bar */}
        <div className="">
          <FilterGroup
            filters={filters}
            onChange={(updated) => {
              setFilters((prev) => ({ ...prev, ...updated }));
            }}
            selects={[
              {
                name: "category",
                placeholder: "Category",
                options: [
                  { label: "House", value: "house" },
                  { label: "Cars", value: "cars" },
                  { label: "Land", value: "land" },
                ],
              },
            ]}
            extraFilters={
              <>
                <StatusSelect
                  options={[
                    { label: "Published", value: "published" },
                    { label: "Pending", value: "pending" },
                    { label: "Cancelled", value: "cancelled" },
                  ]}
                  onChange={(value) => {
                    setFilters((prev) => ({ ...prev, status: value }));
                  }}
                  value={filters.status}
                />
                <DateSelect
                  onChange={(date) => {
                    setFilters((prev) => ({ ...prev, date }));
                  }}
                  value={filters.date}
                />
              </>
            }
            searchNode={
              <TableSearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search orders"
              />
            }
          />
        </div>

        <section
          id="products-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={columns}
              rows={rows}
              onRowClick={handleRowClick}
              paginationActive={true}
              showCheckbox={true}
              // onSelect={handleTableSelectionChange}
              rowHeight={60}
              pageSize={10}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
