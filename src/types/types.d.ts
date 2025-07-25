// product types

declare type ProductType = "land" | "car" | "house";
declare type ProductStatus = "draft" | "publish";
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

declare interface Product {
  productType: ProductType;
  productName: string;
  description: string;
  productPrice: number;
  salePrice: number;
  address: string;
  city: string;
  houseType: string;
  continueSelling: boolean;
  state: string;
  furnishedStatus: ProductFurnishedStatus;
  propertySize: number;
  weightUnit: WeightUnit;
  skuNumber: string;
  media: Media;
  documents: Media;
  status: ProductStatus;
  tags: string;
  inventory: string;
  weight: number;
  bodyType: ProductBodyType;
  engineType: string;
  accessibility: ProductAccessibility;
  fencing: ProductFencing;
  topography: ProductTopography;
  landType: ProductLandType;
  duration: ProductDuration;
  auctionDuration: number;
  transmission: string;
  condition: ProductCondition;
  houseCondition: HouseCondition;
  auctionType: ProductAuctionType;
  landSize: number;
  gearType: ProductGearType;
  mileage: string;
}
