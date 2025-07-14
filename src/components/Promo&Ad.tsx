import { CiSearch } from "react-icons/ci";
import MuiTableComponent from "./TableComponent";
import LineChartComponent from "./LineChart";
import { ProgressUI } from "./common/progressUi";
import { VscCircleFilled } from "react-icons/vsc";
import { PiExport, PiMagnetStraightLight } from "react-icons/pi";
import { HiMiniChartBarSquare } from "react-icons/hi2";
import { AiFillFileText } from "react-icons/ai";
import { LuRefreshCw } from "react-icons/lu";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DateSelect } from "./common/dateSelect";
import { HiSortDescending } from "react-icons/hi";
import { TableSearchInput } from "./common/TableSearchInput";
import { FilterGroup } from "./common/FilterGroup";
import { useDebounce } from "../hooks/useDebounce";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { StatusSelect } from "./common/statusSelect";

type LineChartData = {
  xAxis: string;
  revenue: number;
};

interface PromoAdProps {
  pageTitle: string;
  columns: GridColDef[];
  rows: any[];
  lineChartData: LineChartData[];
}

type IFilter = {
  status: string;
  date: Dayjs | null;
};
export default function PromoAd({
  pageTitle,
  columns,
  rows,
  lineChartData,
}: PromoAdProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [filters, setFilters] = useState<IFilter>({
    status: "",
    date: null,
  });

  return (
    <div className="flex flex-col gap-20">
      {/* promotion summary */}
      <div className="flex flex-wrap gap-5 ">
        <div className="bg-white py-5 px-5 mt-6 rounded-3xl flex-[3] w-full md:w-auto">
          <div className="flex justify-between mb-5 flex-wrap">
            <h4 className="font-bold text-3xl text-[#05004E] capitalize mb-2 md:mb-0">
              {pageTitle} Summary
            </h4>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#FD6100",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#FD6100",
                  gap: "5px",
                  marginRight: "15px",
                  textTransform: "capitalize",
                }}
              >
                <PiExport size={16} />
                Export
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#FD6100",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#FD6100",
                  gap: "5px",
                  textTransform: "capitalize",
                }}
              >
                <LuRefreshCw size={16} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex  flex-col md:flex-row justify-between gap-3">
            <div className="w-full md:w-[210px] h-[184px] bg-[#1137D033] pl-5 pt-4 rounded-[16px]">
              <div className="w-[40px] h-[40px] bg-[#1137D0] flex items-center justify-center rounded-full">
                <AiFillFileText size={24} color="#ffffff" />
              </div>
              <p className="font-semibold text-2xl text-[#151D48] mt-4 mb-6">
                120
              </p>
              <p className="font-medium text-base text-[#425166]">
                Total Units Sold
              </p>
            </div>

            <div className="w-full md:w-[210px] h-[184px] bg-[#04979E33] pl-5 p-2 pt-4 rounded-[16px]">
              <div className="flex justify-between w-full">
                <div className="w-[40px] h-[40px] bg-[#04979E] flex items-center justify-center rounded-full">
                  <HiMiniChartBarSquare size={24} color="#ffffff" />
                </div>
                <p className="font-semibold text-xs text-[#1137D0]">
                  +8% Yesterday
                </p>
              </div>
              <p className="font-semibold text-2xl text-[#151D48] mt-4 mb-6">
                N 12,500,000
              </p>
              <p className="font-medium text-base capitalize text-[#425166]">
                Total {pageTitle} Rev
              </p>
            </div>

            <div className="w-full md:w-[270px] h-[184px] bg-[#FD610033] pl-5 p-2 pt-6 rounded-[16px]">
              <div className="w-[40px] h-[40px] bg-[#FD6100] flex items-center justify-center rounded-full">
                <PiMagnetStraightLight size={24} color="#ffffff" />
              </div>

              <p className="font-semibold text-2xl text-[#151D48] mt-4 mb-4">
                54%
              </p>
              <p className="font-medium text-base text-[#425166]">
                Conversion Rate
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-5 px-5 mt-6 rounded-3xl flex-1">
          <p className="font-bold  mb-5">Top Performing Categories</p>
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <VscCircleFilled size={10} color="#FD6100" />
              <div className="ml-2">
                <p className="font-normal text-sm sm:text-base text-[#5C4D58]">
                  Cars: <span className="font-bold text-[#E65800]">64%</span>
                </p>
                <p className="font-normal text-xs text-[#5C4D58]">
                  800 units sold
                </p>
              </div>
            </div>
            <ProgressUI
              rangeColor={"#FD6100"}
              rangePercent={"64%"}
              wholeColor={"#FD610040"}
            />
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-2">
              <VscCircleFilled size={10} color="#14199C" />
              <div className="ml-2">
                <p className="font-normal text-sm sm:text-base text-[#5C4D58]">
                  Houses: <span className="font-bold text-[#14199C]">24%</span>
                </p>
                <p className="font-normal text-xs text-[#5C4D58]">
                  300 units sold
                </p>
              </div>
            </div>
            <ProgressUI
              rangeColor={"#14199C"}
              rangePercent={"24%"}
              wholeColor={"#14199C40"}
            />
          </div>

          <div className="mb-3">
            <div className="flex items-center mb-2">
              <VscCircleFilled size={10} color="#04979E" />
              <div className="ml-2">
                <p className="font-normal text-sm sm:text-base text-[#5C4D58]">
                  Lands: <span className="font-bold text-[#04979E]">12%</span>
                </p>
                <p className="font-normal text-xs text-[#5C4D58]">
                  150 units sold
                </p>
              </div>
            </div>
            <ProgressUI
              rangeColor={"#04979E"}
              rangePercent={"12%"}
              wholeColor={"#04979E40"}
            />
          </div>
        </div>
      </div>

      {/* line chart */}
      <div className="w-full  flex-col gap-6 bg-white py-5 px-5 mt-5 rounded-3xl flex gap-x-10">
        <div className="flex flex-col md:flex-row justify-between gap-[7rem] items-center mb-5">
          <div className="flex w-full md:w-1/2 justify-between items-center">
            <h3 className="font-bold text-2xl">Revenue</h3>
            <div>
              <p className="capitalize">Total Income on {pageTitle}</p>
              <p className="text-[#E65800] font-semibold text-2xl">
                ₦12,500,000
              </p>
            </div>
          </div>

          <div className="flex w-full md:w-1/2 justify-between items-center">
            <p className="flex items-center gap-2 text-secondaryTextColor">
              {" "}
              <span className="w-3 h-3 rounded-full bg-[#E65800]"></span> Income
            </p>
            <div className="p-2 cursor-pointer rounded-md border border-primaryBorder bg-white flex items-center gap-x-2">
              <select name="" id="">
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <LineChartComponent
            chartData={lineChartData}
            legend={false}
            tickCount={8}
            gridShow={false}
            paddingX={{ left: 8, right: 8 }}
            lines={[
              {
                color: "#E65800",
                type: "monotone",
                name: "revenue",
                dotShow: false,
                dotSize: 0,
                lineWidth: 3,
              },
            ]}
            tooltipBgColor="#E65800"
            tooltipTextColor="#fff"
          />
        </div>
      </div>

      {/* table */}
      <section id="promotion-table" className="mt-10">
        {/* Filters & Search Bar */}
        <div className="flex justify-between items-end  w-full">
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

        <div className="mt-3 flex h-[25rem] w-full overflow-hidden bg-white">
          <MuiTableComponent
            columns={columns}
            rows={rows}
            paginationActive={true}
            rowHeight={60}
            showCheckbox={false}
            pageSize={10}
          />
        </div>
      </section>
    </div>
  );
}
