import { AdditionalDataSection } from "./additionalData";
import { AuctionTypeSection } from "./auctionTypeSection";
import { MediaSection } from "./mediaSection";
import { BidPricingAndDuration } from "./pricing&Duration";
import { PricingSection } from "./pricingSection";
import { SideBarSection } from "./sideBarSection";

interface AuctionFormProps {
  auctionDetails: Auction;
  setAuctionDetails: React.Dispatch<React.SetStateAction<Auction>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  date: {
    start: Date | null;
    end: Date | null;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      start: Date | null;
      end: Date | null;
    }>
  >;
  time: {
    start: string | number;
    end: string | number;
  };
  setTime: React.Dispatch<
    React.SetStateAction<{
      start: string | number;
      end: string | number;
    }>
  >;
}

export const AddAuctionForm: React.FC<AuctionFormProps> = (props) => {
  return (
    <div className="w-full flex  flex-col md:flex-row items-start gap-y-5 gap-x-8 mt-8">
      {/* Left Section */}
      <section className="w-full md:w-[70%] flex flex-col gap-y-5 overflow-hidden">
        <AuctionTypeSection {...props} />
        <MediaSection {...props} />
        <BidPricingAndDuration {...props} />
        <PricingSection {...props} />
        <AdditionalDataSection {...props} />
      </section>
      {/* Right Sidebar */}
      <SideBarSection {...props} />
    </div>
  );
};
