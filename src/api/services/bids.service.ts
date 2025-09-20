import apiClient from "../apiClient";

const bidsService = {
  // bids
  getAllBids: (query?: string) =>
    apiClient.get(`/admin/auctions/all-bids${query ? `?${query}` : ""}`),
  getAllAuctionBids: (id: number) =>
    apiClient.get(`/admin/auctions/${id}/bids`),
  addBid: (data: { amount: number; auction_id: number }) =>
    apiClient.post(`/admin/auctions/bids`, data),
  updateBid: (id: number, data: { status: string }) =>
    apiClient.post(`/admin/auction-bids/${id}/status`, data),
  deleteBid: (id: number) => apiClient.delete(`/admin/auctions/bids/${id}`),
};

export default bidsService;
