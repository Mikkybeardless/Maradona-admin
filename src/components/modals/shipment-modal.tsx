import { FaTimes } from "react-icons/fa";
import CustomDateInput from "../common/dateInput";
import { PhoneInput } from "react-international-phone";
import StateCitySelector from "../StateCitySelector";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import "react-international-phone/style.css";

interface ShipmentModalProps {
  shipmentModal: boolean;
  setShipmentModal: (value: boolean) => void;
}

export default function ShipmentModal({
  setShipmentModal,
  shipmentModal,
}: ShipmentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    zip: "",
    product: "",
    productDescription: "",
    shippingCarrier: "",
    edd: null as Date | null,
    trackingNumber: "",
    deliveryAddress: "",
    streetAddress: "",
    address: "",
  });
  const promotionModalRef = useRef<HTMLDivElement>(null);
  useClickAway(promotionModalRef, () => {
    setShipmentModal(false);
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    shipmentModal && (
      <section
        id="shipment-modal"
        className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm"
      >
        <div
          ref={promotionModalRef}
          aria-modal
          className="w-[85%] md:w-[40%] h-[95%] flex flex-col gap-y-3 p-8 rounded-[24px]  bg-white"
        >
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Create Shipment</h2>
            <button onClick={() => setShipmentModal(false)}>
              <FaTimes className="cursor-pointer" size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-y-6 mt-3 overflow-y-auto custom-scrollbar-low-opacity">
            <div className="flex flex-col gap-y-1 text-sm">
              <label className="font-medium">Customer Name:</label>
              <input
                className="p-3 rounded-lg border border-[#B0B0B0]"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-y-1 text-sm">
              <label className="font-medium">Phone:</label>
              <div className="w-full flex items-end gap-x-6">
                <PhoneInput
                  className="!w-full gap-x-5"
                  countrySelectorStyleProps={{
                    className: "w-[20%]",
                    buttonClassName:
                      "!h-[auto] w-full py-3 !rounded-lg border-[#B0B0B0]",
                  }}
                  defaultCountry="ng"
                  onChange={(val) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      phone: val,
                    }));
                  }}
                  value={formData.phone}
                  inputClassName="w-full !h-[unset] !py-3 !rounded-lg outline-none !border !border-[#B0B0B0] !text-base"
                />
              </div>
            </div>

            <StateCitySelector
              onCityChange={(city) => {
                setFormData((prevData) => ({
                  ...prevData,
                  city: city?.value || "",
                }));
              }}
              onStateChange={(state) => {
                setFormData((prevData) => ({
                  ...prevData,
                  state: state?.value || "",
                }));
              }}
            />
            <div className="flex flex-col gap-y-1 text-sm">
              <label className="font-medium">Zip:</label>
              <input
                className="p-3 rounded-lg border border-[#B0B0B0]"
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-y-1 text-sm">
              <label htmlFor="streetAddress" className="font-medium">
                Street Address:
              </label>
              <input
                className="p-3 rounded-lg border border-[#B0B0B0]"
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-y-1 text-sm">
              <label htmlFor="product" className="font-medium">
                Product:
              </label>
              <input
                className="p-3 rounded-lg border border-[#B0B0B0]"
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-y-1 text-sm">
              <label htmlFor="productDescription" className="font-medium">
                Product description:
              </label>
              <textarea
                className="p-3 rounded-lg resize-none outline-none custom-scrollbar border border-[#B0B0B0]"
                placeholder="Type"
                id="productDescription"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div className="flex flex-col gap-y-1 text-sm">
              <label htmlFor="shippingCarrier" className="font-medium">
                Shipping carrier:
              </label>
              <input
                className="p-3 rounded-lg border border-[#B0B0B0]"
                type="text"
                id="shippingCarrier"
                name="shippingCarrier"
                value={formData.shippingCarrier}
                onChange={handleInputChange}
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-y-1 text-sm">
              <CustomDateInput
                label="E.D.D:"
                value={formData.edd}
                onChange={(date) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    edd: date,
                  }));
                }}
                // iconColor="text-blue-600"
              />
            </div>
          </div>

          <div className="flex justify-end gap-x-2.5 text-sm">
            <button className="p-2.5 rounded-lg text-white bg-defaultOrange hover:bg-defaultOrangeHover">
              Create
            </button>
          </div>
        </div>
      </section>
    )
  );
}
