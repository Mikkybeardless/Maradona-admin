import { useRef, useState } from "react";
// import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useClickAway } from "react-use";
import UserService from "../../api/services/userMgt.service";
import { appendField } from "../../helper/appendArrayField";

interface AddAgentModalProps {
  newAgentModal: boolean;
  setNewAgentModal: (value: boolean) => void;
}

export default function AddAgentModal({
  newAgentModal,
  setNewAgentModal,
}: AddAgentModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const newAgentModalRef = useRef<HTMLDivElement>(null);
  useClickAway(newAgentModalRef, () => {
    setNewAgentModal(false);
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

  const handleCreateAgent = async () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      // Handle agent creation logic here
      console.log("Creating agent:", formData);
      const createData = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        appendField(
          createData,
          key,
          value as string | number | boolean | File | null | undefined
        );
      }
      const response = await UserService.createAgent(createData);
      if (response.status === 201) {
        toast.success("Agent created successfully");
        setNewAgentModal(false);
      }
    } catch (error) {
      toast.error("Agent creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    newAgentModal && (
      <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
        <div
          ref={newAgentModalRef}
          className="md:w-[50%] h-[90%] rounded-[24px] flex flex-col p-8 bg-white"
        >
          <h2 className="text-2xl font-bold">Add New Agent</h2>
          <div className="w-full flex flex-col flex-1 gap-y-3.5 mt-2 overflow-y-auto custom-scrollbar-low-opacity">
            <div className="flex flex-col gap-y-2 text-sm">
              <label htmlFor="fullName" className="">
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-y-2 text-sm">
              <label htmlFor="email" className="">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-y-2 text-sm">
              <label htmlFor="password" className="">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-y-2 text-sm">
              <label htmlFor="confirmPassword" className="">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                placeholder="Type"
              />
            </div>
            {/* <div className="flex flex-col gap-y-2 text-sm">
              <label htmlFor="phoneNumber" className="">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col">
              <h6 className="text-sm">Identification Upload:</h6>
              <div className="w-full grid grid-cols-2 gap-x-4 mt-2">
                <div className="w-full flex flex-col gap-y-2">
                  <p className="text-sm text-[#A3A3B3]">Upload Front</p>
                  <button className="w-full py-3.5 flex justify-center items-center gap-x-3 rounded-lg bg-[#F4F1F3] border border-primaryBorder border-dashed">
                    <IoCloudUploadOutline size={24} color="#e65800" />
                    <span className="text-sm">Upload File</span>
                  </button>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <p className="text-sm text-[#A3A3B3]">Upload Back</p>
                  <button className="w-full py-3.5 flex justify-center items-center gap-x-3 rounded-lg bg-[#F4F1F3] border border-primaryBorder border-dashed">
                    <IoCloudUploadOutline size={24} color="#e65800" />
                    <span className="text-sm">Upload File</span>
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
            <button
              onClick={() => setNewAgentModal(false)}
              className="rounded-lg hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAgent}
              className="px-5 py-3 rounded-lg text-white bg-defaultOrange"
            >
              {isLoading ? "Creating..." : "Create Agent"}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
