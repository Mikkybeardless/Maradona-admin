import { generateRandomNumber } from "./helperFunctions"

export function generateLineChartData1SellerDashboard() {
    const data = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    const lineChartData: any = []
    data.forEach((month) => {
        lineChartData.push({
            xAxis: month,
            expenditure: generateRandomNumber(2000000, 1000000),
            income: generateRandomNumber(2000000, 1000000),
        })
    })
    return lineChartData
}

export function generateBarChartData() {
    const data = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    const lineChartData: any = []
    data.forEach((month) => {
        lineChartData.push({
            name: month,
            revenue: generateRandomNumber(2000000, 1000000),
        })
    })
    return lineChartData
}

export function generateLineChartData2SellerDashboard() {
    const data = [
        "10 Dec",
        "11 Dec",
        "12 Dec",
        "13 Dec",
        "14 Dec",
        "15 Dec",
        "16 Dec",
        "17 Dec",
        "18 Dec",
        "19 Dec",
        "20 Dec",
        "21 Dec",
    ]
    const lineChartData: any = []
    data.forEach((month) => {
        lineChartData.push({
            xAxis: month,
            sales: generateRandomNumber(100000, 0),
        })
    })
    return lineChartData
}

export const salesTableSellerDashboard = () => {
    let numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let dummyArray: any = []
    numberArray.forEach((num) => {
        dummyArray.push({
            id: num.toString(),
            channel: "Direct Sales",
            draft: 23,
            confirmed: 23,
            packed: 23,
            shipped: 23,
            invoiced: 23,
        })
    })
    return dummyArray
}

export const purchaseTableSellerDashboard = () => {
    let numberArray = [0, 1, 2, 3, 4]
    let dummyArray: any = []
    numberArray.forEach((num) => {
        dummyArray.push({
            id: num.toString(),
            station: "Mainland",
            location: "Lagos",
            shipments: 1000,
            pickedUp: 1000,
            delivered: 130,
            performance: "89%",
        })
    })
    return dummyArray
}

export const productTableSellerDashboard = () => {
    let numberArray = [0, 1, 2, 3, 4]
    let dummyArray: any = []
    numberArray.forEach((num) => {
        dummyArray.push({
            id: num.toString(),
            name: "Rose",
            station: "Abuja",
            orders: 1000,
            successful: 1000,
            failed: 1,
        })
    })
    return dummyArray
}

export const salesColumnSellerDashoard = [
    { label: "Channel", renderCell: (item: any) => item.channel },
    { label: "Draft", renderCell: (item: any) => item.draft },
    { label: "Confirmed", renderCell: (item: any) => item.confirmed },
    { label: "Packed", renderCell: (item: any) => item.packed },
    { label: "Shipped", renderCell: (item: any) => item.shipped },
    { label: "Invoiced", renderCell: (item: any) => item.invoiced },
]

export const purchaseColumnSellerDashoard = [
    { label: "S/n", renderCell: (item: any) => item.id },
    { label: "Station", renderCell: (item: any) => item.station },
    { label: "Location", renderCell: (item: any) => item.location },
    { label: "Shipments", renderCell: (item: any) => item.shipments },
    { label: "Picked up", renderCell: (item: any) => item.pickedUp },
    { label: "Delivered", renderCell: (item: any) => item.delivered },
    { label: "Performance", renderCell: (item: any) => item.performance },
]
export const productColumnSellerDashoard = [
    { label: "S/n", renderCell: (item: any) => item.id },
    { label: "Name", renderCell: (item: any) => item.name },
    { label: "Station", renderCell: (item: any) => item.station },
    { label: "Orders", renderCell: (item: any) => item.orders },
    { label: "Successful", renderCell: (item: any) => item.successful },
    { label: "Failed", renderCell: (item: any) => item.failed },
]
