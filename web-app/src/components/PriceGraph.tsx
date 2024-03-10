import { ResponsiveLine } from "@nivo/line";

const currentDate = new Date();
const minPrice = 0;

const MyResponsiveLine = ({ price }) => {
  const basePrice = parseFloat(price);
  const fluctuationRange = 0.2;

  const maxPrice = basePrice + fluctuationRange * basePrice;

  const data = [
    {
      id: "japan",
      color: "hsl(194, 70%, 50%)",
      data: Array.from({ length: 15 }, (_, index) => {
        const daysAgo = 14 - index;
        const price =
          basePrice +
          Math.floor(Math.random() * (fluctuationRange * basePrice + 1)) -
          fluctuationRange;
        return { x: formatDate(subtractDays(currentDate, daysAgo)), y: price };
      }),
    },
  ];

  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  function subtractDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  return (
    <div className="h-[500px] w-[100%] flex flex-col items-center justify-center pt-20 sm:pt-10">
      <div className="text-sm font-medium">Price History</div>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 30, bottom: 50, left: 70 }}
        xScale={{ type: "time", format: "%Y-%m-%d", useUTC: false }}
        yScale={{
          type: "linear",
          min: minPrice,
          max: maxPrice,
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%b %d", // Customize the date format
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Price (Rupees)",
          legendOffset: -60,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          // ...
        ]}
      />
      <div className="text-md sm:text-lg mt-5">
        <span className="text-green-500">Min Price: Rs. 0</span>
        <span className="mx-2">|</span>
        <span className="text-red-500">{`Max Price: Rs. ${maxPrice}`}</span>
      </div>
    </div>
  );
};

// Usage
export default MyResponsiveLine;
