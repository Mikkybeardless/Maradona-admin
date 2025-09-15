import CustomDateInput from "../common/dateInput";
import PriceInput from "../common/priceInput";

interface BidPriceAndDurationProps {
  auctionDetails: Auction;
  setAuctionDetails: React.Dispatch<React.SetStateAction<Auction>>;
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

export const BidPricingAndDuration: React.FC<BidPriceAndDurationProps> = ({
  auctionDetails,
  setAuctionDetails,
  setDate,
  date,
  time,
  setTime,
}) => {
  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
      <h4 className="text-lg font-semibold">Auction Details</h4>

      <div className="w-full grid grid-cols-2 gap-x-5 gap-y-8">
        <PriceInput
          onChange={(value) =>
            setAuctionDetails((prev) => ({
              ...prev,
              starting_bid: value,
            }))
          }
          id="starting_bid"
          label="Starting Bid:"
          name="starting_bid"
        />

        <PriceInput
          onChange={(value) =>
            setAuctionDetails((prev) => ({
              ...prev,
              reserve_price: value,
            }))
          }
          value={auctionDetails.reserve_price}
          id="reserve_price"
          label="Reserve Price:"
          name="reserve_price"
        />
        <div className="flex flex-col gap-y-1.5 flex-1 w-full">
          <CustomDateInput
            label="Start Date:"
            onChange={(newDate) => {
              setDate((prevDate) => ({
                ...prevDate,
                start: newDate,
              }));
            }}
            iconColor="text-defaultOrange"
            value={date.start}
          />
        </div>
        <div className="flex flex-col gap-y-1.5 flex-1 w-full">
          <h5 className="text-sm mb-2 font-medium">Start Time:</h5>
          <input
            type="time"
            value={time.start}
            onChange={(e) => {
              setTime((prevTime) => ({
                ...prevTime,
                start: e.target.value,
              }));
            }}
            className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
          />
        </div>
        <div className="flex flex-col gap-y-1.5 flex-1 w-full">
          <CustomDateInput
            label="End Date:"
            onChange={(newDate) => {
              setDate((prevDate) => ({
                ...prevDate,
                end: newDate,
              }));
            }}
            iconColor="text-defaultOrange"
            value={date.end}
          />
        </div>
        <div className="flex flex-col gap-y-1.5 flex-1 w-full">
          <h5 className="text-sm mb-2 font-medium">End Time:</h5>
          <input
            type="time"
            value={time.end}
            onChange={(e) => {
              setTime((prevTime) => ({
                ...prevTime,
                end: e.target.value,
              }));
            }}
            className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder"
          />
        </div>
      </div>
    </div>
  );
};
