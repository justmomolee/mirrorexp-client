import Balance from "@/components/balance/Balance";
import BigChart from "@/components/BigChart";
import ChartOne from "@/components/ChartOne";
import ChartSlide from "@/components/ChartSlide";
import ChartThree from "@/components/ChartThree";
import MiniBals from "@/components/MiniBals";
import UsdChart from "@/components/UsdChart";
import { contextData } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = contextData()


  return (
    <>
      <div className="w-full flex gap-5 my-4 max-[900px]:flex-col">
        <div className="flex-none">
          <Balance type="balance" user={user}/>
        </div>
        <div className="flex-auto shadow-1">
          <UsdChart />
        </div>
      </div>

      <div className="flex items-center justify-center mb-4 rounded-[15px] p-1 shadow-1 bg-gray-50 dark:bg-gray-800">
        <ChartSlide />
      </div>

      <div className="w-full flex gap-5 my-4 max-[1100px]:flex-col mb-4">
        <div className="flex-auto">
          <ChartOne />
        </div>
        <div className="flex-none">
          <ChartThree />
        </div>
      </div>

      <MiniBals />

      <div className="h-100 flex items-center justify-center mb-4 rounded-[15px] p-1 shadow-1 bg-gray-50 dark:bg-gray-800">
        <BigChart />
      </div>
  </>
  )
}