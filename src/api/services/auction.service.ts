import apiClient from "../apiClient";

interface Product {
  name: string;
  category_id: number;
  price: number;
  inventory: string;
  type: "HOUSE" | "CAR" | "LAND" | "OTHER";
  sku: string;
  tags: number[];
  documents: File[];
  media: File[];
  description: string;
  status: "DRAFT" | "PUBLISHED";
  address: string;
}

type Auction = {
  starting_bid: number;
  auction_duration: number;
  reserve_price: number;
  start_time: string;
  end_time: string;
  incremental_bid_amount: number;
  minimum_bid_increment: number;
  auto_extend: number;
  tags: number[];
};

type House = {
  house_beds: number;
  house_size: number;
  house_condition: string;
  house_furnished: string;
  accessibility: string;
};

type Car = {
  body_type: string;
  gear_type: string;
  engine_type: string;
  mileage: string;
};

type Land = {
  land_size: number;
  land_type: string;
  topography: string;
  fencing: string;
  accessibility: string;
};

type GenProduct = Product & Auction & (House | Car | Land);

type ProductUpdate = Partial<GenProduct>;

const auctionService = {
  getAllAuctions: (query?: string) =>
    apiClient.get(`/admin/auctions${query ? `?${query}` : ""}`),

  getAuction: (id: number) => apiClient.get(`/admin/auctions/${id}`),
  addAuction: (data: FormData) =>
    apiClient.post("/admin/auctions", data, {
      headers: { "Content-Type": "multipart/form-data" }, // set the Content-Type for multipart
    }),
  deleteAuction: (id: number) => apiClient.delete(`/admin/auctions/${id}`),
  updateAuction: (id: number, data: ProductUpdate | FormData) =>
    apiClient.post(`/admin/auctions/${id}/edit`, data),
  auctionSearch: (query: string) =>
    apiClient.get(`/admin/auctions/search?query=${query}`),

  // bids
  getAllBids: (query?: string) =>
    apiClient.get(`/admin/auctions/all-bids${query ? `?${query}` : ""}`),
  getAllAuctionBids: (id: number) =>
    apiClient.get(`/admin/auctions/${id}/bids`),
  addBid: (data: { amount: number; auction_id: number }) =>
    apiClient.post(`/admin/auctions/bids`, data),
};

export default auctionService;
