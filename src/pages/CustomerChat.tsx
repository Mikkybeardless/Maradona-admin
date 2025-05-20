import { Link, useParams } from "react-router-dom";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { FaChevronRight } from "react-icons/fa6";
import House from "../assets/BHouse.png";
import { BsArrow90DegLeft, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import { PiFileJpg } from "react-icons/pi";
import { GoPaperclip } from "react-icons/go";

export default function CustomerChat() {
  const { ticketId } = useParams();
  return (
    <div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar py-20 bg-[#F5F5F5]">
      <div className="w-full py-5 px-5 md:pl-[250px] md:pr-[100px] fixed z-10 left-2 top-0 border-b border-b-primaryBorder">
        <DashboardSearchBar />
      </div>
      <div className=" px-5 md:px-14 w-full mt-4 flex flex-col gap-y-5">
        <div className="flex gap-x-4 items-center">
          <Link to={`/`} className="text-sm opacity-60">
            Dashboard
          </Link>
          <FaChevronRight size={18} />
          <span className="text-sm">Customer Care</span>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* left side */}

          <div className="w-full md:w-[60%]">
            <div className="w-full h-fit bg-white shadow-sm space-y-3 rounded-lg border p-5">
              <h1 className="text-xl flex gap-x-9 font-bold">
                Subject: <span>Refund Not Received</span>
              </h1>
              <div className="flex font-bold gap-x-5">
                Description:{" "}
                <p className="font-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque efficitur, nunc et facilisis tincidunt, nunc nisl
                  aliquet nunc, eget tincidunt nisl nunc eget nunc.
                </p>{" "}
              </div>
              <div className="flex font-bold gap-x-10">
                Ticket ID: <span className="font-light">{ticketId}</span>
              </div>
            </div>

            <div className="w-full min-h-[500px] relative flex flex-col  bg-white shadow-sm space-y-10 rounded-lg border p-5 pb-28 mt-5">
              {/* User  messages*/}
              <div>
                <div className="flex gap-3 justify-start">
                  <div className="w-fit h-fit text-white text-xl font-bold bg-defaultOrange px-4 py-1  space-y-3  rounded-lg ">
                    D
                  </div>
                  <div className=" items-center  flex gap-x-5">
                    <div className="max-w-[300px]">
                      <div className=" w-full h-fit text-white bg-defaultOrange p-5 pl-7  space-y-3  text-sm rounded-lg border ">
                        <p>Hello I tried Using the Card but it says Invalis</p>
                      </div>
                      <div className="flex text-[12px] mt-2 justify-end">
                        <span className="text-[#031849]">April 7, 3:00 PM</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 font-semibold items-center">
                      <BsThreeDots size={20} />
                      <BsArrow90DegLeft size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin messages */}
              <div>
                <div className="flex gap-3 justify-end">
                  <div className="max-w-[300px]">
                    <div className="w-full h-fit text-white  p-5 pl-7  space-y-3  text-sm rounded-lg border bg-[#14199C]">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad{" "}
                      </p>
                    </div>
                    <div className="flex text-[12px] mt-2 justify-end">
                      <span className="text-[#031849]">April 7, 3:00 PM</span>
                    </div>
                  </div>
                  <div className="w-fit h-fit text-white text-xl font-bold bg-[#14199C] px-4 py-1  space-y-3  rounded-lg ">
                    M
                  </div>
                </div>
              </div>

              {/* user message */}
              <div>
                <div className="flex gap-3 justify-start">
                  <div className="w-fit h-fit text-white text-xl font-bold bg-defaultOrange px-4 py-1  space-y-3  rounded-lg ">
                    D
                  </div>
                  <div className=" items-center  flex gap-x-5">
                    <div className="max-w-[300px]">
                      <div className=" w-full h-fit text-white bg-defaultOrange p-5 pl-7  space-y-3  text-sm rounded-lg border ">
                        <p>Hello I tried Using the Card but it says Invalis</p>
                      </div>
                      <div className="flex text-[12px] mt-2 justify-end">
                        <span className="text-[#031849]">April 7, 3:00 PM</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 font-semibold items-center">
                      <BsThreeDots size={20} />
                      <BsArrow90DegLeft size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-3 justify-end">
                  <div className="max-w-[300px]">
                    <div className="w-full h-fit text-white  p-5 pl-7  space-y-3  text-sm rounded-lg border bg-[#14199C]">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad{" "}
                      </p>
                    </div>
                    <div className="flex text-[12px] mt-2 justify-end">
                      <span className="text-[#031849]">April 7, 3:00 PM</span>
                    </div>
                  </div>
                  <div className="w-fit h-fit text-white text-xl font-bold bg-[#14199C] px-4 py-1  space-y-3  rounded-lg ">
                    M
                  </div>
                </div>
              </div>

              {/* input div */}

              <div className="absolute bottom-10 left-4 right-4 w-[95%] flex gap-x-5 rounded-xl bg-[#F3F3F3] py-1 px-4 items-center">
                <BsEmojiSmile size={30} />
                <PiFileJpg size={30} />
                <GoPaperclip size={30} />
                <input
                  type="text"
                  placeholder="Write here..."
                  className="outline-none bg-[#F3F3F3] p-4 w-full"
                />
                <button className="bg-[#14199C] text-white px-6 py-2 rounded-md">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="w-full md:w-[40%] flex flex-col gap-y-5">
            <div className="w-full h-fit bg-white shadow-sm space-y-3 rounded-lg border p-5">
              <div className="flex font-bold justify-between">
                <span className="text-xl">Ticket Info</span>
                <span>User ID: 2234drr</span>
              </div>
              <div className="flex items-center gap-x-5">
                Status:{" "}
                <span className="text-green-700 bg-[#E8F8E8] rounded-xl px-2 py-1 font-light">
                  Open
                </span>
              </div>
              <p>Date Submitted: April 7, 2025 – 2:43 PM</p>
              <p>
                Filled by:{" "}
                <span className="font-semibold">John Doe #FG07323</span>
              </p>
            </div>

            <div className="w-full h-fit bg-white shadow-sm space-y-6 rounded-lg border p-5">
              <span className="text-lg font-bold">Actions</span>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-5">
                  <span>Mark As:</span>
                  <button className="px-5 py-2 rounded-md text-sm font-semibold text-white bg-[#008000] hover:bg-inherit hover:border hover:border-[#008000] hover:text-[#008000]">
                    Resolved
                  </button>
                </div>
                <button className="px-5 py-2 rounded-md text-sm font-semibold text-white bg-defaultOrange hover:bg-defaultOrangeHover">
                  Save
                </button>
              </div>
            </div>

            <div className="w-full h-fit bg-white shadow-sm space-y-6 rounded-lg border p-5">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">Product Info</h3>
                <p className="text-sm">
                  Category <span className="font-semibold">Land</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#F5F5F5]">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="gird grid-cols-2 gap-3 bg-[#F5F5F5]"
                  >
                    <img
                      src={House}
                      alt="House"
                      className="w-full h-[94pxpx] object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-y-3">
                <p className="flex gap-3">
                  Price: <span className="font-semibold">N20,000,000</span>
                </p>
                <p className="flex gap-3">
                  Seller ID: <span className="font-semibold">#r5dhjf</span>
                </p>
                <p className="flex gap-3">
                  Transaction Date:{" "}
                  <span className="font-semibold">24 April 2025</span>
                </p>
                <p className="flex gap-3 items-center">
                  Verification result{" "}
                  <span className="bg-red-200 rounded-3xl px-3 py-1 text-red-500">
                    Cancelled
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
