import { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';

export interface PurchaseData {
  order_datetime: string;
  order_id: number;
  purchased_product_id: number;
  quantity_of_sku_in_order: number;
  category_id: number;
  category_alias: string;
  brand_id: number;
  price_usd: number;
  user_id: number;
  product_gender: 'f' | 'm';
  kw1: string;
  kw2: string;
  kw3: string;
}

interface PurchaseDataGraphProps {
  data: PurchaseData[];
}

interface MonthData {
  id: string;
  label: string;
  value: number;
}

// Making this a static "cache" because toLocaleDateString and the newer Intl. API seems to be extremely slow
// Likely causes massive amount of GC to trigger too, didn't dig too deep into the profile
const format = new Intl.DateTimeFormat('en-US', { month: 'long' })
const months: { [month: number]: string } = {};
for (let i = 0, j = 11; i <= j; i++) {
  months[i] = format.format(new Date(Date.UTC(2000, i, 1, 0, 0, 0)))
}

export const PurchaseDataGraph = ({ data }: PurchaseDataGraphProps) => {
  const [monthData, setMonthData] = useState<MonthData[]>();

  useEffect(() => {
    const newMonthData: MonthData[] = [];
    const processedData: { [month: string]: number } = {};

    let previousOrderId: number;
    data.forEach((entry) => {
      const date = new Date(entry.order_datetime);
      const key = months[date.getMonth()];

      if (entry.order_id !== previousOrderId) {
        previousOrderId = entry.order_id;


        if (!processedData[key]) {
          processedData[key] = 0;
        }

        processedData[key] += 1;
      }
    })

    const keys = Object.keys(processedData);
    keys.forEach((month) => {
      newMonthData.push({
        id: month,
        label: month,
        value: processedData[month],
      })
    })

    setMonthData(newMonthData);
  }, [data])

  return (
    <>
      {monthData && (
        <ResponsivePie
          data={monthData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.2
              ]
            ]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                2
              ]
            ]
          }}
        />
      )}
    </>
  )
}
