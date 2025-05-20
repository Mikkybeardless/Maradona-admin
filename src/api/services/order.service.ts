import apiClient from "../apiClient";

type Item_type = "car" | "house" | "land" | "others";
interface Order {
  transport_type: string;
  transport_date: string;
  transport_time: string;
  city: string;
  state_province: string;
  address: string;
  zip_code: string;
  new_owner_name: string;
  item_type: Item_type;
  email: string;
  phone_number: string;
  property_address?: string;
  number_of_bedrooms?: string;
  number_of_bathrooms?: string;
  square_footage?: string;
  lot_size?: string;
  condition: string;
  deed_transfer: string;
  inspection_report: string;
  home_warranty: string;
  documents: File[];
}

type OrderUpdate = Partial<Order>;
const orderService = {
  addOrderToShipment: (id: number, data: Order) =>
    apiClient.post(`/admin/orders/${id}/shipment`, data),
  getAllOrderShipments: (queryParams?: string) =>
    apiClient.get(`/admin/shipments?serach=${queryParams}`),
  getOrderShipment: (id: number) =>
    apiClient.get(`/admin/orders/${id}/shipment`),
  // showShipment: (id: string) =>
  //     apiClient.get(`/admin/shipments/${id}`),
  updateShipment: (id: number, orderId: string, data: OrderUpdate) =>
    apiClient.put(`/admin/orders/${id}/shipment/${orderId}/update`, data),
  deleteShipment: (id: number, orderId: string) =>
    apiClient.delete(`/admin/orders/${id}/shipment/${orderId}`),

  updateShipmentStatus: (id: number, status: string) =>
    apiClient.put(`/admin/orders/${id}/shipment/status`, { status }),
};

export default orderService;
export type { Order, OrderUpdate };
