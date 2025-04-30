import DashboardSearchBar from "../components/DashboardSearchBar";
import Car from "../assets/Dashboard-Car-1.png";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import LineChartComponent from "../components/LineChart";
import {
  generateLineChartData1SellerDashboard,
  generateLineChartData2SellerDashboard,
  productColumnSellerDashoard,
  productTableSellerDashboard,
  purchaseColumnSellerDashoard,
  purchaseTableSellerDashboard,
  salesColumnSellerDashoard,
  salesTableSellerDashboard,
} from "../helper/generateFillData";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BsArrowUp } from "react-icons/bs";
import TEarnings from "../assets/TEarnings.svg";
import TUser from "../assets/TUser.svg";
import TSales from "../assets/TSales.svg";
import Hilux from "../assets/Hilux.png";
import Land from "../assets/DLand.png";
import House from "../assets/BHouse.png";
import Lexus from "../assets/Lexus.png";
import { generateRandomNumber } from "../helper/helperFunctions";
import { GridColDef } from "@mui/x-data-grid";
import MuiTableComponent from "../components/TableComponent";
import Car2 from "../assets/Dashboard-listing-car.png";
import { Props } from "recharts/types/component/DefaultLegendContent";

export default function Dashboard() {
  const data01 = [
    {
      name: "Units",
      value: 780,
      color: "#141695",
    },
    {
      name: "Other",
      value: 286,
      color: "#F5F5F5",
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={30}
        fontWeight={600}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const tableTheme = useTheme([
    getTheme(),
    {
      HeaderRow: `
      font-size: 16px;
      background-color: #F0F0F0;
      text-align: center !important;
    `,
      Row: `
      font-size: 14px;
      text-align: center;
      border-bottom: none;
    `,
      BaseCell: `
      border-bottom: none;
    `,
    },
  ]);

  const tableTheme2 = useTheme([
    getTheme(),
    {
      HeaderRow: `
                font-size: 14px;
                background-color: #F0F0F0;
                text-align: center;
            `,
      Row: `
                font-size: 12px;
                text-align: center;
            `,
    },
  ]);

  type BidTableType = {
    id: number;
    bidder: any;
    product: string;
    price: string;
    status: string;
    date: Date | string;
  };

  const rows = (): BidTableType[] => {
    return Array.from({ length: 15 }, (_, i) => {
      const num = i + 1;
      const randomNum = generateRandomNumber(4, 1);

      return {
        id: num, // Required by MUI
        bidder: randomNum === 2 ? "No Bid" : `#E${num}HH`,
        product: "Toyota Camery LE (2024)",
        price: "N5,500,000",
        status:
          randomNum === 1
            ? "Pending"
            : randomNum === 2
            ? "Closed"
            : randomNum === 3
            ? "Sold"
            : "Active",
        date: new Date().toUTCString(),
      };
    });
  };

  const columns: GridColDef[] = [
    { field: "bidder", headerName: "Bidders", flex: 0.7 },
    {
      field: "product",
      headerName: "Product",
      renderCell: ({ value }) => {
        return (
          <div className="flex gap-x-2 items-center">
            <img className="w-[40px] h-[40px]" src={Car2} alt="product" />
            <p className="text-sm font-medium text-darkBlue">{value}</p>
          </div>
        );
      },
      flex: 1,
    },
    { field: "price", headerName: "Price", flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: ({ value }) => {
        return (
          <span
            className={`px-3 py-1 rounded-full font-medium text-sm
          ${
            value === "Active"
              ? "bg-[#FE8E49] text-white"
              : value === "Sold"
              ? "bg-[#E8F8E8] text-[#0C560B]"
              : value === "Pending"
              ? "bg-[#FEF3B8] text-[#0C560B]"
              : "bg-[#DC1313] text-white"
          }`}
          >
            {value}
          </span>
        );
      },
    },

    { field: "date", headerName: "Time", flex: 1 },
  ];

  const data02 = [
    {
      name: "Abuja",
      value: 700,
      color: "#FFC633",
    },
    {
      name: "Lagos",
      value: 600,
      color: "#E65800",
    },
    {
      name: "Port Harcourt",
      value: 500,
      color: "#1A0079",
    },
    {
      name: "Kaduna",
      value: 100,
      color: "#000000",
    },
  ];
  const renderLegend2 = (props: Props) => {
    const { payload } = props;

    return (
      <ul className="flex flex-col justify-center gap-y-3">
        {payload?.map((entry: any, index: number) => (
          <li
            key={index}
            className="flex items-center gap-x-3 text-secondaryTextColor"
          >
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar pb-10">
      <div className="w-full py-5 px-24">
        <DashboardSearchBar />
      </div>

      <div className="px-10 w-full mt-8">
        <h1 className="text-3xl text-darkBlue font-bold">Dashboard</h1>

        <div className="w-full p-6 grid gap-x-4 grid-cols-3 bg-white shadow-md rounded-lg my-7">
          <div className="bg-darkBlue rounded-lg p-2 text-white">
            <div className="flex flex-col gap-y-2 border rounded-lg border-white p-2">
              <div className="flex gap-x-3 items-center">
                <img src={TEarnings} alt="DB Image" />
                <p className="font-bold">Total Earnings</p>
              </div>
              <p className="text-xs">Last 7 days</p>
              <p className="flex gap-x-2 text-2xl font-bold">
                N150M{" "}
                <span className="text-sm px-2 py-1 flex gap-1 items-center rounded-3xl bg-white text-green-500">
                  <BsArrowUp className="font-bold" />
                  10.4%
                </span>
              </p>
              <p className="text-xs">
                Previous 7 days{" "}
                <span className="text-green-500">( + N235k)</span>
              </p>
            </div>
          </div>

          <div className="bg-defaultOrange rounded-lg p-2 text-white">
            <div className="flex flex-col gap-y-2 border rounded-lg border-white p-2">
              <div className="flex gap-x-3 items-center">
                <img src={TSales} alt="Sales Image" />
                <p className="font-bold">Total Sales</p>
              </div>
              <p className="text-xs">Last 7 days</p>
              <p className="flex items-baseline text-2xl font-bold">
                N250 <span className="text-xs mr-2">Qty</span>
                <span className="text-sm px-2 py-1 flex gap-1 items-center rounded-3xl bg-white text-black">
                  <BsArrowUp className="font-bold" />
                  10.4%
                </span>
              </p>
              <p className="text-xs">
                Previous 7 days <span className="">(+ 25k)</span>
              </p>
            </div>
          </div>

          <div className="bg-lightBlue rounded-lg p-2 text-white">
            <div className="flex flex-col gap-y-2 border rounded-lg border-white p-2">
              <div className="flex gap-x-3 items-center">
                <img src={TUser} alt="DB Image" />
                <p className="font-bold">Total Earnings</p>
              </div>
              <p className="text-xs">Last 7 days</p>
              <p className="flex gap-x-2 text-2xl font-bold">
                N100K{" "}
                <span className="text-sm px-2 py-1 flex gap-1 items-center rounded-3xl bg-white text-green-500">
                  <BsArrowUp className="font-bold" />
                  10.4%
                </span>
              </p>
              <p className="text-xs">
                Previous 7 days{" "}
                <span className="text-green-500">( + N200k)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Top selling products */}
        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between text-darkBlue gap-10">
          <div className="flex flex-col gap-x-6">
            <div className="flex gap-6 justify-between mb-4">
              <h2 className="text-xl font-bold text-darkBlue">
                Top Selling Products
              </h2>{" "}
              <span className="bg-defaultOrange rounded-lg p-1 px-2 text-white">
                +12.34%
              </span>
            </div>
            <div className="flex justify-between">
              <p className="flex gap-1 items-center text-[30px] font-bold text-darkBlue">
                300 <span className="text-base font-normal">sold</span>
              </p>{" "}
              <p>From last month</p>
            </div>
            <div className="mb-4">
              <p className="flex justify-between">
                <span>Toyota Camery</span>{" "}
                <span className="text-darkBlue font-semibold">1st</span>
              </p>
              <div className="relative w-full bg-gray-200 h-2 rounded-3xl">
                <div className="absolute w-[70%] bg-defaultOrange h-2 left-0 rounded-3xl"></div>
              </div>
            </div>
            <div className="mb-4">
              <p className="flex justify-between">
                <span>Mercedes Benz</span>{" "}
                <span className="text-darkBlue font-semibold">2nd</span>
              </p>
              <div className="relative w-full bg-gray-200 h-2 rounded-3xl">
                <div className="absolute w-[50%] bg-lightBlue h-2 left-0 rounded-3xl"></div>
              </div>
            </div>

            <div className="mb-4">
              <p className="flex justify-between">
                <span>2 Bed room Apartment </span>{" "}
                <span className="text-darkBlue font-semibold">3rd</span>
              </p>
              <div className="relative w-full bg-gray-200 h-2 rounded-3xl">
                <div className="absolute w-[40%] bg-darkBlue h-2 left-0 rounded-3xl"></div>
              </div>
            </div>

            <div className="mb-4">
              <p className="flex justify-between">
                <span>Toyota Corolla </span>{" "}
                <span className="text-darkBlue font-semibold">4th</span>
              </p>
              <div className="relative w-full bg-gray-200 h-2 rounded-3xl">
                <div className="absolute w-[50%] bg-green-500 h-2 left-0 rounded-3xl"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <img src={Land} className="w-[123px] h-[77px]" alt="land" />
              <p>Toyota Tacoma </p>
              <p className="text-defaultOrange font-semibold">110kg</p>
            </div>

            <div className="flex flex-col gap-3">
              <img src={Hilux} className="w-[123px] h-[77px]" alt="land" />
              <p>Toyota Tacoma </p>
              <p className="text-green-500 font-semibold">110kg</p>
            </div>

            <div className="flex flex-col gap-3">
              <img src={House} className="w-[123px] h-[77px]" alt="land" />
              <p>Toyota Tacoma </p>
              <p className="text-lightBlue font-semibold">110kg</p>
            </div>

            <div className="flex flex-col gap-3">
              <img src={Lexus} className="w-[123px] h-[77px]" alt="land" />
              <p>Toyota Tacoma </p>
              <p className="text-darkBlue font-semibold">110kg</p>
            </div>
          </div>

          <div className=" flex flex-col gap-[53px] justify-between">
            <div>
              <p className="text-darkBlue font-semibold text-[18px]">
                Total Orders
              </p>
              <p className="text-[70px] font-bold text-defaultOrange">595</p>
            </div>

            <div>
              <p className="text-darkBlue font-semibold text-[18px]">
                Total Inventory Products
              </p>
              <p className="text-[70px] font-bold text-lightBlue">595</p>
            </div>
          </div>
        </div>

        {/* Active Bids */}

        <div className="bg-white shadow-md rounded-lg p-6 my-5">
          <div className="flex text-darkBlue justify-between items-center">
            <h2 className="text-2xl  font-bold">Active Bides</h2>{" "}
            <p className="text-sm font-[500px]">
              Current price:
              <span className="text-[25px] font-bold text-[#21C45D]">
                N22,000000
              </span>
            </p>
          </div>
          {/* table */}
          <div className="mt-0 h-[500px] flex flex-1 w-full overflow-hidden">
            <MuiTableComponent
              columns={columns}
              showCheckbox={false}
              rows={rows()}
              paginationActive={true}
              rowHeight={60}
              pageSize={10}
              headerStyle={{
                backgroundColor: "#f3f4f6",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>

        {/* Income */}
        <div className="p-3.5 bg-white shadow-md rounded-lg mt-7">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-14 items-center">
              <h5 className="text-lg font-bold text-[#1E1A1C]">Income</h5>
              <div className="mt-2 flex gap-x-8 items-center">
                <p className="text-xs flex flex-col font-semibold text-darkBlue">
                  Total income:{" "}
                  <span className="text-lg text-defaultOrange">
                    ₦23,230,450
                  </span>
                </p>
                <p className="text-xs flex flex-col font-semibold text-darkBlue">
                  Total expenditure:{" "}
                  <span className="text-lg text-defaultOrange">₦5,230,450</span>
                </p>
              </div>
            </div>

            <div className="flex gap-x-14 items-center">
              <div className="flex gap-3">
                <p className="flex gap-2 items-center">
                  <span className="w-3 h-3 rounded-full bg-[#0B0C52]"></span>
                  Income
                </p>
                <p className="flex gap-2 items-center">
                  {" "}
                  <span className="w-3 h-3 rounded-full bg-defaultOrange"></span>
                  Expenses
                </p>
              </div>
              <select className="text-sm rounded-lg outline-none p-2.5 border border-primaryBorder">
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>

          <div className="w-full h-[15rem] mt-5">
            <LineChartComponent
              chartData={generateLineChartData1SellerDashboard()}
              lines={[
                {
                  name: "expenditure",
                  type: "monotone",
                  color: "#e65800",
                  lineWidth: 2,
                  dotSize: 7,
                  dotShow: false,
                },
                {
                  name: "income",
                  type: "monotone",
                  color: "#0B0C52",
                  lineWidth: 2,
                  dotSize: 7,
                  dotShow: false,
                },
              ]}
              tooltipBgColor="#6A2900"
              tooltipTextColor="#fff"
            />
          </div>
        </div>
        {/*income line chart*/}

        <div className="mt-7 flex gap-x-10">
          <div className="basis-[50%] rounded-lg ">
            <div className="flex justify-between rounded-t-lg px-2.5 bg-white">
              <h5 className="font-bold py-2.5">Sales Order</h5>
              <select className="bg-transparent outline-none text-sm">
                <option>This month</option>
              </select>
            </div>

            <div className="w-full h-[10rem] overflow-y-auto custom-scrollbar table-head-center">
              <CompactTable
                columns={salesColumnSellerDashoard}
                data={{ nodes: salesTableSellerDashboard() }}
                theme={tableTheme}
                layout={{ fixedHeader: true }}
              />
            </div>
            <div className="rounded-b-lg bg-white w-full h-14"></div>
          </div>

          <div className="basis-[50%] rounded-lg p-5 bg-white">
            <div className="flex justify-between rounded-t-lg  ">
              <h5 className="font-bold">Top Selling Locations</h5>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Legend
                  align="left"
                  layout="vertical"
                  verticalAlign="middle"
                  content={renderLegend2}
                  className=""
                />
                <Tooltip wrapperClassName="text-xs" />

                <Pie
                  data={data02}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#121488"
                  labelLine={false}
                  label={({ cx, cy }) => (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="60"
                      className="font-semibold fill-[#000000]"
                    >
                      30
                      <tspan
                        x={cx}
                        dy="1.7em" // moves down below the number
                        fontSize="20"
                        fontWeight="normal"
                      >
                        Days
                      </tspan>
                    </text>
                  )}
                >
                  {data02.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/*purchase sales table*/}

        <div className="mt-7 rounded-lg border border-primaryBorder">
          <div className="flex justify-between rounded-t-lg px-2.5 bg-[#F0F0F0]">
            <h5 className="font-medium py-2.5">
              Sales Order Summary (in Naira)
            </h5>
            <select className="bg-transparent outline-none text-sm">
              <option>This month</option>
            </select>
          </div>

          <div className="w-full h-[20rem] bg-white gap-x-5 flex">
            <div className="flex-1">
              <LineChartComponent
                chartData={generateLineChartData2SellerDashboard()}
                lines={[
                  {
                    name: "sales",
                    color: "#e65800",
                    lineWidth: 1,
                    dotSize: 7,
                    dotShow: false,
                  },
                ]}
              />
            </div>
            <div className="basis-[22%] flex flex-col gap-y-3 px-5 py-5 border-l border-l-primaryBorder">
              <p className="w-full font-medium">Total Sales</p>
              <div className="rounded-[4px] pr-8 pl-3 py-2 w-fit border border-primaryBorder border-l-[5px] border-l-defaultOrange">
                <p className="text-sm">Direct Sales</p>
                <p className="text-sm">110,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
