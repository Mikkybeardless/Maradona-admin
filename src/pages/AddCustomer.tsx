import { useState } from "react";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { PhoneInput } from "react-international-phone";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "react-international-phone/style.css";

export default function AddCustomer({ customer }: { customer: string }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    region: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., send data to an API
    console.log("Form submitted:", formData);
    // Reset form after submission
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      region: "",
      address: "",
    });
  };
  return (
    <section className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-10 bg-[#F5F5F5]">
      <div className="w-full py-5 px-24 border-b bg-white border-b-primaryBorder">
        <DashboardSearchBar />
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-24 w-full mt-4 flex flex-col items-center flex-1"
      >
        <h1 className="text-3xl w-full font-bold flex capitalize items-start">
          Add {customer}
        </h1>

        <div className="w-[70%] flex flex-col gap-y-6 p-5 mt-6 rounded-lg border border-primaryBorder bg-white">
          <h3 className="text-lg font-semibold">Basic details</h3>

          <div className="w-full grid grid-cols-2 gap-x-6">
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="firstName" className="text-sm">
                First name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                id="firstName"
                className="rounded-lg p-3 outline-none border border-primaryBorder"
                placeholder="First name"
              />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <label htmlFor="lastName" className="text-sm">
                Last name:
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="rounded-lg p-3 outline-none border border-primaryBorder"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-1.5">
            <label htmlFor="email" className="text-sm">
              Email:
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
              className="rounded-lg p-3 outline-none border border-primaryBorder"
              placeholder="Email address"
            />
          </div>

          <div className="w-full flex items-end gap-x-6">
            <PhoneInput
              className="!w-full gap-x-5"
              countrySelectorStyleProps={{
                className: "w-[20%]",
                buttonClassName: "!h-[auto] w-full py-3 !rounded-lg",
              }}
              defaultCountry="ng"
              onChange={(val) => {
                setFormData((prevData) => ({
                  ...prevData,
                  phone: val,
                }));
              }}
              value={formData.phone}
              inputClassName="w-full !h-[unset] !py-3 !rounded-lg outline-none !border !border-primaryBorder !text-base"
            />
          </div>
        </div>
        {/* basic details */}

        <div className="w-[70%] flex flex-col gap-y-6 p-5 mt-6 rounded-lg border border-primaryBorder bg-white">
          <div className="flex flex-col gap-y-1 5">
            <h3 className="text-lg font-semibold">Shipping & Delivery</h3>
            <span className="text-sm">
              The adddress that will be used for the delivery of your goods
            </span>
          </div>

          <div className="w-full flex flex-col gap-y-1.5">
            <label htmlFor="country" className="text-sm">
              Country:
            </label>
            <CountryDropdown
              classes="rounded-lg p-3 outline-none border border-primaryBorder"
              value={formData.country}
              id="country"
              onChange={(val) => {
                setFormData((prevData) => ({
                  ...prevData,
                  country: val,
                }));
              }}
            />
          </div>

          <div className="w-full flex flex-col gap-y-1.5">
            <label htmlFor="region" className="text-sm">
              Region:
            </label>
            <RegionDropdown
              classes="rounded-lg p-3 outline-none border border-primaryBorder"
              country={formData.country}
              id="region"
              value={formData.region}
              onChange={(val) => {
                setFormData((prevData) => ({
                  ...prevData,
                  region: val,
                }));
              }}
            />
          </div>

          <div className="flex flex-col gap-y-1.5">
            <label htmlFor="address" className="text-sm">
              Address:
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              className="rounded-lg p-3 outline-none border border-primaryBorder"
              placeholder="Address"
            />
          </div>
        </div>

        <div className="w-[70%] flex justify-end items-center gap-x-5 mt-6">
          <button
            onClick={handleCancel}
            type="button"
            className="px-4 py-2.5 text-sm rounded-lg border border-defaultOrange text-defaultOrange"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2.5 text-sm rounded-lg bg-defaultOrange capitalize text-white"
          >
            Save {customer}
          </button>
        </div>
      </form>
    </section>
  );
}
