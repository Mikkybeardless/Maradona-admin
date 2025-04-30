import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

type LineProps = {
  color: string;
  type?: CurveType;
  name: string;
  dotShow: boolean;
  dotSize: number;
  lineWidth: number;
};

interface ComponentProps {
  chartData: any[];
  lines: LineProps[];
  legend?: boolean;
  tickCount?: number;
  gridShow?: boolean;
  paddingX?: { left: number; right: number };
  tooltipBgColor?: string; // Add dynamic background color for Tooltip
  tooltipTextColor?: string; // Add dynamic text color for Toolt
}

export default function LineChartComponent({
  chartData,
  lines,
  legend,
  tickCount,
  gridShow,
  paddingX,
  tooltipBgColor = "#fff", // Default background color
  tooltipTextColor = "#333", // Default text colo
}: ComponentProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        {typeof gridShow === "undefined" ? (
          <CartesianGrid vertical={false} strokeDasharray="1 1" />
        ) : gridShow ? (
          <CartesianGrid vertical={false} strokeDasharray="1 1" />
        ) : null}
        <XAxis
          className="text-xs"
          dataKey="xAxis"
          padding={paddingX ? paddingX : {}}
        />
        <YAxis
          name={"Time"}
          tickSize={2}
          tickCount={tickCount || 5}
          className="text-xs"
        />
        <Tooltip
          wrapperClassName="text-xs"
          contentStyle={{
            backgroundColor: tooltipBgColor, // Use dynamic bg color prop
            color: tooltipTextColor, // Use dynamic text color prop
            borderRadius: "5px", // Optional: Rounded corners
            padding: "10px", // Optional: Adds padding
          }}
          itemStyle={{
            color: tooltipTextColor, // Use dynamic text color prop for items
          }}
        />
        {typeof legend !== "undefined" ? (
          legend ? (
            <Legend />
          ) : null
        ) : (
          <Legend />
        )}
        {lines.map((line, index) => (
          <Line
            key={index}
            type={line.type}
            dataKey={line.name}
            stroke={line.color}
            strokeWidth={line.lineWidth}
            activeDot={{ r: line.dotSize }}
            dot={line.dotShow}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
