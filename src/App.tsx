import './styles/global.css';
import './libs/dayjs';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Header } from "./components/Header"
import { SummaryTable } from "./components/SummaryTablet"

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <Header />

          <SummaryTable />
        </div>
      </div>
    </QueryClientProvider>
  )
}