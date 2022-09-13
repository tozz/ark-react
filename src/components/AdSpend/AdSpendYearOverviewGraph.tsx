import { useEffect, useState } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar'
import { AdEvents } from './types';

interface AdSpendYearOverviewGraphProps {
  events: AdEvents;
}

type CalendarEntry = { value: number, day: string };

interface AdSpends {
  dates: { start: string, end: string };
  calendar: CalendarEntry[];
  events: AdEvents;
}

export const AdSpendYearOverviewGraph = ({ events }: AdSpendYearOverviewGraphProps) => {
  const [chartData, setChartData] = useState<AdSpends>();

  useEffect(() => {
    const calendarData: CalendarEntry[] = [];
    const keys = Object.keys(events);

    // This is an necessary iteration in the long run, but since data is shared across two graphs I did it like
    // this to keep time spent a bit lower
    keys.forEach((k) => {
      calendarData.push({ value: Math.round(events[k].channels.adwords + events[k].channels.facebook), day: k })
    });

    setChartData({
      events,
      calendar: calendarData,
      dates: { start: keys[0], end: keys[keys.length - 1] }
    });
  }, [events])

  return <>
    {chartData && (
      <ResponsiveCalendar
        data={chartData.calendar}
        from={chartData.dates.start}
        to={chartData.dates.end}
        emptyColor="#eeeeee"
        // This is just a magic number for the sake of the demo
        maxValue={25000}
        monthSpacing={10}
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left'
          }
        ]}
      />
    )}
  </>
}
