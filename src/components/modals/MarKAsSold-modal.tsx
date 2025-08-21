import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useClickAway } from "react-use";
import PriceInput from "../common/priceInput";
import purchaseEnquiriesService from "../../api/services/purchaseEnquiries.service";

interface MarkAsSoldModalProps {
  MarkAsSoldModal: boolean;
  setMarkAsSoldModal: (value: boolean) => void;
  id: number;
}
export function MarkAsSoldModal({
  MarkAsSoldModal,
  setMarkAsSoldModal,
  id,
}: MarkAsSoldModalProps) {
  const [formData, setFormData] = useState({
    qty_sold: "",
    sold_price: "",
  });
  const MarkAsSoldModalRef = useRef<HTMLDivElement>(null);
  useClickAway(MarkAsSoldModalRef, () => {
    setMarkAsSoldModal(false);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
    // const response = await purchaseEnquiriesService.markAsSold(id, {
    //   qty_sold: Number(formData.qty_sold),
    //   sold_price: Number(formData.sold_price),
    // });
  };
  return (
    MarkAsSoldModal && (
      <div className="w-screen h-screen  flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
        <div
          ref={MarkAsSoldModalRef}
          className="md:w-[40%] md:h-[70%] rounded-[24px] flex flex-col px-8 py-2 bg-white"
        >
          <div className="mt-5 flex items-center justify-between gap-x-3 border-b pb-1 ">
            <h2 className="text-2xl font-bold">Mark as Sold</h2>
            <button
              onClick={() => setMarkAsSoldModal(false)}
              className="rounded-full bg-gray-200 p-3 hover:underline"
            >
              <FaTimes size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-y-1 mt-5">
            <form
              onSubmit={handleSubmit}
              className=" flex flex-col justify-center mb-14 items-center text-[#585858] gap-y-3"
            >
              <div className="flex flex-col">
                <label className="text-sm mb-1">Quantity</label>
                <input
                  name="qty_sold"
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  type="number"
                />
              </div>
              <PriceInput
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    sold_price: value,
                  }))
                }
                id="sold_price"
                label="Sold Price:"
                name="sold_price"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white rounded-lg py-2 w-full"
              >
                Submit
              </button>
            </form>

            {/* <div className="flex flex-col gap-y-2">
              <button className="bg-[#008000] rounded-lg py-2 w-full text-white">
                Approve
              </button>
              <button className="bg-[#EE1E1E] rounded-lg py-2 w-full text-white">
                Reject
              </button>
            </div> */}
          </div>
        </div>
      </div>
    )
  );
}
