import MuiTableComponent from "./table/TableComponent";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { TableSearchInput } from "./common/TableSearchInput";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { StatusSelect } from "./common/statusSelect";
import { usePaginatedData } from "../hooks/usePaginatedData";
import promotionService from "../api/services/promotion.service";

interface PromoAdProps {
  columns: GridColDef[];
  totalPromotions?: (total: number) => void;
}

type IFilter = {
  status: string;
};
export default function PromoAd({ columns, totalPromotions }: PromoAdProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    status: "",
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
  useEffect(() => {
    if (totalPromotions) {
      totalPromotions(promoData.totalRowCount);
    }
  }, [promoData.totalRowCount]);

  return (
    <div className="flex flex-col gap-20">
      {/* table */}
      <section id="promotion-table" className="">
        {/* Filters & Search Bar */}
        <div className="flex flex-wrap gap-3 justify-between items-end  w-full">
          <div className="flex gap-x-5 items-center">
            <StatusSelect
              options={[
                { label: "Active", value: "active" },
                { label: "Pending Payment", value: "pending_payment" },
                // { label: "Cancelled", value: "cancelled" },
              ]}
              onChange={(value) => {
                setFilters((prev) => ({ ...prev, status: value }));
              }}
              value={filters.status}
            />
            {/* <DateSelect
              onChange={(date) => {
                setFilters((prev) => ({ ...prev, date }));
              }}
              value={filters.date}
            /> */}
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
