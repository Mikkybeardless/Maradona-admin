import { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
// import { data } from '../../../pages/seller/Reports2';

interface PieEnterEvent {
  name?: string;
  value?: number;
  color?: string;
  percent?: number;
  payload?: any;
  // Add other properties if needed from recharts Pie event
}

const SalesByLocation = () => {
  const [radius, setRadius] = useState(90);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: PieEnterEvent, index: number) => {
    setActiveIndex(index);
    setRadius(100);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setRadius(90);
  };
  return (
    <div className="bg-white py-5 px-5 mt-6 rounded-2xl w-full flex-[2]">
      <p className="font-bold text-base mb-8">Major Sales by Location</p>{" "}
      <div
        style={{
          position: "relative",
          width: 200,
          height: 200,
        }}
      >
        {/* Center Circle with Text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 80,
            height: 80,
            background: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          30 DAYS
        </div>

        {/* Pie Chart */}
        {/* <PieChart width={200} height={200}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={radius}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        onMouseEnter={onPieEnter}
                                        onMouseLeave={onPieLeave}
                                        animationDuration={300} // Smooth transition
                                        cornerRadius={10} // Rounded edges
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart> */}
        {/* Legend */}
        {/* <div className="absolute right-[-50%] top-1/2 transform -translate-y-1/2 text-sm">
                                    {data.map((entry, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 mb-2"
                                        >
                                            <span
                                                className="inline-block w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: entry.color }}
                                            ></span>
                                            <span className="font-medium">
                                                {entry.name}
                                            </span>
                                            <span className="font-bold">
                                                {entry.value}%
                                            </span>
                                        </div>
                                    ))}
                                </div> */}
      </div>
    </div>
  );
};

export default SalesByLocation;
