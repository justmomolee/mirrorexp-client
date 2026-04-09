import { contextData } from '@/context/AuthContext';
import { buildApiUrl } from '@/lib/api';
import { formatMarkets } from '@/lib/copyTrading';
import { LiveTrade } from '@/types/copyTrading';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LiveTrades() {
  const { user, authHeaders } = contextData();
  const [trades, setTrades] = useState<LiveTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const copiedTraderCount = user?.copiedTraders?.length || 0;
  const availableBalance = Number(user?.deposit || 0);

  const fetchTrades = async () => {
    try {
      setError(null);
      const res = await fetch(buildApiUrl('/trades'), {
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setTrades(data);
    } catch (fetchError: any) {
      setError(fetchError.message || 'Failed to load live trades.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [copiedTraderCount]);

  return (
    <section className="space-y-5">
      <div className="rounded-[18px] border border-stroke bg-white p-6 shadow-1 dark:border-strokedark dark:bg-boxdark">
        <h1 className="text-2xl font-semibold text-black dark:text-white">Live Trades</h1>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-[#E2FFD7] px-3 py-2 font-medium text-[#0F6B2F]">
            {copiedTraderCount} copied trader(s)
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-2 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            {trades.length} active live trade(s)
          </span>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-[18px] border border-stroke bg-white p-6 shadow-1 dark:border-strokedark dark:bg-boxdark">
          Loading live trades...
        </div>
      ) : copiedTraderCount === 0 ? (
        <div className="rounded-[18px] border border-dashed border-stroke bg-white p-8 text-center shadow-1 dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-lg font-semibold text-black dark:text-white">Copy a trader first</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            You only see live trades after copying at least one trader from the Copy Traders page.
          </p>
          <Link to="/dashboard/copy-traders" className="primaryBtn mt-5 inline-flex">
            Go to Copy Traders
          </Link>
        </div>
      ) : trades.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-stroke bg-white p-8 text-center shadow-1 dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-lg font-semibold text-black dark:text-white">No active live trades right now</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            The traders you copy do not currently have any open live trades.
          </p>
        </div>
      ) : (
        <div className="relative overflow-x-auto rounded-[18px] border border-stroke bg-white shadow-1 dark:border-strokedark dark:bg-boxdark">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Trader</th>
                <th className="px-6 py-4">Instrument</th>
                <th className="px-6 py-4">Market</th>
                <th className="px-6 py-4">Profit rate</th>
                <th className="px-6 py-4">Required balance</th>
                <th className="px-6 py-4">Eligibility</th>
                <th className="px-6 py-4">Opened</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => {
                const isEligible =
                  availableBalance > 0 &&
                  availableBalance >= Number(trade.tradeData.requiredBalance || 0);

                return (
                <tr key={trade._id} className="border-t border-stroke dark:border-strokedark">
                  <td className="px-6 py-4">
                    <div className="font-medium text-black dark:text-white">{trade.tradeData.traderName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{trade.tradeData.specialization}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{trade.tradeData.package}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {trade.tradeData.summary || "No note"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {formatMarkets(trade.tradeData.markets, trade.tradeData.marketCategory)}
                  </td>
                  <td className="px-6 py-4">{(trade.tradeData.interest * 100).toFixed(2)}%</td>
                  <td className="px-6 py-4">${Number(trade.tradeData.requiredBalance || 0).toLocaleString('en-US')}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isEligible
                          ? 'bg-[#E2FFD7] text-[#0F6B2F]'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {isEligible ? 'Eligible' : 'Balance too low'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{trade.date.slice(0, 10)}</td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
