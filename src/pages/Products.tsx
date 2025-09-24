import { Link, useNavigate } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight, FaRegEye } from "react-icons/fa6";
import MuiTableComponent from "../components/table/TableComponent";
import { GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import productService from "../api/services/product.service";
import { DateSelect } from "../components/common/dateSelect";
import { TableSearchInput } from "../components/common/TableSearchInput";
import { FilterGroup } from "../components/common/FilterGroup";
import { Dayjs } from "dayjs";
import { useDebounce } from "../hooks/useDebounce";
import { StatusSelect } from "../components/common/statusSelect";
import formatDayJs from "../helper/formatDateJs";
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
    // console.log("Row clicked:", params.row);
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
              // updateFilters({
              //   status: (updated.status !== undefined ? updated.status : filters.status),
              //   type: (updated.type !== undefined ? updated.type : filters.type),
              //   created_at: formatDayJs(updated.date !== undefined ? updated.date : filters.date),
              //   // Remove 'date' property, only pass allowed keys
              // })
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
              currentPage={productData.pagination.page} // Adjust for zero-based index
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
