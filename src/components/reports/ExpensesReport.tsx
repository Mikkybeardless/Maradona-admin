import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExpensesReport = () => {
  const navigate = useNavigate();
  const handleToExpensesReport = () => {
    navigate("/admin/reports/expenses-report");
  };
  return (
    <div>
      {[
        {
          title: "Expenses",
          bg: "#FD6100",
          handler: handleToExpensesReport,
          color: "#FD6100",
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

          <div className="grid grid-cols-2 gap-4 px-5 md:px-7 mt-5 ">
            <div>
              <p className={`text-sm font-bold text-[${section.color}] mb-3`}>
                Expense Type
              </p>
              {["Cars", "Houses", "Lands"].map((item, i) => (
                <p key={i} className="text-sm font-normal text-[#040421] mb-3">
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p className={`text-sm font-bold text-[${section.color}] mb-3`}>
                Amount
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

export default ExpensesReport;
