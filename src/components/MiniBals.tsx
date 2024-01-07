import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function MiniBals() {
  const [transactions, setTransactions] = useState<any>(null);
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalDeposit, setTotalDeposit] = useState(0)
  const [totalWithdrawal, setTotalWithdrawal] = useState(0)
  const { user } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUserTransactions = async () => {
    try {
      const res = await fetch(`${url}/transactions/user/${user.email}`);
      const data = await res.json();

      if (res.ok) setTransactions(data);
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
    
    if (transactions) {
      // Filter transactions with status "success"
      const successTransactions = transactions.filter(
        (transaction: any) => transaction.status === "success"
      );

      // Calculate sums based on transaction type
      const interestSum = successTransactions
        .filter((transaction: any) => transaction.type === "interest")
        .reduce((sum: number, transaction: any) => sum + transaction.amount, 0);

      const depositSum = successTransactions
        .filter((transaction: any) => transaction.type === "deposit")
        .reduce((sum: number, transaction: any) => sum + transaction.amount, 0);

      const withdrawalSum = successTransactions
        .filter((transaction: any) => transaction.type === "withdrawal")
        .reduce((sum: number, transaction: any) => sum + transaction.amount, 0);

      setTotalInterest(interestSum);
      setTotalDeposit(depositSum);
      setTotalWithdrawal(withdrawalSum);
    }
  }, []);



  
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-sky-300">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Total Interest
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {Number(totalInterest).toLocaleString('en-US')}<span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>
    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-lime-300">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Total Deposit
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {Number(totalDeposit).toLocaleString('en-US')}<span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>
    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-rose-500">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Total Withdrawal
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {Number(totalWithdrawal).toLocaleString('en-US')}<span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>
  </div>
  )
}
