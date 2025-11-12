// product types
declare type ProductType = "LAND" | "CAR" | "HOUSE";
declare type ProductStatus = "draft" | "published" | "pending" | "cancelled";
declare type ProductBodyType = "SUV" | "Sedan" | "Coupe" | "Truck" | "Bus";
declare type ProductFurnishedStatus = "Fully furnished" | "Unfurnished";
declare type ProductAccessibility = "Main road" | "Inner road";
declare type ProductFencing = "Fenced" | "Not fenced";
declare type ProductTopography = "Dry land" | "Water logged" | "Swampy";
declare type ProductLandType = "Residential" | "Commercial" | "Agricultural";
declare type ProductDuration = "Days" | "Weeks" | "Months";
declare type ProductAuctionType = "Auctioned" | "Non-Auctioned";
declare type ProductCondition = "New" | "Used" | "new" | "used";
declare type ProductGearType = "Manual" | "Automatic" | "manual" | "automatic";
declare type WeightUnit = "kg" | "g";
declare type Media = File[];
declare type HouseCondition = "Newly built" | "Old" | "Needs renovation";
declare type Category_id = string | number;

declare interface Product {
  name: string;
  type: ProductType;
  description: string;
  category_id: string;
  price: number;
  sale_price: number;
  continue_selling: boolean;
  weight_unit: WeightUnit;
  sku: string;
  media: Media;
  documents: Media;
  status: ProductStatus;
  tags: number[];
  inventory: number;
  // weight: number;
  // duration: ProductDuration | null;
  auction_duration: number | null;
  condition: ProductCondition | null;
  auction_type: ProductAuctionType;
  location_city: string | null;
  location_state: string | null;
  location_address: string | null;
}
declare interface ApiMedia {
  id: string | null;
  file_name: string;
  file_path: string;
  file_url: string;
  file_extension: string;
  file_size: number;
  uploaded_on: string | null;
  details: string | null;
  readable_name: string;
}
declare interface ApiProduct {
  name: string;
  type: ProductType;
  description: string;
  category_id: string;
  price: number;
  sale_price: number;
  continue_selling: boolean;
  state: string;
  weight_unit: WeightUnit;
  sku: string;
  media: ApiMedia[];
  documents: ApiMedia[];
  status: ProductStatus;
  tags: number[];
  inventory: number;
  // weight: number;
  // duration: ProductDuration | null;
  auction_duration: number | null;
  condition: ProductCondition | null;
  auction_type: ProductAuctionType;
  location_city: string | null;
  location_state: string | null;
  location_address: string | null;
}

declare interface Auction {
  name: string;
  type: string;
  description: string;
  category_id: Category_id;
  sku: string;
  price: string;
  // sale_price: string;
  inventory: number;
  media: Media;
  documents: Media;
  status: ProductStatus;
  starting_bid: string;
  reserve_price: string;
  start_time: string;
  end_time: string;
  tags: string[];
  incremental_bid_amount: string;
  minimum_bid_increment: string;
  auto_extend: "0" | "1";
  location_city: string;
  location_state: string;
  location_address: string;
  data: Record<string, string | number>[] | [];
}

declare interface ApiAuction extends Auction, ApiRes {
  winning_bid_id: string;
  seller_id: string;
  approved_by: string;
  approved_at: string;
  time_left: string;
}

declare interface House extends Product {
  house_type: string;
  house_beds: number;
  house_furnished: ProductFurnishedStatus;
  house_condition: HouseCondition;
  house_size: number;
  accessibility: ProductAccessibility;
  topography: ProductTopography;
  fencing: ProductFencing;
}

declare interface ApiHouse extends ApiProduct {
  house_type: string;
  house_beds: number;
  house_furnished: ProductFurnishedStatus;
  house_condition: HouseCondition;
  house_size: number;
  accessibility: ProductAccessibility;
  topography: ProductTopography;
  fencing: ProductFencing;
}

declare interface Land extends Product {
  land_type: ProductLandType;
  land_size: number;
  accessibility: ProductAccessibility;
  topography: ProductTopography;
  fencing: ProductFencing;
}
declare interface ApiLand extends ApiProduct {
  land_type: ProductLandType;
  land_size: number;
  accessibility: ProductAccessibility;
  topography: ProductTopography;
  fencing: ProductFencing;
}
declare interface Car extends Product {
  body_type: ProductBodyType;
  engine_type: string;
  transmission: string;
  mileage: string;
  gear_type: ProductGearType | null;
}
declare interface ApiCar extends ApiProduct {
  body_type: ProductBodyType;
  engine_type: string;
  transmission: string;
  mileage: string;
  gear_type: ProductGearType | null;
}
declare type ProductDetails = House | Land | Car;
declare type ApiProductDetails = ApiHouse | ApiLand | ApiCar;

