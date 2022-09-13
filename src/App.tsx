import type { ReactElement } from 'react';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import axios, { AxiosResponse } from 'axios'
import { styled } from '@stitches/react';
import './App.css';
import { AdSpendData, AdSpendMonthlyGraph, AdSpendYearOverviewGraph, generateAdSpendList } from './components/AdSpend';
import { PurchaseData, PurchaseDataGraph } from './components/Purchases/PurchaseDataGraph';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';
import { Loader } from './components/AdSpend/Loader';

const AppContainer = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 2rem',
  background: 'linear-gradient(330deg, #0e276f 0%, #f352ea 100%)',
})

const GraphContainer = styled('div', {
  minHeight: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})

const Header = styled('h1', {
  color: '#fff',
  textShadow: '1px 1px 0 #000',
  textAlign: 'right',
  maxWidth: '1024px',
  width: '100%',
})

function App(): ReactElement {
  const { data: adSpend } = useSWR<AxiosResponse<AdSpendData[]>>('http://localhost:5001/ads-spend-data', (url) => axios.get(url));
  const { data: purchaseData } = useSWR<AxiosResponse<PurchaseData[]>>('http://localhost:5001/purchase-data', (url) => axios.get(url));

  return (
    <AppContainer className="App">
      <Header>Ad Spend</Header>
      <Tabs defaultValue="chart1">
        <TabsList>
          <TabsTrigger value="chart1">Yearly Total Overview</TabsTrigger>
          <TabsTrigger value="chart2">Monthly Spend</TabsTrigger>
        </TabsList>
        <TabsContent value="chart1">
          <GraphContainer>
            {!adSpend && <Loader />}
            {adSpend && adSpend.status === 200 && (
              <AdSpendYearOverviewGraph events={generateAdSpendList(adSpend.data)} />
            )}
          </GraphContainer>
        </TabsContent>
        <TabsContent value="chart2">
          <GraphContainer>
            {!adSpend && <Loader />}
            {adSpend && adSpend.status === 200 && (
              <AdSpendMonthlyGraph events={generateAdSpendList(adSpend.data)} />
            )}
          </GraphContainer>
        </TabsContent>
      </Tabs>

      <Header>Purchases</Header>
      <Tabs defaultValue="chart1">
        <TabsList>
          <TabsTrigger value="chart1">Monthly Total Orders over all years</TabsTrigger>
        </TabsList>
        <TabsContent value="chart1">
          <GraphContainer>
            {!purchaseData && (
              <>
                <GridLoader loading color="rgb(255, 128, 56)" />
                <p>Loading Purchase Data</p>
              </>
            )}
            {purchaseData && purchaseData.status === 200 && (
              <PurchaseDataGraph data={purchaseData.data} />
            )}
          </GraphContainer>
        </TabsContent>
      </Tabs>

    </AppContainer>
  );
}

export default App;
