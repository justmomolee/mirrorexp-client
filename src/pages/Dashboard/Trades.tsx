import DisplayActiveTrade from "@/components/DisplayActiveTrade";
import UsdChart from "@/components/UsdChart"
import Balance from "@/components/balance/Balance"
import { contextData } from "@/context/AuthContext"
import { useEffect, useState } from "react";

export default function Trades() {
  const [tradeData, setTradeData] = useState<any>([]);
  const { user } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchTrades = async () => {
    try {
      const res = await fetch(`${url}/trades`);
      const data = await res.json();

      if (res.ok) setTradeData(data);
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrades();
    if(tradeData.length > 0) console.log(new Date(user.createdAt) > new Date(tradeData[0]?.date))
  }, [tradeData.length]);


  return (
    <>
      <div className="w-full flex gap-5 my-4 max-[900px]:flex-col">
        <div className="flex-none">
          <Balance type="trade" user={user}/>
        </div>
        <div className="flex-auto shadow-1">
          <UsdChart />
        </div>
      </div>

      {tradeData && new Date(user.createdAt) > new Date(tradeData[0]?.date) ? (
        <DisplayActiveTrade trades={tradeData} />
      ) : (
        <p>No trade data yet.</p>
      )}
    </>
  );
}
