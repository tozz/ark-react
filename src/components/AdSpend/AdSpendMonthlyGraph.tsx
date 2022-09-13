import { useEffect, useState } from 'react';
import { AdEvents } from './types';
import { BarDatum, ResponsiveBar } from '@nivo/bar';

export interface AdSpendMonthlyGraphProps {
  events: AdEvents;
}
export const AdSpendMonthlyGraph = ({ events }: AdSpendMonthlyGraphProps) => {
  const [chartData, setChartData] = useState<BarDatum[]>();

  useEffect(() => {
    let currentMonth: string;
    let currentIndex = -1;
    const newData: BarDatum[] = [];

    const keys = Object.keys(events);

    keys.forEach((date) => {
      const parsed = date.split('-')
      if (currentMonth !== parsed[1]) {
        currentMonth = parsed[1];
        currentIndex += 1;
        newData[currentIndex] = {
          month: `${parsed[0]}-${parsed[1]}`,
          facebook: 0,
          adwords: 0,
        }
      }

      // All this casting is quite disconcerting but I didn't have time to investigate the chart library types more :/
      (newData[currentIndex].facebook as number) += events[date].channels['facebook'];
      (newData[currentIndex].adwords as number) += events[date].channels['adwords'];
    })
    setChartData(newData.map((entry) => ({...entry, facebook: Math.round(entry.facebook as number), adwords: Math.round(entry.adwords as number)})));
  }, [events])

  return <>
    {chartData && (
      <ResponsiveBar
        data={chartData}
        keys={[
          'facebook',
          'adwords',
        ]}
        indexBy="month"
        layout="horizontal"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'accent' }}
        defs={[
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'total amount',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        role="application"
      />
    )}
  </>
}
