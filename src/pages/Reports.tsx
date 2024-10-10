import DashboardSearchBar from "../components/DashboardSearchBar"
import {
    Bar,
    BarChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Props } from "recharts/types/component/DefaultLegendContent"
import {
    generateBarChartData,
    generateLineChartData1SellerDashboard,
} from "../helper/generateFillData"
import LineChartComponent from "../components/LineChart"
import { FaDotCircle } from "react-icons/fa"
import MuiTableComponent from "../components/TableComponent"
import { GridColDef } from "@mui/x-data-grid"
import { formatPrice, generateRandomNumber } from "../helper/helperFunctions"

export default function Reports() {
    const data01 = [
        {
            name: "Cars",
            value: 800,
            color: "#121488",
        },
        {
            name: "Houses",
            value: 300,
            color: "#B6B7DE",
        },
        {
            name: "Lands",
            value: 150,
            color: "#4345AA",
        },
    ]
    const data02 = [
        {
            name: "LAG",
            value: 800,
            color: "#6A2900",
        },
        {
            name: "Kano",
            value: 100,
            color: "#FFEFE6",
        },
        {
            name: "ABJ",
            value: 500,
            color: "#FD8133",
        },
        {
            name: "PH",
            value: 250,
            color: "#E65800",
        },
    ]
    const data03 = [
        {
            name: "Direct Sales",
            value: 700,
            color: "#008000",
        },
        {
            name: "Promotions",
            value: 200,
            color: "#E65800",
        },
        {
            name: "Repeat Customers",
            value: 100,
            color: "#F5F5F5",
        },
    ]

    const renderLegend = (props: Props) => {
        const { payload } = props

        return (
            <ul className="flex justify-between gap-x-1.5 pt-3">
                {payload?.map((entry: any, index) => {
                    return (
                        <li
                            className="text-xs text-center line-clamp-2 font-medium"
                            key={index}
                        >
                            {entry.value} (
                            {(entry.payload.percent * 100).toFixed(1)}%):{" "}
                            {entry.payload?.value} units sold
                        </li>
                    )
                })}
            </ul>
        )
    }

    const renderLegend2 = (props: Props) => {
        const { payload } = props

        return (
            <ul className="flex flex-col justify-between gap-y-2.5 pt-3">
                {payload?.map((entry: any, index) => {
                    return (
                        <div
                            key={index}
                            color={entry.color}
                            className="flex items-center gap-x-1"
                        >
                            <FaDotCircle size={10} color={entry.color} />
                            <li className="text-xs text-center line-clamp-2 font-medium">
                                {entry.value} (
                                {(entry.payload.percent * 100).toFixed(1)}%)
                            </li>
                        </div>
                    )
                })}
            </ul>
        )
    }

    const revenueTrackingRow = (): any[] => {
        const loopArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        const returnArray: any[] = []
        loopArray.forEach((num) => {
            let randomNum = generateRandomNumber(200000000, 10000000)
            returnArray.push({
                id: num,
                category: "Houses",
                revenue: randomNum,
                percentage: "62.9%",
            })
        })
        return returnArray
    }

    const revenueTrackingColumns: GridColDef[] = [
        { field: "category", headerName: "Category", flex: 1 },
        {
            field: "revenue",
            headerName: "Revenue",
            renderCell: ({ row }) => {
                return <span className="">₦{formatPrice(row.revenue)}</span>
            },
            flex: 1,
        },
        { field: "percentage", headerName: "Percentage", flex: 0.5 },
    ]

    const salesReportRow = (): any[] => {
        const loopArray = [1, 2, 3, 4, 5]
        const returnArray: any[] = []
        loopArray.forEach((num) => {
            let randomNum = generateRandomNumber(10, 0)
            returnArray.push({
                id: "100" + num,
                date: new Date().toLocaleDateString(),
                name: "Rosemary Sunday",
                product: "2020 Toyota Camry",
                quantity: randomNum,
                price: 12000000,
                total: 12000000,
                status: "Completed",
            })
        })
        return returnArray
    }

    const salesReportColumns: GridColDef[] = [
        { field: "date", headerName: "Date", flex: 0.7 },
        { field: "id", headerName: "Order ID", flex: 0.5 },
        { field: "name", headerName: "Customer Name", flex: 1 },
        { field: "product", headerName: "Product", flex: 1 },
        { field: "quantity", headerName: "Quantity", flex: 0.4 },
        {
            field: "price",
            headerName: "Sale Price",
            renderCell: ({ row }) => {
                return <span className="">₦{formatPrice(row.price)}</span>
            },
            flex: 1,
        },
        {
            field: "total",
            headerName: "Total Sale Amount",
            renderCell: ({ row }) => {
                return <span className="">₦{formatPrice(row.total)}</span>
            },
            flex: 1,
        },
        { field: "status", headerName: "Status", flex: 0.8 },
    ]

    const revenueReportRow = (): any[] => {
        const loopArray = [1, 2, 3, 4, 5]
        const returnArray: any[] = []
        loopArray.forEach((num) => {
            returnArray.push({
                id: "100" + num,
                date: new Date().toLocaleDateString(),
                product: "2020 Toyota Camry",
                revenue: 12000000,
                expenses: 12000000,
                netRevenue: 12000000,
            })
        })
        return returnArray
    }

    const revenueReportColumns: GridColDef[] = [
        { field: "date", headerName: "Date", flex: 0.7 },
        { field: "id", headerName: "Order ID", flex: 0.5 },
        { field: "product", headerName: "Product", flex: 1 },
        {
            field: "revenue",
            headerName: "Revenue",
            renderCell: ({ row }) => {
                return <span className="">₦{formatPrice(row.revenue)}</span>
            },
            flex: 1,
        },
        {
            field: "expenses",
            headerName: "Expenses",
            renderCell: ({ row }) => {
                return <span className="">₦{formatPrice(row.expenses)}</span>
            },
            flex: 1,
        },
        {
            field: "netRevenue",
            headerName: "Net Revenue",
            renderCell: ({ row }) => {
                return <span className="">₦{formatPrice(row.netRevenue)}</span>
            },
            flex: 1,
        },
    ]

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10">
            <div className="w-full py-3.5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-4 flex flex-col gap-y-5 flex-1">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">
                        Sales and Revenue report
                    </h1>
                    <div className="flex gap-x-4 text-sm">
                        <button className="rounded-lg p-3 px-4 border border-defaultOrange text-defaultOrange">
                            Export
                        </button>
                        <button className="rounded-lg p-3 px-4 text-white bg-defaultOrange">
                            Refresh Data
                        </button>
                    </div>
                </div>

                <div className="w-full grid grid-cols-4 mt-5 bg-[#FAFAFA] border border-primaryBorder rounded-lg">
                    <div className="flex flex-col justify-center border-r text-center px-2 py-7 border-r-primaryBorder">
                        <p className="font-medium">Total Sales</p>
                        <p className="text-sm">1,250</p>
                    </div>
                    <div className="flex flex-col justify-center border-r text-center px-2 py-7 border-r-primaryBorder">
                        <p className="font-medium">Total Revenue</p>
                        <p className="text-sm">₦350,000,000</p>
                    </div>
                    <div className="flex flex-col justify-center border-r text-center px-2 py-7 border-r-primaryBorder">
                        <p className="font-medium">Average order value</p>
                        <p className="text-sm">₦280,000</p>
                    </div>
                    <div className="flex flex-col justify-center text-center px-2 py-7">
                        <p className="font-medium">Best selling product</p>
                        <p className="text-sm">
                            2020 Toyota Camry (200 units sold)
                        </p>
                    </div>
                </div>
                {/* sales, revenue, best selling product */}

                <div className="w-full flex gap-x-5">
                    <div className="w-[65%] rounded-lg p-4 border border-primaryBorder">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-semibold">
                                Sales Performance
                            </span>
                            <select className="outline-none px-2 py-1.5 text-xs rounded-lg border border-primaryBorder">
                                <option>Monthly</option>
                            </select>
                        </div>

                        <div className="h-[250px] w-full reports-page">
                            <LineChartComponent
                                chartData={generateLineChartData1SellerDashboard()}
                                legend={false}
                                tickCount={6}
                                lines={[
                                    {
                                        name: "expenditure",
                                        type: "monotone",
                                        color: "#e65800",
                                        lineWidth: 3,
                                        dotSize: 7,
                                        dotShow: false,
                                    },
                                    {
                                        name: "income",
                                        type: "monotone",
                                        color: "#0B0C52",
                                        lineWidth: 3,
                                        dotSize: 7,
                                        dotShow: false,
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="w-[35%] flex flex-col gap-y-3 items-center rounded-lg p-4 border border-primaryBorder overflow-hidden">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-semibold">
                                Top Performing categories
                            </span>
                            <select className="outline-none px-2 py-1.5 text-xs rounded-lg border border-primaryBorder">
                                <option>30 days</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Legend content={renderLegend} />
                                <Tooltip wrapperClassName="text-xs" />
                                <Pie
                                    data={data01}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={45}
                                    label
                                    fill="#121488"
                                >
                                    {data01.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* sales performance chart, top performing categories pie chart */}

                <div className="w-full flex gap-x-5">
                    <div className="w-[40%] flex flex-col border border-primaryBorder bg-white rounded-lg">
                        <span className="font-semibold p-3">Revenue</span>
                        <MuiTableComponent
                            columns={revenueTrackingColumns}
                            showCheckbox={false}
                            rows={revenueTrackingRow()}
                            paginationActive={true}
                            rowHeight={50}
                            pageSize={10}
                        />
                    </div>

                    <div className="w-[20%] p-3 border border-primaryBorder bg-white rounded-lg"></div>

                    <div className="w-[40%] p-3 border border-primaryBorder bg-white rounded-lg">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-semibold">
                                Top Performing categories
                            </span>
                            <select className="outline-none px-2 py-1.5 text-xs rounded-lg border border-primaryBorder">
                                <option>30 days</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Legend
                                    align="left"
                                    layout="vertical"
                                    verticalAlign="bottom"
                                    iconSize={8}
                                    content={renderLegend2}
                                    className=""
                                />
                                <Tooltip wrapperClassName="text-xs" />
                                <Pie
                                    data={data02}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={45}
                                    legendType="circle"
                                    fill="#121488"
                                >
                                    {data02.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* Revenue tracking table, sales by location pie chart */}

                <div className="w-full flex gap-x-5">
                    <div className="w-[60%] p-3 rounded-lg border reports-page border-primaryBorder bg-white">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-semibold">
                                Monthly Revenue Comparison
                            </span>
                            <select className="outline-none px-2 py-1.5 text-xs rounded-lg border border-primaryBorder">
                                <option>30 days</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={generateBarChartData()}>
                                <Bar
                                    dataKey="revenue"
                                    barSize={26}
                                    fill="#E65800"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Tooltip wrapperClassName="text-xs" />
                                <XAxis className="text-xs" dataKey="name" />
                                <YAxis className="text-xs" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-[40%] p-3 rounded-lg border border-primaryBorder bg-white">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-semibold">
                                Top Performing categories
                            </span>
                            <select className="outline-none px-2 py-1.5 text-xs rounded-lg border border-primaryBorder">
                                <option>30 days</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Legend
                                    align="left"
                                    layout="vertical"
                                    verticalAlign="bottom"
                                    iconSize={8}
                                    content={renderLegend2}
                                    className=""
                                />
                                <Tooltip wrapperClassName="text-xs" />
                                <Pie
                                    data={data03}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={45}
                                    legendType="circle"
                                    fill="#121488"
                                >
                                    {data03.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* Monthly revenue bar chart */}

                <div className="w-full p-4 rounded-lg border border-primaryBorder">
                    <h4 className="font-semibold">Financial Summaries</h4>

                    <div className="flex flex-col gap-y-4 mt-4">
                        <p className="flex gap-x-5 font-medium text-sm">
                            Gross Revenue:{" "}
                            <span className="opacity-60">₦250,000,000</span>
                        </p>
                        <p className="flex gap-x-5 font-medium text-sm">
                            Net Revenue:{" "}
                            <span className="opacity-60">₦250,000,000</span>
                        </p>
                        <p className="flex gap-x-5 font-medium text-sm">
                            Profit Margin:{" "}
                            <span className="opacity-60">91.4%</span>
                        </p>
                        <p className="flex gap-x-5 font-medium text-sm">
                            Cost of Goods Sold (COGS):{" "}
                            <span className="opacity-60">₦30,000,000</span>
                        </p>
                        <p className="flex gap-x-5 font-medium text-sm">
                            Gross Revenue:{" "}
                            <span className="opacity-60">
                                ₦8,000,000(100 returns)
                            </span>
                        </p>
                        <p className="flex gap-x-5 font-medium text-sm">
                            Expenses:
                        </p>
                        <div className="w-full flex flex-col rounded-lg border border-primaryBorder">
                            <div className="flex px-3 py-2 bg-[#F0F0F0]">
                                <span className="w-[50%] font-semibold">
                                    Expense Type
                                </span>
                                <span className="w-[50%] font-semibold">
                                    Amount
                                </span>
                            </div>
                            <div className="flex px-3 py-3">
                                <span className="w-[50%] text-sm">
                                    Marketing
                                </span>
                                <span className="w-[50%] text-sm">
                                    ₦10,000,000
                                </span>
                            </div>
                            <div className="flex px-3 py-3">
                                <span className="w-[50%] text-sm">
                                    Marketing
                                </span>
                                <span className="w-[50%] text-sm">
                                    ₦10,000,000
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Financial Revenue */}

                <div className="w-full p-4 rounded-lg border border-primaryBorder">
                    <h4 className="font-semibold">Sales Report table</h4>

                    <div className="w-full flex h-[20rem] mt-4">
                        <MuiTableComponent
                            columns={salesReportColumns}
                            showCheckbox={false}
                            rows={salesReportRow()}
                            paginationActive={true}
                            rowHeight={45}
                            pageSize={10}
                        />
                    </div>
                </div>
                {/* Sales Report table */}

                <div className="w-full p-4 rounded-lg border border-primaryBorder">
                    <h4 className="font-semibold">Revenue Report table</h4>

                    <div className="w-full flex h-[20rem] mt-4">
                        <MuiTableComponent
                            columns={revenueReportColumns}
                            showCheckbox={false}
                            rows={revenueReportRow()}
                            paginationActive={true}
                            rowHeight={45}
                            pageSize={10}
                        />
                    </div>
                </div>
                {/* Revenue Report table */}
            </div>
        </div>
    )
}
