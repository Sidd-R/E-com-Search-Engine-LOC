import { ResponsiveLine } from '@nivo/line';

const currentDate = new Date();
const basePrice = 20000;
const fluctuationRange = 1000;
const minPrice = basePrice - basePrice * 0.1;

const data = [
    {
        "id": "japan",
        "color": "hsl(194, 70%, 50%)",
        "data": Array.from({ length: 15 }, (_, index) => {
            const daysAgo = 14 - index;
            const price = basePrice + Math.floor(Math.random() * (fluctuationRange * 2 + 1)) - fluctuationRange;
            return { "x": formatDate(subtractDays(currentDate, daysAgo)), "y": price };
        })
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

const MyResponsiveLine = () => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 30, bottom: 50, left: 70 }}
        xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false }}
        yScale={{
            type: 'linear',
            min: minPrice,
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: '%b %d',  // Customize the date format
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Price (Rupees)',
            legendOffset: -60,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            // ...
        ]}
    />
);

// Usage
export default MyResponsiveLine;
