import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RevenueTracking = () => {
  const navigate = useNavigate();
  const handleToRevenuReport = () => {
    navigate("/admin/reports/revenue-report");
  };
  return (
    <div className="">
      {[
        {
          title: "Revenue Tracking",
          bg: "#1137D0",
          handler: handleToRevenuReport,
          color: "#14199C",
        },
      ].map((section, index) => (
        <div key={index} className="bg-white mt-6 rounded-2xl w-full pb-16">
          <div
            className={`bg-[${section.bg}] flex justify-between py-4 px-5 md:px-7 rounded-t-2xl items-center`}
          >
            <p className="font-bold text-base text-white">{section.title}</p>
            <div>
              <Button
                variant="outlined"
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "white",
                  borderColor: "white",
                  padding: "5px 8px",
                  marginRight: "10px",
                  textTransform: "capitalize",
                }}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "white",
                  borderColor: "white",
                  padding: "5px 8px",
                  textTransform: "capitalize",
                }}
                onClick={section.handler}
              >
                View More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 px-5 md:px-7 mt-5">
            <div>
              <p className={`text-sm font-bold text-[${section.color}] mb-3`}>
                Category
              </p>
              {["Cars", "Houses", "Lands"].map((item, i) => (
                <p key={i} className="text-sm font-normal text-[#040421] mb-3">
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p className={`text-sm font-bold text-[${section.color}] mb-3`}>
                Revenue
              </p>
              {["₦320,000,000", "₦30,000,000", "₦8,000,000"].map((item, i) => (
                <p key={i} className="text-sm font-normal text-[#585858] mb-3">
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p className={`text-sm font-bold text-[${section.color}] mb-3`}>
                Percentage
              </p>
              {["62.9%", "25.7%", "11.4%"].map((item, i) => (
                <p key={i} className="text-sm font-normal text-[#040421] mb-3">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueTracking;