declare interface ApiProduct extends Product {
  id: number;
  created_at: string;
  updated_at: string;
  seller: Seller;
  belongs_to_admin: boolean;
}

declare type ProductPayloadMap = {
  LAND: Pick<
    Land,
    | "name"
    | "description"
    | "location_address"
    | "location_city"
    | "location_state"
    | "price"
    | "category_id"
    | "type"
    | "land_type"
    | "land_size"
    | "accessibility"
    | "topography"
    | "fencing"
    | "status"
    | "media"
    | "tags"
    | "documents"
    | "condition"
    | "inventory"
  >;
  HOUSE: Pick<
    House,
    | "name"
    | "description"
    | "price"
    | "category_id"
    | "type"
    | "house_type"
    | "house_beds"
    | "house_furnished"
    | "house_condition"
    | "house_size"
    | "accessibility"
    | "location_address"
    | "location_city"
    | "location_state"
    | "media"
    | "tags"
    | "documents"
    // | "condition"
    | "inventory"
  >;
  CAR: Pick<
    Car,
    | "name"
    | "description"
    | "location_address"
    | "location_city"
    | "location_state"
    | "price"
    | "category_id"
    | "type"
    | "body_type"
    | "engine_type"
    // | "transmission"
    | "mileage"
    | "gear_type"
    | "status"
    | "media"
    | "tags"
    | "documents"
    | "condition"
    | "inventory"
  >;
};

interface ApiRes {
  id: number;
  created_at: string;
  updated_at: string;
}
// tags
declare interface Tag {
  name: string;
  slug: string;
  picture: string | null;
  description: string;
}
declare interface ApiTag extends Tag, ApiRes {}

declare interface Category {
  name: string;
  slug: string;
  picture: string | null;
  description: string;
}
declare interface ApiCategory extends Category, ApiRes {}

declare interface CheckboxState {
  id: string;
  isChecked: boolean;
}

declare interface CarCheckboxes {
  gear_type: CheckboxState;
  body_type: CheckboxState;
}

declare interface LandCheckboxes {
  accessibility: CheckboxState;
  fencing: CheckboxState;
  topography: CheckboxState;
  land_type: CheckboxState;
}

interface HouseCheckboxes {
  accessibility: CheckboxState;
  house_condition: CheckboxState;
}

