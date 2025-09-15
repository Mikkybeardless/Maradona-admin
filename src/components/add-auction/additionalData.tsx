import React from "react";

export const AdditionalDataSection: React.FC<{
  auctionDetails: Auction;
  setAuctionDetails: React.Dispatch<React.SetStateAction<Auction>>;
}> = ({ auctionDetails, setAuctionDetails }) => {
  const handleAddField = () => {
    setAuctionDetails((prev) => ({
      ...prev,
      data: [...(prev.data || []), { key: "", value: "" }],
    }));
  };

  const handleRemoveField = (index: number) => {
    const updatedData = auctionDetails.data?.filter((_, i) => i !== index);
    setAuctionDetails((prev) => ({ ...prev, data: updatedData }));
  };

  const handleFieldChange = (
    index: number,
    field: "key" | "value",
    value: string | number
  ) => {
    const updatedData = auctionDetails.data?.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setAuctionDetails((prev) => ({ ...prev, data: updatedData }));
  };

  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-y-3 bg-white border border-gray-300 shadow-sm">
      <h4 className="text-lg font-semibold ">Additional Data (Optional)</h4>
      <div className="flex gap-1">
        <p>Example:</p>
        <p className="w-full text-sm grid grid-cols-2 gap-x-5 gap-y-2 items-center text-gray-500">
          <span>Gear type</span>
          <span>Automatic</span>
        </p>
      </div>

      {auctionDetails.data?.map((item, index) => (
        <div
          key={index}
          className="w-full flex md:grid  md:grid-cols-2  md:px-0 gap-x-2 md:gap-x-5 gap-y-2 items-center"
        >
          <div className=" w-[40%] md:w-full flex flex-col gap-y-1">
            {/* <label htmlFor={`key-${index}`} className="text-sm font-medium">
              Label
            </label> */}
            <input
              id={`key-${index}`}
              type="text"
              placeholder="Enter label"
              value={item.key}
              onChange={(e) => handleFieldChange(index, "key", e.target.value)}
              className=" px-1.5 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-defaultOrange focus:border-transparent"
            />
          </div>

          <div className="w-[60%] md:w-full flex flex-col gap-y-1">
            {/* <label htmlFor={`value-${index}`} className="text-sm font-medium">
              Value
            </label> */}
            <div className="flex gap-x-2">
              <input
                id={`value-${index}`}
                type="text"
                placeholder="Enter value"
                value={item.value}
                onChange={(e) =>
                  handleFieldChange(index, "value", e.target.value)
                }
                className="md:flex-1 w-full px-1.5 py-1 md:px-3 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-defaultOrange focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="text-xs px-1 py-0.5 md:text-base md:px-2 md:py-1 bg-red-500 text-white rounded-sm md:rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddField}
        className="mt-2 px-1.5 py-1 md:px-3 md:py-1 bg-defaultOrange text-white rounded-md hover:bg-defaultOrangeHover focus:outline-none focus:ring-2 focus:ring-defaultOrange focus:ring-offset-2 transition-colors self-start"
      >
        Add Field
      </button>
    </div>
  );
};
