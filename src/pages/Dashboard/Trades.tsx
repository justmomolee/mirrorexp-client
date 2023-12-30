import UsdChart from "@/components/UsdChart"
import Balance from "@/components/balance/Balance"
import TradeCounter from "@/components/tradeCounter/TradeCounter";
import { contextData } from "@/context/AuthContext"
import { useEffect, useState } from "react";

const demoTrades = [
  {
    _id: "1",
    amount: 50.444,
    date: Date.now(),
    status: "pending",
  },
  {
    _id: "2",
    amount: 50.444,
    date: Date.now(),
    status: "success",
  },
  {
    _id: "3",
    amount: 50.444,
    date: Date.now(),
    status: "pending",
  },
]

export default function Trades() {
  const [transactions, setTransactions] = useState(null);
  const { user } = contextData()
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUserTransactions = async () => {
    try {
      const res = await fetch(`${url}/transactions/user/${user.email}`)
      const data = await res.json()

      if(res.ok) setTransactions(data) 
      else throw new Error(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserTransactions()
  }, [])

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

      {!transactions &&
      <TradeCounter trades={demoTrades}/>
      }
    </>
  )
}
