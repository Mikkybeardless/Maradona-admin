import PriceInput from "../common/priceInput";

interface PricingSectionProps {
  auctionDetails: Auction;
  setAuctionDetails: React.Dispatch<React.SetStateAction<Auction>>;
}

export const PricingSection = ({
  auctionDetails,
  setAuctionDetails,
}: PricingSectionProps) => {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="flex flex-col px-5 md:px-0 gap-y-1.5 flex-1 w-full">
        <label htmlFor="incremental_bid_amount" className="mb-2 font-semibold">
          Incremental Bid Amount:
        </label>
        <PriceInput
          onChange={(value) => {
            setAuctionDetails((prev) => ({
              ...prev,
              incremental_bid_amount: value,
            }));
          }}
          value={auctionDetails.incremental_bid_amount}
          id="incremental_bid_amount"
          name="incremental_bid_amount"
          placeholder="₦"
        />
      </div>
      <div className="flex flex-col px-5 md:px-0 gap-y-1.5 flex-1 w-full">
        <label htmlFor="minimum_bid_increment" className="mb-2 font-semibold">
          Minimum Increment Bid:
        </label>
        <PriceInput
          onChange={(value) =>
            setAuctionDetails((prev) => ({
              ...prev,
              minimum_bid_increment: value,
            }))
          }
          value={auctionDetails.minimum_bid_increment}
          id="minimum_bid_increment"
          name="minimum_bid_increment"
          placeholder="₦"
        />
      </div>
      <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-primaryBorder">
        <h4 className="text-lg font-semibold">Pricing</h4>

        <div className="w-full flex justify-between items-center gap-x-5">
          <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
            <label htmlFor="price" className="text-sm mb-2 font-medium">
              Price:
            </label>
            <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
              <PriceInput
                onChange={(value) =>
                  setAuctionDetails((prev) => ({
                    ...prev,
                    price: value,
                  }))
                }
                value={auctionDetails.price}
                id="price"
                name="price"
                placeholder="0.00"
                inputClassName="py-3 outline-none w-full"
              />
              <span>NGN</span>
            </div>
          </div>
          {/* <div className="flex flex-col gap-y-1.5 flex-1 w-[50%]">
                    <label
                      htmlFor="sale_price"
                      className="text-sm mb-2 font-medium"
                    >
                      Sale price:
                    </label>
                    <div className="w-full px-3 flex gap-x-2 items-center rounded-lg border border-primaryBorder">
                      <PriceInput
                        // onChange={(value) =>
                        //   setAuctionDetails((prev) => ({
                        //     ...prev,
                        //     sale_price: value,
                        //   }))
                        // }
                        id="sale_price"
                        name="sale_price"
                        // value={auctionDetails.sale_price}
                        placeholder="0.00"
                        inputClassName="py-3 outline-none w-full"
                      />
                      <span>NGN</span>
                    </div>
                  </div> */}
        </div>
      </div>
      <div className="flex flex-col p-5 rounded-lg bg-white border border-primaryBorder">
        <h4 className="text-lg font-semibold">Enable Auto-Extend</h4>
        <div className="flex flex-col gap-y-4 mt-3">
          <div className="flex gap-x-2 items-center text-sm">
            <input
              className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
              id="condition1"
              checked={auctionDetails.auto_extend === "0"}
              type="checkbox"
              onChange={() =>
                setAuctionDetails((prev) => ({
                  ...prev,
                  auto_extend: "0",
                }))
              }
            />
            <label htmlFor="condition1">No</label>
          </div>
          <div className="flex gap-x-2 items-center text-sm">
            <input
              className="w-[18px] h-[18px] rounded-lg border border-primaryBorder outline-none"
              id="condition2"
              checked={auctionDetails.auto_extend === "1"}
              type="checkbox"
              onChange={() =>
                setAuctionDetails((prev) => ({
                  ...prev,
                  auto_extend: "1",
                }))
              }
            />

            <label htmlFor="condition2" className="flex items-end gap-x-1">
              Yes
              <span className="text-xs">
                (Extend auction end time if a bid is placed in the last few
                minutes)
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
