
export default function TransactionsTable() {
  return (
    <div className="relative overflow-x-auto rounded-[6px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                        Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">
                        1
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">
                        1
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
