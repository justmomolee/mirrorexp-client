import { contextData } from "@/context/AuthContext"
import { useState } from "react"
import s from '../login/Login.module.css'

export default function TransferToDeposit() {
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const { user } = contextData()

  const sendTransfer = async (e: any) => {
    e.preventDefault()
    setError('')

    if(amount < 1) return setError("The minimum transfer amount is $1")
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(`${url}/transfers/fromTrade`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: user._id, amount })
      })
      const data = await res.json()

      if(res.ok) setSuccess(data.message) 
      else throw new Error(data.message)
    } catch (error: any) {
      setError(error.message)
    } finally{
      setLoading(false)
      setAmount(0)
    }
  }



  return (
  <div className="w-full flex  justify-center shadow-1 m-auto">
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" action="#" onSubmit={sendTransfer}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Transfer to trade balance</h5>
        <div>
          <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
          <input onChange={(e:any) => setAmount(e.target.value)} value={amount} type="number" id="otp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Transfer Amount" required/>
        </div>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? "Loading...": "Transfer"}</button>
        {error && <p className={s.formError}>{error}</p>}
        {success && <p className={s.formSuccess}>{success}</p>}
      </form>
    </div>
  </div>
  )
}

