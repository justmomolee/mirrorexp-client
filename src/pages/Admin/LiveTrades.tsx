import { contextData } from "@/context/AuthContext";
import { buildApiUrl } from "@/lib/api";
import { formatMarkets } from "@/lib/copyTrading";
import { LiveTrade, Trader } from "@/types/copyTrading";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "../login/Login.module.css";

interface TradeFormState {
  traderId: string;
  instrument: string;
  interestPercent: number;
  summary: string;
}

const initialTradeForm: TradeFormState = {
  traderId: "",
  instrument: "",
  interestPercent: 0,
  summary: "",
};

export default function LiveTrades() {
  const { authHeaders } = contextData();
  const [traders, setTraders] = useState<Trader[]>([]);
  const [trades, setTrades] = useState<LiveTrade[]>([]);
  const [tradeForm, setTradeForm] = useState<TradeFormState>(initialTradeForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchPageData = async () => {
    try {
      setError(null);
      const [tradersRes, tradesRes] = await Promise.all([
        fetch(buildApiUrl('/traders?includeInactive=true'), { headers: authHeaders() }),
        fetch(buildApiUrl('/trades'), { headers: authHeaders() }),
      ]);

      const [tradersData, tradesData] = await Promise.all([
        tradersRes.json(),
        tradesRes.json(),
      ]);

      if (!tradersRes.ok) throw new Error(tradersData.message);
      if (!tradesRes.ok) throw new Error(tradesData.message);

      setTraders(tradersData);
      setTrades(tradesData);
    } catch (fetchError: any) {
      setError(fetchError.message || "Failed to load live trades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const createTrade = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      const res = await fetch(buildApiUrl('/trades'), {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          traderId: tradeForm.traderId,
          package: tradeForm.instrument,
          interest: Number(tradeForm.interestPercent / 100),
          summary: tradeForm.summary,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccess(data.message);
      setTradeForm(initialTradeForm);
      await fetchPageData();
    } catch (submitError: any) {
      setError(submitError.message || "Failed to create live trade.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeTrade = async (tradeId: string) => {
    try {
      setError(null);
      setSuccess(null);
      const res = await fetch(buildApiUrl(`/trades/${tradeId}`), {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setSuccess(data.message);
      await fetchPageData();
    } catch (closeError: any) {
      setError(closeError.message || "Failed to close live trade.");
    }
  };

  const deleteTrade = async (tradeId: string) => {
    const confirmed = window.confirm("Delete this live trade?");
    if (!confirmed) return;

    try {
      setError(null);
      setSuccess(null);
      const res = await fetch(buildApiUrl(`/trades/${tradeId}`), {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setSuccess("Live trade deleted successfully.");
      await fetchPageData();
    } catch (deleteError: any) {
      setError(deleteError.message || "Failed to delete live trade.");
    }
  };

  const activeTrades = trades.filter((trade) => trade.status === "pending").length;
  const closedTrades = trades.filter((trade) => trade.status === "success").length;
  const activeTraders = traders.filter((trader) => trader.isActive);

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-black dark:text-white">Live Trades</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-[18px] border border-stroke bg-white p-5 shadow-1 dark:border-strokedark dark:bg-boxdark">
          <p className="text-sm text-gray-500 dark:text-gray-400">All live trades</p>
          <h2 className="mt-2 text-3xl font-semibold text-black dark:text-white">{trades.length}</h2>
        </div>
        <div className="rounded-[18px] border border-stroke bg-white p-5 shadow-1 dark:border-strokedark dark:bg-boxdark">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
          <h2 className="mt-2 text-3xl font-semibold text-black dark:text-white">{activeTrades}</h2>
        </div>
        <div className="rounded-[18px] border border-stroke bg-white p-5 shadow-1 dark:border-strokedark dark:bg-boxdark">
          <p className="text-sm text-gray-500 dark:text-gray-400">Closed</p>
          <h2 className="mt-2 text-3xl font-semibold text-black dark:text-white">{closedTrades}</h2>
        </div>
      </div>

      {error && <p className={s.formError}>{error}</p>}
      {success && <p className={s.formSuccess}>{success}</p>}

      <form
        onSubmit={createTrade}
        className="rounded-[18px] border border-stroke bg-white p-6 shadow-1 dark:border-strokedark dark:bg-boxdark"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">Create Live Trade</h2>
          {activeTraders.length === 0 && (
            <Link to="/admin/traders/new" className="text-sm font-medium text-[#3C50E0]">
              Create a trader first
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-black dark:text-white">Trader</span>
            <select
              required
              value={tradeForm.traderId}
              onChange={(event) => setTradeForm((current) => ({ ...current, traderId: event.target.value }))}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            >
              <option value="">Select a trader</option>
              {activeTraders.map((trader) => (
                <option key={trader._id} value={trader._id}>
                  {trader.name} · {formatMarkets(trader.markets, trader.marketCategory)}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-black dark:text-white">Instrument</span>
            <input
              type="text"
              required
              value={tradeForm.instrument}
              onChange={(event) => setTradeForm((current) => ({ ...current, instrument: event.target.value }))}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
              placeholder="EUR/USD"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-black dark:text-white">Profit rate (%)</span>
            <input
              type="number"
              required
              min={0}
              max={100}
              step="0.01"
              value={tradeForm.interestPercent}
              onChange={(event) => setTradeForm((current) => ({ ...current, interestPercent: Number(event.target.value) }))}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-black dark:text-white">Trade note</span>
            <input
              type="text"
              value={tradeForm.summary}
              onChange={(event) => setTradeForm((current) => ({ ...current, summary: event.target.value }))}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
              placeholder="Short-term breakout setup"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={submitting || activeTraders.length === 0}
            className="rounded-lg bg-[#3C50E0] px-5 py-3 text-sm font-medium text-white hover:bg-[#3143C7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create live trade"}
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto rounded-[18px] border border-stroke bg-white shadow-1 dark:border-strokedark dark:bg-boxdark">
        {loading ? (
          <div className="p-6 text-sm text-gray-600 dark:text-gray-300">Loading live trades...</div>
        ) : trades.length === 0 ? (
          <div className="p-6 text-sm text-gray-600 dark:text-gray-300">No live trades created yet.</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Trader</th>
                <th className="px-6 py-4">Instrument</th>
                <th className="px-6 py-4">Profit rate</th>
                <th className="px-6 py-4">Minimum balance</th>
                <th className="px-6 py-4">Opened</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Distributed</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade._id} className="border-t border-stroke dark:border-strokedark">
                  <td className="px-6 py-4">
                    <div className="font-medium text-black dark:text-white">{trade.tradeData.traderName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatMarkets(trade.tradeData.markets, trade.tradeData.marketCategory)} · {trade.tradeData.specialization}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{trade.tradeData.package}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {trade.tradeData.summary || "No note"}
                    </div>
                  </td>
                  <td className="px-6 py-4">{(trade.tradeData.interest * 100).toFixed(2)}%</td>
                  <td className="px-6 py-4">${Number(trade.tradeData.requiredBalance || 0).toLocaleString("en-US")}</td>
                  <td className="px-6 py-4">{trade.date.slice(0, 10)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        trade.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : trade.status === "success"
                            ? "bg-[#E2FFD7] text-[#0F6B2F]"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {trade.status === "pending" ? "Active" : trade.status === "success" ? "Closed" : trade.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">${Number(trade.amount || 0).toLocaleString("en-US")}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-3">
                      {trade.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => closeTrade(trade._id)}
                          className="rounded-lg bg-[#EEF4FF] px-3 py-2 text-sm font-medium text-[#3C50E0] hover:bg-[#3C50E0] hover:text-white"
                        >
                          Close
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteTrade(trade._id)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