// user
interface User {
  name: string;
  email: string;
  email_verified_at: string | null;
  type: string;
}
declare interface ApiUser extends User, ApiRes {}
declare interface Agent extends User {
  agent_profile: {
    id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
}
declare interface ApiAgent extends Agent, ApiRes {}
declare interface Admin extends User {
  admin_profile: {
    id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    profile_pic_url: string | null;
  };
}
declare interface ApiAdmin extends Admin, ApiRes {}
declare interface Seller extends User {
  seller_profile: {
    id: number;
    user_id: string;
    shop_name: string | null;
    email: string | null;
    phone: string | null;
    profile_pic: string | null;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
  };
}
declare interface ApiSeller extends Seller, ApiRes {}

declare interface Buyer extends User {
  buyer_profile: {
    id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
}

declare interface ApiBuyer extends Buyer, ApiRes {}
declare interface Inspection {
  id: number;
  product_type: string;
  product_id: string;
  seller_id: string;
  agent_id: string;
  scheduled_at: string;
  status: string;
  notes: string;
  assigned_at: string;
  completed_at: string;
  auction_product: null;
  product: ApiProductDetails | null;
  agent: Agent;
  seller: Seller;
}
declare interface ApiInspection extends Inspection, ApiRes {}

// stats

declare interface UserStatsData {
  user_type: string;
  count: string;
}
declare interface UserStats {
  data: UserStatsData[];
  total_users: number;
  period: Period;
}
declare interface Period {
  start: string;
  end: string;
  description: string;
}
declare interface TotalRevenue {
  direct_sales_revenue: number;
  auction_sales_revenue: string;
  total_revenue: number;
  period: Period;
}
declare interface TopSellingProducts {
  data: {
    product: ProductDetails | null;
    product_type: string;
    direct_sales_qty: number;
    direct_sales_revenue: number;
    auction_sales_qty: number;
    auction_sales_revenue: number;
    total_qty: number;
    total_revenue: number;
  }[];
  period: Period;
}
declare interface TopSellingLocations {
  data: {
    location: string;
    product_type: string;
    direct_sales_qty: number;
    direct_sales_revenue: number;
    auction_sales_qty: number;
    auction_sales_revenue: number;
    total_qty: number;
    total_revenue: number;
  }[];
  period: Period;
}

declare interface MonthlyReport {
  data: {
    month: string;
    month_key: string;
    direct_sales_revenue: number;
    auction_sales_revenue: string;
    total_revenue: 8000000;
  }[];
  period: Period;
}
declare interface TotalSales {
  current_period: {
    direct_sales_units: number;
    direct_sales_amount: number;
    auction_sales_units: number;
    auction_sales_amount: number;
    total_units: number;
    total_amount: number;
  };
  previous_period: {
    direct_sales_units: number;
    direct_sales_amount: number;
    auction_sales_units: number;
    auction_sales_amount: number;
    total_units: number;
    total_amount: number;
  };
  changes: {
    unit_change: number;
    amount_change: number;
    unit_percentage_change: number;
    amount_percentage_change: number;
  };
  period: Period;
  comparison_period: {
    start: string;
    end: string;
  };
}
declare interface TotalOrder {
  direct_sales_orders: number;
  auction_sales_orders: number;
  total_orders: number;
  period: {
    start: string | null;
    end: string | null;
    description: string;
  };
}
declare interface TopSellingByType extends TopSellingProducts {}

declare interface Stats {
  totalRevenue: TotalRevenue;
  totalUsers: UserStats;
  topSellingProducts: TopSellingProduct;
  totalSales: TotalSales;
  monthlyReport: MonthlyReport;
  totalOrders?: TotalOrder;
  topSellingProductsByType?: TopSellingByType;
}

declare interface Enquiry {
  product_id: string;
  buyer_id: string;
  message: string;
  status: string;
  agent_id: string | null;
  qty_sold: number | string | null;
  sold_price: number | string | null;
  sold_at: string | null;
  product: ProductDetails | null;
  buyer: ApiBuyer | null;
  agent: ApiAgent | null;
  inspection_request: ApiInspection | null;
}

declare interface ApiEnquiry extends Enquiry, ApiRes {}

declare interface Bid {
  auction_product_id: string;
  buyer_id: string;
  amount: string;
  status: string;
  agent_id: string;
  qty_sold: string;
  sold_price: string;
  sold_at: string;
  accepted_at: string | null;
  rejected_at: string | null;
}

declare interface ApiBid extends Bid, ApiRes {}

declare interface AgentStats {
  inspection_requests: {
    total: number;
    assigned: number;
    scheduled: number;
    passed: number;
    failed: number;
  };
  purchase_enquiries: {
    total: number;
    open: number;
    assigned: number;
    sold: number;
    closed: number;
  };
  purchase_inspection_requests: {
    total: number;
    pending: number;
    scheduled: number;
    completed: number;
  };
  auction_bids: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    closed: number;
    reopened: number;
    scheduled: number;
    inspected: number;
    completed: number;
    sold: number;
  };
}

declare interface AgentDetails extends ApiAgent {
  statistics: AgentStats;
  agent_profile: {
    id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    location: string;
    phone: string;
    staff_id: string;
    availability: string;
    bank_name: string;
    profile_pic_url: string | null;
    bank_account_number: string;
  };
}

//*******
//  Notification Types
// */
declare interface NotificationStats {
  total: number;
  unread: number;
  read: number;
}

declare interface NotificationData {
  id: string | number;
  title?: string;
  message?: string;
  data?: any;
  humanized_data?: any;
  read_at?: string | null;
  created_at: string;
}

declare interface PaginationInfo {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

declare interface NotificationsState {
  notifications: NotificationData[];
  unreadNotifications: NotificationData[];
  stats: NotificationStats | null;
  pagination: PaginationInfo;
  loading: boolean;
  statsLoading: boolean;
  error: string | null;
}

// promotions
declare interface Promotion {
  product_id: string;
  seller_id: string;
  start_date: string;
  end_date: string;
  duration_days: string;
  cost_per_day: string;
  total_cost: string;
  payment_method: string;
  status: string;
  payment_reference: string;
  payment_link: string;
  payment_completed_at: string | null;
  activated_at: string | null;
  closed_at: string | null;
  closed_by: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// customer

declare interface Breakdown {
  direct_orders: number;
  auction_orders: number;
  direct_spending: string;
  auction_spending: string;
}

declare interface RecentOrder {
  id: string;
  type: string;
  product_name: string;
  product_type: string;
  amount: string;
  status: string;
  date: string;
  created_at: string;
}
declare interface CustomerStats {
  total_orders: number;
  amount_spent: number;
  conversion_rate: number;
  frequency: number;
}

declare interface Customer {
  customer: ApiBuyer;
  stats: CustomerStats;
  breakdown: Breakdown;
  recent_orders: RecentOrder[];
}
