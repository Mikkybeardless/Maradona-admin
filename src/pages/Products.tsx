import { Link, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight, FaRegEye } from "react-icons/fa6";
import MuiTableComponent from "../components/table/TableComponent";
import { GridRowParams } from "@mui/x-data-grid";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useClickAway } from "react-use";
import productService from "../api/services/product.service";
import { DateSelect } from "../components/common/dateSelect";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { FilterGroup } from "../components/common/FilterGroup";
import { Dayjs } from "dayjs";
import { useDebounce } from "../hooks/useDebounce";
import { StatusSelect } from "../components/common/statusSelect";
// import { toast } from "react-toastify";
import formatDayJs from "../helper/formatDateJs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popper } from "@mui/material";
import { BiEditAlt } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { usePaginatedData } from "../hooks/usePaginatedData";
import { ProductColumns } from "../components/table/columns";

type IFilter = {
  type: string;
  status: string;
  date: Dayjs | null;
};

export default function Products() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    type: "",
    status: "",
    date: null,
  });

  const handleTableSelectionChange = (selectedRows: any[]) => {
    console.log("Selected Rows:", selectedRows);
  };

  const formatedDate = formatDayJs(filters.date);
  const [productData, setProductData] = usePaginatedData(
    productService.getAllProducts,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        status: filters.status,
        type: filters.type,
        created_at: formatedDate,
        search: debouncedSearchQuery,
      },
      dataName: "Products",
    }
  );

  const handleRowClick = (params: GridRowParams) => {
    console.log("Row clicked:", params.row);
    navigate(`/admin/products/product/${params.row.id}`);
  };

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
                name: "type",
                placeholder: "Category",
                options: [
                  { label: "All", value: "" },
                  { label: "House", value: "HOUSE" },
                  { label: "Cars", value: "CAR" },
                  { label: "Land", value: "LAND" },
                ],
              },
            ]}
            extraFilters={
              <>
                <StatusSelect
                  options={[
                    { label: "All", value: "" },
                    { label: "Published", value: "published" },
                    { label: "Pending", value: "pending" },
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
              columns={ProductColumns}
              rows={productData.rows}
              onRowClick={handleRowClick}
              loading={productData.loading}
              currentPage={productData.pagination.page}
              totalRowCount={productData.totalRowCount}
              onPageChange={(model) => {
                setProductData((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              showCheckbox={true}
              onSelect={handleTableSelectionChange}
              rowHeight={60}
              pageSize={productData.pagination.pageSize}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export const ProductActionCellComponent = ({ row }: { row: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? `popper-${row.id}` : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleDelete = (id: number) => {
    console.log("deleting product with id:", id);
  };

  const handleEdit = (id: number) => {
    console.log("editing product id:", id);
  };

  return (
    <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className="cursor-pointer bg-transparent border-none p-2 m-0 rounded-full hover:bg-gray-100"
        style={{ lineHeight: 0 }}
      >
        <BsThreeDotsVertical size={16} />
      </button>
      <Popper
        ref={dotsPopupRef}
        className="p-3 text-sm z-10 flex gap-x-4 items-center rounded-lg border border-primaryBorder bg-white"
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 8,
            },
          },
        ]}
      >
        <Link to={`/products/product/${row.id}`}>
          <FaRegEye size={18} />
        </Link>
        <button onClick={() => handleEdit(row.id)}>
          <BiEditAlt size={18} />
        </button>

        <button onClick={() => handleDelete(row.id)}>
          <GoTrash size={18} />
        </button>
      </Popper>
    </div>
  );
};
