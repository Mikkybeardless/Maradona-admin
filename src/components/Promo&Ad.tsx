import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "./table/TableComponent";
import LineChartComponent from "./LineChart";
import { ProgressUI } from "./common/progressUi";
import { VscCircleFilled } from "react-icons/vsc";
import { PiExport, PiMagnetStraightLight } from "react-icons/pi";
import { HiMiniChartBarSquare } from "react-icons/hi2";
import { AiFillFileText } from "react-icons/ai";
import { LuRefreshCw } from "react-icons/lu";
import { Button } from "@mui/material";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { DateSelect } from "./common/dateSelect";
import { HiSortDescending } from "react-icons/hi";
import { TableSearchInput } from "./common/TableSearchInput";
import { FilterGroup } from "./common/FilterGroup";
import { useDebounce } from "../hooks/useDebounce";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { StatusSelect } from "./common/statusSelect";
import { usePaginatedData } from "../hooks/usePaginatedData";
import promotionService from "../api/services/promotion.service";
import { useNavigate } from "react-router-dom";

interface PromoAdProps {
  columns: GridColDef[];
}

type IFilter = {
  status: string;
  date: Dayjs | null;
};
export default function PromoAd({ columns }: PromoAdProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    status: "",
    date: null,
  });

  const [promoData, setPromoData] = usePaginatedData(
    promotionService.getAllPromotions,
    {
      initialPage: 1,
      initialPageSize: 10,
      filters: {
        status: filters.status,
        search: debouncedSearchQuery,
      },
      dataName: "Promotionss",
    }
  );

  const handleRowClick = (params: GridRowParams) => {
    console.log("item", params.row);
    // navigate(`/admin/buyers/buyer/${params.row.id}`);
  };

  return (
    <div className="flex flex-col gap-20">
      {/* table */}
      <section id="promotion-table" className="">
        {/* Filters & Search Bar */}
        <div className="flex flex-wrap gap-3 justify-between items-end  w-full">
          <div className="flex gap-x-5 items-center">
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
          </div>

          <TableSearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search Promotions"
          />
        </div>

        <section
          id="table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={columns}
              rows={promoData.rows}
              loading={promoData.loading}
              currentPage={promoData.pagination.page}
              totalRowCount={promoData.totalRowCount}
              onPageChange={(model) => {
                setPromoData((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              rowHeight={60}
              showCheckbox={false}
              pageSize={promoData.pagination.pageSize}
            />
          </div>
        </section>
      </section>
    </div>
  );
}
