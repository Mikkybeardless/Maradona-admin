import { FaArrowLeftLong, FaCircle, FaRegFilePdf } from "react-icons/fa6";
import DashboardSearchBar from "../components/DashboardSearchBar";
import Profile from "../assets/sign-in-image.png";
import { VscVerifiedFilled } from "react-icons/vsc";
import { PiPencilSimpleBold } from "react-icons/pi";
// import MuiTableComponent from "../components/table/TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TbUserScan } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
// import PDF from "../assets/PDF.svg";
import { useWindowResizer } from "../hooks/useWindowResize";
import UserService from "../api/services/userMgt.service";
// import { toast } from "react-toastify";
import { DetailLoadingState } from "../components/common/detailLoadingState";



export default function Agent() {
  const [editAgentModal, setEditAgentModal] = useState(false);
  const editAgentModalRef = useRef(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [agent, setAgent] = useState<AgentDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        try {
          const response = await UserService.getAgent(parseInt(id));
          console.log("Agent details:", response.data);
          setAgent(response.data);
        } catch (error) {
          console.error("Error fetching agent details:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Agent ID is undefined.");
      }
    };

    fetchDetails();
  }, [id]);

  useClickAway(editAgentModalRef, () => {
    setEditAgentModal(false);
  });

  const { isMobile } = useWindowResizer();

  function openEditAgentModal() {
    setEditAgentModal(true);
  }

  function closeEditAgentModal() {
    setEditAgentModal(false);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Request ID", flex: 0.5, sortable: false },
    {
      field: "itemName",
      headerName: "Item Name",
      flex: 1,
      renderCell: ({ value }) => (
        <div className="flex items-center gap-x-2">
          <img
            src={value.image}
            alt={value.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium">{value.name}</span>
            <span className="text-xs text-gray-500">{value.location}</span>
          </div>
        </div>
      ),
      sortable: false,
    },
    { field: "date", headerName: "Request Date", flex: 0.7, type: "date" },
    { field: "category", headerName: "Category", flex: 0.5, sortable: false },
    { field: "status", headerName: "Status", flex: 0.5, sortable: false },
  ];
  return isLoading ? (
		<DetailLoadingState message="Loading agent details" />
  ) : (
		<div className="w-full h-full overflow-y-auto flex flex-col custom-scrollbar pb-7 bg-[#F5F5F5]">
			{editAgentModal && (
				<div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
					<div
						ref={editAgentModalRef}
						aria-label="edit agent Modal"
						className="w-[50%] h-[90%] rounded-[24px] flex flex-col p-8 bg-white"
					>
						<h2 className="text-2xl font-bold">Edit</h2>
						<div className="w-full flex flex-col flex-1 gap-y-3.5 mt-2 overflow-y-auto custom-scrollbar-low-opacity">
							<div className="flex flex-col gap-y-2 text-sm">
								<label className="">Full Name:</label>
								<input
									type="text"
									className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
									placeholder="Type"
								/>
							</div>
							<div className="flex flex-col gap-y-2 text-sm">
								<label className="">Email:</label>
								<input
									type="email"
									className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
									placeholder="Type"
								/>
							</div>
							<div className="flex flex-col gap-y-2 text-sm">
								<label className="">Passowrd:</label>
								<input
									type="password"
									className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
									placeholder="Type"
								/>
							</div>
							<div className="flex flex-col gap-y-2 text-sm">
								<label className="">Confirm Password:</label>
								<input
									type="password"
									className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
									placeholder="Type"
								/>
							</div>
							<div className="flex flex-col gap-y-2 text-sm">
								<label className="">Phone Number:</label>
								<input
									type="text"
									className="w-full p-3 rounded-lg border border-primaryBorder outline-none"
									placeholder="Type"
								/>
							</div>
							<div className="flex flex-col">
								<h6 className="text-sm">Identification Upload:</h6>
								<div className="w-full grid grid-cols-2 gap-x-4 mt-2">
									<div className="w-full flex flex-col gap-y-2">
										<p className="text-sm text-[#A3A3B3]">
											Upload Front
										</p>
										<button className="w-full py-3.5 flex justify-center items-center gap-x-3 rounded-lg bg-[#F4F1F3] border border-primaryBorder border-dashed">
											<IoCloudUploadOutline
												size={24}
												color="#e65800"
											/>
											<span className="text-sm">Upload File</span>
										</button>
									</div>
									<div className="w-full flex flex-col gap-y-2">
										<p className="text-sm text-[#A3A3B3]">
											Upload Back
										</p>
										<button className="w-full py-3.5 flex justify-center items-center gap-x-3 rounded-lg bg-[#F4F1F3] border border-primaryBorder border-dashed">
											<IoCloudUploadOutline
												size={24}
												color="#e65800"
											/>
											<span className="text-sm">Upload File</span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
							<button
								onClick={closeEditAgentModal}
								className="rounded-lg hover:underline"
							>
								Cancel
							</button>
							<button className="px-5 py-3 rounded-lg text-white bg-defaultOrange">
								Done
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="w-full py-5 px-5 md:px-10 border-b bg-white border-b-primaryBorder">
				<DashboardSearchBar />
			</div>

			<div className="px-5 md:px-10 w-full mt-4 flex flex-col flex-1">
				<Link
					to="/admin/agents"
					className="flex gap-x-3 items-center text-sm hover:underline w-fit"
				>
					<FaArrowLeftLong />
					<span className="">Back to Field Agents</span>
				</Link>

				<div className="w-full flex justify-between items-start mt-5">
					<div className="flex gap-x-4 items-center">
						<img
							src={agent?.agent_profile.profile_pic_url || Profile}
							alt="Profile"
							className="size-[40px] md:size-[70px] rounded-full object-fill"
						/>
						<div className="flex flex-col gap-y-2">
							<h1 className="md:text-2xl font-bold flex items-center gap-x-2">
								{agent?.name}
								<VscVerifiedFilled size={18} color="#4f46e5" />
							</h1>
							{/* <p className="text-sm flex items-center gap-x-2">
                Last login:
                <span className="font-medium flex items-center gap-x-1">
                  Jul 01, 2024
                  <FaCircle size={5} />
                  12:30pm
                </span>
              </p> */}
							<div className="flex gap-x-2">
								<span className="px-2 py-0.5 text-sm rounded-[100px] text-white bg-black">
									Agent
								</span>
								<span className="px-2 py-0.5 text-sm rounded-[100px] bg-[#E8F7E8] text-[#008000]">
									Active
								</span>
							</div>
						</div>
					</div>
					{/* profile */}
					{/* <button
            onClick={openEditAgentModal}
            className="flex items-center gap-x-1 md:gap-x-3 rounded-lg px-2 py-1.5 md:px-5 md:py-2.5 text-sm border border-[#B5ABB3] text-[#5C4D58]"
          >
            <PiPencilSimpleBold size={isMobile ? 15 : 18} />
            Edit
          </button> */}
				</div>

				<div className="w-full md:h-[7rem] grid grid-col-1 md:grid-cols-3 gap-y-5 gap-x-10 mt-8">
					<div className="w-full h-full bg-[#1137D033] p-5 pl-7 space-y-3  text-sm rounded-2xl border border-primaryBorder">
						<div className="flex items-center gap-x-3">
							<div className="text-white p-2 rounded-full bg-[#1137D0]">
								<TbUserScan size={24} />
							</div>

							<span className="text-2xl font-bold">
								{agent?.statistics.inspection_requests.total}
							</span>
						</div>
						<p className="font-medium  text-[#425166]">
							Total Inspection
						</p>
					</div>

					<div className="w-full h-full bg-[#D7B81333]  p-5 pl-7 space-y-3  text-sm rounded-2xl border border-primaryBorder">
						<div className="flex items-center gap-x-3">
							<div className="text-white p-2 rounded-full bg-[#D7B813]">
								<CiTimer size={24} />
							</div>

							<span className="text-2xl font-bold">
								{agent?.statistics.inspection_requests.assigned}
							</span>
						</div>
						<p className="font-medium  text-[#425166]">
							Pending Inspection
						</p>
					</div>

					<div className="w-full h-full bg-[#FF000033] p-5 pl-7 space-y-3  text-sm rounded-2xl border border-primaryBorder">
						<div className="flex items-center gap-x-3">
							<div className="text-white p-2 rounded-full bg-[#FF0000]">
								<MdCancel size={24} />
							</div>

							<span className="text-2xl font-bold">
								{agent?.statistics.inspection_requests.failed}
							</span>
						</div>
						<p className="font-medium  text-[#425166]">
							Declined Inspection
						</p>
					</div>
				</div>

				<div className="w-full flex flex-col md:flex-row gap-4 items-start mt-10">
					<div className="w-full md:w-[60%] flex flex-col rounded-2xl bg-white border border-primaryBorder">
						<h4 className="py-3 px-6 rounded-t-lg font-semibold bg-[#F4F1F3] brder-b border-b-primaryBorder">
							Basic Information
						</h4>
						<div className="px-6 pb-4 flex flex-col text-sm">
							<div className="flex justify-between items-center gap-x-2 py-3 border-b border-b-primaryBorder">
								<span className="font-medium">Agent ID:</span>
								<span className="">{agent?.id}</span>
							</div>
							<div className="flex justify-between items-center gap-x-2 py-3 border-b border-b-primaryBorder">
								<span className="font-medium">Name:</span>
								<span className="">{agent?.name}</span>
							</div>
							<div className="flex justify-between items-center gap-x-2 py-3 border-b border-b-primaryBorder">
								<span className="font-medium">Email:</span>
								<span className="">{agent?.email}</span>
							</div>
							<div className="flex justify-between items-center gap-x-2 py-3">
								<span className="font-medium">Phone:</span>
								<span className="">{agent?.agent_profile.phone}</span>
							</div>
							{/* <div className="flex flex-col gap-y-3 p-3 rounded-lg text-sm border border-primaryBorder bg-black/[2%]">
								<p className="font-semibold">Notes</p>
								<p className="">
									"Rosemary has been an exemplary field agent,
									consistently delivering thorough and accurate
									verifications. His attention to detail and prompt
									communication with both sellers and the admin team
									has significantly improved the quality of our
									listings. Keep up the excellent work, Rosemary."
								</p>
							</div> */}
						</div>
					</div>

					{/* <div className=" w-full md:w-[40%] flex flex-col rounded-2xl bg-white border border-primaryBorder">
            <h4 className="py-3 px-4 rounded-t-lg font-semibold bg-[#F4F1F3] brder-b border-b-primaryBorder">
              Documents uploads
            </h4>
            <div className="px-6 flex flex-col text-sm">
              <div className="flex flex-col py-4 gap-y-2 text-sm border-b border-b-primaryBorder">
                <p className="text-[#5C4D58]">Means of identification</p>
                <div className="flex gap-x-2 items-center">
                  <div className="flex gap-x-2 items-center w-full">

                    <img src={PDF} alt="PDF" className="w-5 h-7 object-cover" />
                    <div className="flex flex-col">
                      <p className="">Natinoal ID card Front.pdf</p>
                      <p className="text-xs">120 KB</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:underline">View</button>
                </div>
                <div className="flex gap-x-2 items-center">
                  <div className="flex gap-x-2 items-center w-full">
                    <img src={PDF} alt="PDF" className="w-5 h-7 object-cover" />
                    <div className="flex flex-col">
                      <p className="">Natinoal ID card Front.pdf</p>
                      <p className="text-xs">120 KB</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:underline">View</button>
                </div>
              </div>
              <div className="flex flex-col py-4 gap-y-2 text-sm">
                <p className="text-[#5C4D58]">Driver's License</p>
                <div className="flex gap-x-2 items-center">
                  <div className="flex gap-x-2 items-center w-full">
                    <img src={PDF} alt="PDF" className="w-5 h-7 object-cover" />
                    <div className="flex flex-col">
                      <p className="">Natinoal ID card Front.pdf</p>
                      <p className="text-xs">120 KB</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:underline">View</button>
                </div>
                <div className="flex gap-x-2 items-center">
                  <div className="flex gap-x-2 items-center w-full">
                    <img src={PDF} alt="PDF" className="w-5 h-7 object-cover" />
                    <div className="flex flex-col">
                      <p className="">Natinoal ID card Front.pdf</p>
                      <p className="text-xs">120 KB</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:underline">View</button>
                </div>
              </div>
            </div>
          </div> */}
				</div>

				{/* <div className="w-full mt-10">
          <h5 className="font-bold">Inpection History</h5>
          <div className="w-full h-[70vh] flex mt-4">
            <MuiTableComponent
              showCheckbox={true}
              columns={columns}
              rows={rows()}
              rowHeight={80}
              pageSize={10}
            />
          </div>
        </div> */}
			</div>
		</div>
  );
}
