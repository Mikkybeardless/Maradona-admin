import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Car2 from "../assets/Dashboard-listing-car.png";
import DashboardSearchBar from "../components/DashboardSearchBar";
import ProductCarousel from "../components/ProductCarousel";
import { generateRandomNumber } from "../helper/helperFunctions";
import MuiTableComponent from "../components/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import image1 from "../assets/detail1.png";
import image2 from "../assets/detail2.png";
import image3 from "../assets/detail3.png";
import image4 from "../assets/detail4.png";
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
  {
    field: "bidder",
    headerName: "Bidders",
    renderCell: ({ value }) => {
      return (
        <span className={`${value === "No Bid" && "text-[#DC1313]"}`}>
          {value}
        </span>
      );
    },
    flex: 0.7,
  },
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

const images = [image1, image2, image3, image4];

export default function AuctionDetails() {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto custom-scrollbar py-20 bg-[#F5F5F5]">
      <div className="w-full py-5 px-5 md:px-10 fixed z-10 left-2 top-0 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <div className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
        <div className="flex gap-x-4 items-center">
          <Link to="/auctions" className="text-sm opacity-60">
            Auctions
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Details</span>
        </div>

        <h1 className="text-3xl font-bold mt-6">Product Details</h1>

        <div className="flex flex-col md:flex-row gap-x-8 mt-10">
          <div className="w-full md:w-2/4 flex flex-col gap-y-6">
            <ProductCarousel images={images} />
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-y-1.5">
              <span className="text-sm font-semibold">Description</span>
              <span className="opacity-70 text-sm">
                A well-maintained Toyota Camry 2018 model with a sleek design
                and advanced features. Perfect for both city and highway
                driving.
              </span>
            </div>
          </div>
          {/* Images */}

          <div className="w-full md:w-2/4 flex flex-col gap-y-6">
            <div className="w-full bg-white space-y-6 flex flex-col rounded-xl p-6">
              <div className="space-y-2 flex flex-col">
                <span className="text-sm opacity-70 ">Product Name:</span>
                <span className=" text-2xl font-bold">
                  Toyota Camry LE (2024)
                </span>
                <div className="w-full flex items-center gap-x-1">
                  <span className="opacity-70 text-[#008000] rounded-3xl bg-[#D3FFD3] px-2 py-1 text-sm">
                    Active
                  </span>
                  <div className="flex gap-1 bg-black text-white rounded-full px-2 py-1 text-xs font-semibold">
                    <span className="text-sm font-semibold">Category:</span>
                    <span className=" text-sm">CAR</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-1.5">
                <span className="text-secondaryTextColor">starting Price</span>
                <span className="text-3xl text-lightBlue">22,000,000</span>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <span className="text-secondaryTextColor">Current Price</span>
                <span className="text-[50px] font-bold text-[#21C45D]">
                  28,500,000
                </span>
              </div>
            </div>

            {/* count down section */}
            <div className="w-full bg-white space-y-6 flex flex-col rounded-xl p-6">
              <span className="text-secondaryTextColor">
                Count Down Duration:
              </span>
              <div className="flex items-center text-[#FF0000] gap-x-2">
                <div className="flex flex-col items-center gap-y-1">
                  <span className="text-[40px] font-bold">48</span>
                  <span className="text-secondaryTextColor">Hours</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center  gap-y-1">
                  <span className="text-[40px] font-bold">21</span>
                  <span className="text-secondaryTextColor">Min</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center  gap-y-1">
                  <span className="text-[40px] font-bold">09</span>
                  <span className="text-secondaryTextColor">Secs</span>
                </div>
              </div>
            </div>

            {/* key feature  */}
            <div className="w-full  p-4 pl-7 rounded-xl flex gap-x-2 items-start">
              <div className="w-2/4">
                <span className="text-sm font-semibold">Key Features</span>
                <ul className="text-sm pl-3 flex flex-col gap-y-2 mt-2.5 list-disc">
                  <li className="opacity-70">Engine: 2.5L 4-cylinder</li>
                  <li className="opacity-70">Transmission: Automatic</li>
                  <li className="opacity-70">Mileage: 30,000 miles</li>
                  <li className="opacity-70">Color: Metallic Grey</li>
                  <li className="opacity-70">Fuel Type: Petrol</li>
                  <li className="opacity-70">Condition: Used</li>
                </ul>
              </div>
              <div className="w-2/4">
                <span className="text-sm font-semibold">
                  Pricing and Availabilty
                </span>
                <ul className="text-sm flex flex-col gap-y-2 mt-2.5 list-none">
                  <li className="opacity-70">Price: $5,500,000</li>
                  <li className="opacity-70">Negotiable: No</li>
                  <li className="opacity-70">Location: Lekki, Lagos</li>
                </ul>
              </div>
            </div>
          </div>
          {/* details */}
        </div>
      </div>

      {/* table */}
      <div className="mt-10  px-5 md:px-10 min-h-[500px] flex flex-1 w-full overflow-hidden">
        <MuiTableComponent
          columns={columns}
          showCheckbox={false}
          rows={rows()}
          paginationActive={true}
          rowHeight={60}
          pageSize={10}
          //   onRowClick={handleRowClick}
          headerStyle={{
            backgroundColor: "#f3f4f6",
            fontWeight: "bold",
          }}
        />
      </div>
    </div>
  );
}
