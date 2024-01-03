import UsdChart from "@/components/UsdChart"
import Balance from "@/components/balance/Balance"
import TradeCounter from "@/components/tradeCounter/TradeCounter";
import { contextData } from "@/context/AuthContext"
import { useEffect, useState } from "react";

export default function Trades() {
  const [transactions, setTransactions] = useState<any>(null);
  const [tradeData, setTradeData] = useState<any>(null);
  const { user } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUserTransactions = async () => {
    console.log("start fetching");
    try {
      const res = await fetch(`${url}/transactions/user/${user.email}`);
      const data = await res.json();
      console.log(data);

      if (res.ok) setTransactions(data);
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, []);

  useEffect(() => {
    if (transactions) {
      const tradeTransactions = transactions.filter((transaction:any) => transaction.type === 'trade');

      setTradeData(tradeTransactions.length > 0 ? tradeTransactions : null);
    }
  }, [transactions]);

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

      {tradeData ? (
        <TradeCounter trades={tradeData} />
      ) : (
        <p>No trade data yet.</p>
      )}
    </>
  );
}
