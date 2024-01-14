import React, { useState } from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import "./Chart.css";

const labelKey = {
  book_risk: "Handle per Wager",
  accepted_datetime_utc: "Date of Wager",
};

const Chart = ({ data, filterSelection, average }) => {
  const { xAxis, yAxis } = filterSelection;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  return (
    <>
      <ResponsiveContainer
        width="100%"
        height={500}
        onResize={() => {
          if (isMobile && window.innerWidth > 480) {
            setIsMobile(false);
          } else if (!isMobile && window.innerWidth <= 480) {
            setIsMobile(true);
          }
        }}
      >
        <LineChart
          data={data}
          margin={{
            top: 50,
            right: isMobile ? 20 : 100,
            left: isMobile ? 20 : 50,
            bottom: isMobile ? 20 : 50,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            height={40}
            dataKey={xAxis}
            offset={-10}
            tickFormatter={() => ""}
            interval={5}
            fontSize={"12px"}
            stroke="black"
            label={{
              value: labelKey[xAxis],
              position: "insideBottom",
              fill: "black",
            }}
          />
          <YAxis
            dataKey={yAxis}
            fontSize={"12px"}
            axisLine={false}
            tickLine={false}
            stroke="#black"
            domain={["auto", "auto"]}
            label={{
              value: labelKey[yAxis],
              angle: -90,
              position: "insideLeft",
              fill: "black",
            }}
            offset={-9}
          />
          <Tooltip
            labelFormatter={(value) => moment(value).format("MMM Do, h:mm a")}
            formatter={(value) => [value.toFixed(1), labelKey[yAxis]]}
          />
          {!isMobile && (
            <ReferenceLine
              y={average}
              label={{
                fontSize: "14px",
                position: "right",
                fill: "black",
                value: `Avg: ${Math.round(average)}`,
              }}
              stroke="red"
              strokeDasharray="4 4"
            />
          )}

          <Line
            type="monotone"
            dataKey={yAxis}
            stroke="#8884d8"
            dot={false}
            activeDot={{ stroke: "white", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
