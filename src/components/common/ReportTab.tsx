import { Button } from "@mui/material";
import { FaRegSquare, FaSquare } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export const ReportTab = () => {
  const { pathname } = useLocation();
  const NavLinks = [
    {
      name: "Sale Report",

      href: "sale-report",
    },
    {
      name: "Revenue",

      href: "revenue-report",
    },
    {
      name: "Admin Revenue",

      href: "admin-revenue-report",
    },
    {
      name: "Financial Tracking",

      href: "financial-tracking",
    },
  ];

  const isActiveClass = (href: string) => {
    const fullPath = `/admin/reports/${href}`;
    return pathname.startsWith(fullPath);
  };

  return (
    <section
      id="report-tab"
      className="flex flex-wrap justify-between gap-4 sm:gap-7"
    >
      <div className="flex flex-wrap justify-between items-center gap-4 sm:gap-7">
        {NavLinks.map((link) => (
          <Link
            key={link.name}
            to={`/admin/reports/${link.href}`}
            className={`flex items-center gap-2  text-sm sm:text-[16px] text-[#585858] font-normal ${isActiveClass(
              link.href
            )}`}
          >
            {link.name}
            {isActiveClass(link.href) ? (
              <FaSquare size={10} />
            ) : (
              <FaRegSquare />
            )}
          </Link>
        ))}
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button
          sx={{
            padding: "5px 8px",
            background: "#ffffff",
            border: "1px solid #5C4D58",
            fontWeight: 400,
            fontSize: "16px",
            color: "#5C4D58",
            textTransform: "capitalize",
          }}
        >
          Print
        </Button>
        <select className="p-2 text-sm sm:text-[16px] rounded-lg border border-primaryBorder bg-white outline-none text-[#5C4D58]">
          <option value="month">Month</option>
        </select>
        <select className="p-2 text-sm sm:text-[16px] rounded-lg border border-primaryBorder bg-white outline-none text-[#5C4D58]">
          <option value="year">Year</option>
        </select>
      </div>
    </section>
  );
};
