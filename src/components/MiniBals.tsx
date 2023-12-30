
export default function MiniBals() {
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-sky-300">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Total Interest
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {Number(874533).toLocaleString('en-US')}<span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>
    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-lime-300">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Total Deposit
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {Number(874533).toLocaleString('en-US')}<span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>
    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-rose-500">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Total Withdrawal
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {Number(874533).toLocaleString('en-US')}<span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>
  </div>
  )
}
