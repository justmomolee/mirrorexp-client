import { contextData } from "@/context/AuthContext";
import { buildApiUrl } from "@/lib/api";
import { formatMarkets, getTraderInitials } from "@/lib/copyTrading";
import { Trader } from "@/types/copyTrading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function ManageTraders() {
  const { authHeaders } = contextData();
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const fetchTraders = async () => {
    try {
      setError(null);
      const res = await fetch(buildApiUrl('/traders?includeInactive=true'), {
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setTraders(data);
    } catch (fetchError: any) {
      setError(fetchError.message || "Failed to load traders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  const seedTraders = async () => {
    try {
      setSeeding(true);
      setError(null);
      setSuccess(null);

      const res = await fetch(buildApiUrl('/traders/seed'), {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      await fetchTraders();
      setSuccess(data.message);
    } catch (seedError: any) {
      setError(seedError.message || "Failed to seed traders.");
    } finally {
      setSeeding(false);
    }
  };

  const activeTraders = traders.filter((trader) => trader.isActive).length;
  const totalCopies = traders.reduce((sum, trader) => sum + (trader.copyCount || 0), 0);

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">Manage Traders</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={seedTraders}
            disabled={seeding}
            className="rounded-lg border border-stroke px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-strokedark dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {seeding ? "Seeding..." : "Seed test traders"}
          </button>
          <Link
            to="/admin/traders/new"
            className="rounded-lg bg-[#3C50E0] px-5 py-3 text-sm font-medium text-white hover:bg-[#3143C7]"
          >
            Create trader
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-[18px] border border-stroke bg-white p-5 shadow-1 dark:border-strokedark dark:bg-boxdark">
          <p className="text-sm text-gray-500 dark:text-gray-400">All traders</p>
          <h2 className="mt-2 text-3xl font-semibold text-black dark:text-white">{traders.length}</h2>
        </div>
        <div className="rounded-[18px] border border-stroke bg-white p-5 shadow-1 dark:border-strokedark dark:bg-boxdark">
          <p className="text-sm text-gray-500 dark:text-gray-400">Visible traders</p>
          <h2 className="mt-2 text-3xl font-semibold text-black dark:text-white">{activeTraders}</h2>
        </div>
        <div className="rounded-[18px] border border-stroke bg-white p-5 shadow-1 dark:border-strokedark dark:bg-boxdark">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total copies</p>
          <h2 className="mt-2 text-3xl font-semibold text-black dark:text-white">{totalCopies}</h2>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-[#BDE8C8] bg-[#E2FFD7] px-4 py-3 text-sm text-[#0F6B2F]">
          {success}
        </div>
      )}

      <div className="space-y-4 lg:hidden">
        {loading ? (
          <div className="rounded-[18px] border border-stroke bg-white p-6 text-sm text-gray-600 shadow-1 dark:border-strokedark dark:bg-boxdark dark:text-gray-300">
            Loading traders...
          </div>
        ) : traders.length === 0 ? (
          <div className="rounded-[18px] border border-stroke bg-white p-6 text-sm text-gray-600 shadow-1 dark:border-strokedark dark:bg-boxdark dark:text-gray-300">
            No traders created yet.
          </div>
        ) : (
          traders.map((trader) => (
            <article
              key={trader._id}
              className="rounded-[18px] border border-stroke bg-white p-5 shadow-1 dark:border-strokedark dark:bg-boxdark"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {trader.avatarUrl ? (
                    <img
                      src={trader.avatarUrl}
                      alt={trader.name}
                      className="h-11 w-11 shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] text-xs font-semibold text-[#3C50E0]">
                      {getTraderInitials(trader.name)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-black dark:text-white">{trader.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      @{trader.handle} · {trader.specialization}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/traders/${trader._id}/edit`}
                    aria-label={`Edit ${trader.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3C50E0] hover:bg-[#3C50E0] hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/admin/traders/${trader._id}/delete`}
                    aria-label={`Delete ${trader.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800/70">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Markets</p>
                  <p className="mt-1 font-medium text-black dark:text-white">
                    {formatMarkets(trader.markets, trader.marketCategory)}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800/70">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Min Bal</p>
                  <p className="mt-1 font-medium text-black dark:text-white">
                    ${Number(trader.minimumBalance).toLocaleString("en-US")}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {trader.copyCount || 0} copier(s)
              </div>
            </article>
          ))
        )}
      </div>

      <div className="relative hidden overflow-x-auto rounded-[18px] border border-stroke bg-white shadow-1 dark:border-strokedark dark:bg-boxdark lg:block">
        {loading ? (
          <div className="p-6 text-sm text-gray-600 dark:text-gray-300">Loading traders...</div>
        ) : traders.length === 0 ? (
          <div className="p-6 text-sm text-gray-600 dark:text-gray-300">
            No traders created yet.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Trader</th>
                <th className="px-6 py-4">Markets</th>
                <th className="whitespace-nowrap px-6 py-4">Min Bal</th>
                <th className="px-6 py-4">Copies</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {traders.map((trader) => (
                <tr key={trader._id} className="border-t border-stroke dark:border-strokedark">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {trader.avatarUrl ? (
                        <img
                          src={trader.avatarUrl}
                          alt={trader.name}
                          className="h-11 w-11 shrink-0 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] text-xs font-semibold text-[#3C50E0]">
                          {getTraderInitials(trader.name)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-black dark:text-white">{trader.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          @{trader.handle} · {trader.specialization}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{formatMarkets(trader.markets, trader.marketCategory)}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    ${Number(trader.minimumBalance).toLocaleString("en-US")}
                  </td>
                  <td className="px-6 py-4">{trader.copyCount || 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/traders/${trader._id}/edit`}
                        aria-label={`Edit ${trader.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3C50E0] hover:bg-[#3C50E0] hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/admin/traders/${trader._id}/delete`}
                        aria-label={`Delete ${trader.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Link>
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
