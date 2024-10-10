import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

type LineAreaChartProps = {
    width: string
    data: any[]
}

export default function LineAreaChart({ width, data }: LineAreaChartProps) {
    return (
        <ResponsiveContainer width={width} height="100%">
            <AreaChart
                data={data}
                margin={{
                    top: 0,
                    bottom: 0,
                }}
                className="order-area-chart"
            >
                <Tooltip wrapperClassName="overflow-hidden text-xs rounded-lg font-medium" />
                <XAxis hide dataKey="name" />
                <Area
                    type="bump"
                    dataKey="earnings"
                    stroke="#008000"
                    strokeWidth={2}
                    fill="rgba(0, 128, 0, 0.12)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}
