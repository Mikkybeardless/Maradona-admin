import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useClickAway } from "react-use";
import PriceInput from "../common/priceInput";
import { toast } from "react-toastify";

interface MarkAsSoldModalProps {
  MarkAsSoldModal: boolean;
  setMarkAsSoldModal: (value: boolean) => void;

  onSubmit: (data: { qty_sold: string; sold_price: string }) => Promise<{
    success: boolean;
    message: string;
  }>;
}
export function MarkAsSoldModal({
  MarkAsSoldModal,
  setMarkAsSoldModal,
  onSubmit,
}: MarkAsSoldModalProps) {
  const [formData, setFormData] = useState({
    qty_sold: "",
    sold_price: "",
  });
  const [markingAsSold, setMarkingAsSold] = useState(false);
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
    setMarkingAsSold(true);
    if (!formData.qty_sold || !formData.sold_price) {
      toast.error("Please fill in all fields");
    }
    const result = await onSubmit(formData);
    if (result.success) {
      toast.success(result.message);
      setMarkingAsSold(false);
      setMarkAsSoldModal(false);
      return;
    } else {
      toast.error(result.message);
      setMarkingAsSold(false);
    }
  };
  return (
    MarkAsSoldModal && (
      <div className="w-screen h-screen  flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
        <div
          ref={MarkAsSoldModalRef}
          className="w-[90%] md:w-[40%] md:h-fit rounded-[24px] flex flex-col px-8 py-2 bg-white"
        >
          <div className="mt-5 flex items-center justify-between gap-x-3 border-b  ">
            <h2 className="text-2xl font-bold">Mark as Sold</h2>
            <button
              onClick={() => setMarkAsSoldModal(false)}
              className="rounded-full bg-gray-200 p-3 hover:underline"
            >
              <FaTimes size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-y-1 mt-5">
            <form className=" flex flex-col justify-center mb-14 items-center text-[#585858] gap-y-3">
              <div className="flex flex-col gap-y-1.5 flex-1 w-full">
                <label className="text-sm mb-2 font-medium">Quantity</label>
                <input
                  name="qty_sold"
                  onChange={handleChange}
                  placeholder="Enter quantity sold"
                  className="w-full p-3 flex gap-x-2 items-center rounded-lg outline-none border border-primaryBorder focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
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
                type="button"
                onClick={handleSubmit}
                className="bg-orange-500 text-white rounded-lg py-2 mt-5 w-full"
              >
                {markingAsSold ? "Marking..." : "Mark"}
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
