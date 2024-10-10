import DashboardSearchBar from "../components/DashboardSearchBar"
import Car from "../assets/Dashboard-Car-1.png"
import { CompactTable } from "@table-library/react-table-library/compact"
import { useTheme } from "@table-library/react-table-library/theme"
import { getTheme } from "@table-library/react-table-library/baseline"
import LineChartComponent from "../components/LineChart"
import {
    generateLineChartData1SellerDashboard,
    generateLineChartData2SellerDashboard,
    productColumnSellerDashoard,
    productTableSellerDashboard,
    purchaseColumnSellerDashoard,
    purchaseTableSellerDashboard,
    salesColumnSellerDashoard,
    salesTableSellerDashboard,
} from "../helper/generateFillData"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

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
    ]

    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.3
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

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
        )
    }

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
            `,
        },
    ])

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
    ])

    return (
        <div className="w-full h-full overflow-y-auto custom-scrollbar pb-10">
            <div className="w-full py-5 px-24 border-b border-b-primaryBorder">
                <DashboardSearchBar />
            </div>

            <div className="px-24 w-full mt-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <div className="w-full py-6 grid grid-cols-4 border border-primaryBorder rounded-lg mt-7">
                    <div className="flex flex-col gap-y-2 items-center border-r border-r-primaryBorder">
                        <p className="text-sm text-[#585858]">Customers</p>
                        <p className="text-2xl font-medium">230</p>
                    </div>
                    <div className="flex flex-col gap-y-2 items-center border-r border-r-primaryBorder">
                        <p className="text-sm text-[#585858]">Products</p>
                        <p className="text-2xl font-medium">53</p>
                    </div>
                    <div className="flex flex-col gap-y-2 items-center border-r border-r-primaryBorder">
                        <p className="text-sm text-[#585858]">Active bids</p>
                        <p className="text-2xl font-medium">530</p>
                    </div>
                    <div className="flex flex-col gap-y-2 items-center">
                        <p className="text-sm text-[#585858]">Sales</p>
                        <p className="text-2xl font-medium">1200</p>
                    </div>
                </div>
                {/*customers, products*/}

                <div className="flex justify-between gap-x-4 mt-4 w-full">
                    <div className="flex flex-col basis-[65%] rounded-lg border border-primaryBorder">
                        <h5 className="font-medium p-2.5 bg-[#F0F0F0] rounded-t-lg">
                            Inventory summary
                        </h5>
                        <div className="grid grid-cols-4">
                            <div className="flex flex-col gap-y-2 py-5 px-2 items-center border-r border-r-primaryBorder">
                                <p className="text-2xl font-medium">51</p>
                                <p className="text-sm">Qty</p>
                                <p className="">TOTAL SALES</p>
                            </div>
                            <div className="flex flex-col gap-y-2 py-5 px-2 items-center border-r border-r-primaryBorder">
                                <p className="text-2xl font-medium">10</p>
                                <p className="text-sm">Pkgs</p>
                                <p className="">Transactions</p>
                            </div>
                            <div className="flex flex-col gap-y-2 py-5 px-2 items-center border-r border-r-primaryBorder">
                                <p className="text-2xl font-medium">2</p>
                                <p className="text-sm">Pkgs</p>
                                <p className="">Pending</p>
                            </div>
                            <div className="flex flex-col gap-y-2 py-5 px-2 items-center">
                                <p className="text-2xl font-medium">90</p>
                                <p className="text-sm">Pkgs</p>
                                <p className="">Cancelled</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col basis-[35%] rounded-lg border border-primaryBorder">
                        <h5 className="font-medium p-2.5 bg-[#F0F0F0] rounded-t-lg">
                            Sales Activity
                        </h5>
                        <div className="flex flex-col px-5 flex-1">
                            <div className="flex justify-between flex-1 items-center gap-x-2 border-b border-b-primaryBorder">
                                <span className="basis-[80%] text-sm">
                                    QUANTITY IN HAND
                                </span>
                                <span className="text-lg basis-[20%]">
                                    12746
                                </span>
                            </div>
                            <div className="flex justify-between flex-1 items-center gap-x-2">
                                <span className="basis-[80%] text-sm">
                                    QUANTITY TO BE RECEIVED
                                </span>
                                <span className="text-lg basis-[20%]">62</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*sales inventory*/}

                <div className="flex justify-between gap-x-4 mt-4 w-full">
                    <div className="flex flex-col basis-[55%] rounded-lg border border-primaryBorder">
                        <h5 className="font-medium p-2.5 bg-[#F0F0F0] rounded-t-lg">
                            Product Details
                        </h5>
                        <div className="flex flex-1 overflow-hidden">
                            <div className="basis-[65%] flex flex-col justify-between gap-y-3 py-4 px-5 border-r border-r-primaryBorder">
                                <div className="flex w-full justify-between items-center">
                                    <span className="text-sm text-[#585858]">
                                        Low Stock Items
                                    </span>
                                    <span className="text-lfg font-medium">
                                        22
                                    </span>
                                </div>
                                <div className="flex w-full justify-between items-center">
                                    <span className="text-sm text-[#585858]">
                                        All Item Groups
                                    </span>
                                    <span className="text-lfg font-medium">
                                        36
                                    </span>
                                </div>
                                <div className="flex w-full justify-between items-center">
                                    <span className="text-sm text-[#585858]">
                                        All Items
                                    </span>
                                    <span className="text-lfg font-medium">
                                        129
                                    </span>
                                </div>
                            </div>

                            <div className="pie-chart-cont basis-[35%] overflow-hidden flex flex-col justify-center relative">
                                <span className="text-sm px-2 font-semibold">
                                    Active items
                                </span>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Tooltip wrapperClassName="text-xs" />
                                        <Pie
                                            data={data01}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={25}
                                            outerRadius={69}
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            fill="#121488"
                                        >
                                            {data01.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col basis-[45%] rounded-lg border border-primaryBorder">
                        <div className="flex justify-between rounded-t-lg px-2.5 bg-[#F0F0F0]">
                            <h5 className="font-medium py-2.5">
                                Top Selling Items
                            </h5>
                            <select className="bg-transparent outline-none text-sm">
                                <option>This month</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="flex flex-col items-center gap-y-2.5 py-4 px-2 border-r border-r-primaryBorder">
                                <img
                                    className="w-[70px] h-[70px] rounded-lg bg-slate-100"
                                    src={Car}
                                    alt="product"
                                />
                                <span className="text-sm text-[#585858]">
                                    Toyota Camry
                                </span>
                                <p className="text-lg font-medium">
                                    110
                                    <span className="text-xs font-normal text-[#585858]">
                                        Kg
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-y-2.5 py-4 px-2">
                                <img
                                    className="w-[70px] h-[70px] rounded-lg bg-slate-100"
                                    src={Car}
                                    alt="product"
                                />
                                <span className="text-sm text-[#585858]">
                                    Toyota Camry
                                </span>
                                <p className="text-lg font-medium">
                                    110
                                    <span className="text-xs font-normal text-[#585858]">
                                        Kg
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*pie chart*/}

                <div className="p-3.5 rounded-lg border border-primaryBorder mt-7">
                    <div className="flex w-full justify-between items-center">
                        <h5 className="text-lg font-medium">Income</h5>
                        <select className="text-sm rounded-lg outline-none p-2.5 border border-primaryBorder">
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>

                    <div className="mt-2 flex gap-x-8 items-center">
                        <p className="text-xs text-[#585858]">
                            Total income:{" "}
                            <span className="text-lg text-defaultOrange">
                                ₦23,230,450
                            </span>
                        </p>
                        <p className="text-xs text-[#585858]">
                            Total expenditure:{" "}
                            <span className="text-lg text-defaultOrange">
                                ₦5,230,450
                            </span>
                        </p>
                    </div>

                    <div className="w-full h-[15rem] mt-5">
                        <LineChartComponent
                            chartData={generateLineChartData1SellerDashboard()}
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
                {/*income line chart*/}

                <div className="mt-7 flex gap-x-10">
                    <div className="basis-[30%] rounded-lg border border-primaryBorder">
                        <div className="flex justify-between rounded-t-lg px-2.5 bg-[#F0F0F0]">
                            <h5 className="font-medium py-2.5">
                                Purchase Order
                            </h5>
                            <select className="bg-transparent outline-none text-sm">
                                <option>This month</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <div className="border-b border-b-primaryBorder py-3 px-3 text-center">
                                <p className="text-sm">Quantity Ordered</p>
                                <p className="text-xl font-medium text-defaultOrange">
                                    2.00
                                </p>
                            </div>
                            <div className="py-3 px-3 text-center">
                                <p className="text-sm">Quantity Ordered</p>
                                <p className="text-xl font-medium text-defaultOrange">
                                    $14500.00
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="basis-[70%] rounded-lg border border-primaryBorder">
                        <div className="flex justify-between rounded-t-lg px-2.5 bg-[#F0F0F0]">
                            <h5 className="font-medium py-2.5">Sales Order</h5>
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

                    <div className="w-full h-[20rem] gap-x-5 flex">
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
                {/*Sales Order summary*/}

                <div className="flex gap-x-4 mt-10">
                    <div className="rounded-lg basis-[60%] border border-primaryBorder">
                        <h5 className="px-3.5 py-3">Top 5 Purchase</h5>

                        <div className="w-full custom-scrollbar table-head-center">
                            <CompactTable
                                columns={purchaseColumnSellerDashoard}
                                data={{ nodes: purchaseTableSellerDashboard() }}
                                theme={tableTheme2}
                            />
                        </div>
                    </div>
                    <div className="rounded-lg basis-[40%] border border-primaryBorder">
                        <h5 className="px-3.5 py-3">Top 5 Products</h5>

                        <div className="w-full custom-scrollbar table-head-center">
                            <CompactTable
                                columns={productColumnSellerDashoard}
                                data={{ nodes: productTableSellerDashboard() }}
                                theme={tableTheme2}
                            />
                        </div>
                    </div>
                </div>

                {/*padding bottom*/}
            </div>
        </div>
    )
}
