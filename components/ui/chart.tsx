import type React from "react"

interface ChartProps {
  children: React.ReactNode
  className?: string
}

export const ChartContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`w-full overflow-auto ${className}`}>{children}</div>
}

export const Chart = ({ children, className }: ChartProps) => {
  return (
    <svg className={`w-full h-full ${className}`} viewBox="0 0 600 400">
      {children}
    </svg>
  )
}

export const ChartGrid = () => {
  return (
    <g className="pointer-events-none">
      <line x1="0" y1="100" x2="600" y2="100" stroke="#e2e8f0" strokeDasharray="4" />
      <line x1="0" y1="200" x2="600" y2="200" stroke="#e2e8f0" strokeDasharray="4" />
      <line x1="0" y1="300" x2="600" y2="300" stroke="#e2e8f0" strokeDasharray="4" />
    </g>
  )
}

export const ChartLine = ({
  data,
  dataKey,
  stroke,
  strokeWidth,
}: { data: any[]; dataKey: string; stroke: string; strokeWidth: number }) => {
  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 600
      const y = 400 - (item[dataKey] / Math.max(...data.map((item) => item[dataKey]))) * 300
      return `${x},${y}`
    })
    .join(" ")

  return <polyline points={points} stroke={stroke} strokeWidth={strokeWidth} fill="none" />
}

export const ChartArea = ({
  data,
  dataKey,
  fill,
  fillOpacity,
}: { data: any[]; dataKey: string; fill: string; fillOpacity: number }) => {
  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 600
      const y = 400 - (item[dataKey] / Math.max(...data.map((item) => item[dataKey]))) * 300
      return `${x},${y}`
    })
    .join(" ")

  return <polygon points={`0,400 ${points} 600,400 0,400`} fill={fill} fillOpacity={fillOpacity} />
}

export const ChartXAxis = ({ dataKey }: { dataKey: string }) => {
  return (
    <g>
      <text x="50" y="390" textAnchor="middle" fontSize="12" fill="#64748b">
        {dataKey}
      </text>
    </g>
  )
}

export const ChartYAxis = () => {
  return (
    <g>
      <text x="20" y="50" textAnchor="end" fontSize="12" fill="#64748b">
        Value
      </text>
    </g>
  )
}

export const ChartBar = ({
  data,
  dataKey,
  fill,
  radius,
}: { data: any[]; dataKey: string; fill: string; radius: number[] }) => {
  const maxValue = Math.max(...data.map((item) => item[dataKey]))

  return (
    <>
      {data.map((item, index) => {
        const x = (index / data.length) * 600 + 600 / data.length / 4
        const y = 400 - (item[dataKey] / maxValue) * 300
        const width = 600 / data.length / 2
        const height = (item[dataKey] / maxValue) * 300

        return <rect key={index} x={x} y={y} width={width} height={height} fill={fill} rx={radius[0]} ry={radius[1]} />
      })}
    </>
  )
}

export const ChartTooltip = () => {
  return <g></g>
}

