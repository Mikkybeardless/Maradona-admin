// product types
declare type ProductType = "LAND" | "CAR" | "HOUSE";
declare type ProductStatus = "draft" | "published";
declare type ProductBodyType = "SUV" | "Sedan" | "Coupe" | "Truck" | "Bus";
declare type ProductFurnishedStatus = "furnished" | "unfurnished";
declare type ProductAccessibility = "main-road" | "inner-road";
declare type ProductFencing = "fenced" | "not-fenced";
declare type ProductTopography = "dry-land" | "water-logged" | "swampy";
declare type ProductLandType = "residential" | "commercial" | "agricultural";
declare type ProductDuration = "days" | "weeks" | "months";
declare type ProductAuctionType = "auctioned" | "non-auctioned";
declare type ProductCondition = "new" | "old";
declare type ProductGearType = "manual" | "automatic";
declare type WeightUnit = "kg" | "g";
declare type Media = File[];
declare type HouseCondition = "newly-built" | "old" | "needs-renovation";
declare type Category_id = "1" | "2" | "3";

declare interface Product {
  name: string;
  type: ProductType;
  description: string;
  category_id: Category_id;
  price: number;
  address: string;
  city: string;
  sale_price: number;
  continue_selling: boolean;
  state: string;
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

declare interface Land extends Product {
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
declare type ProductDetails = House | Land | Car;
declare type ApiProductDetails = ProductDetails & ApiRes;
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
    // | "fencing"
    // | "status"
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
  product: Product;
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
