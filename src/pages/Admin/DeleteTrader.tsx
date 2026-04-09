import { contextData } from "@/context/AuthContext";
import { buildApiUrl } from "@/lib/api";
import { formatMarkets, getTraderInitials } from "@/lib/copyTrading";
import { Trader } from "@/types/copyTrading";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeleteTrader() {
  const { id } = useParams();
  const { authHeaders } = contextData();
  const [trader, setTrader] = useState<Trader | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrader = async () => {
      try {
        setError(null);
        const res = await fetch(buildApiUrl(`/traders/${id}`), {
          headers: authHeaders(),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);
        setTrader(data);
      } catch (fetchError: any) {
        setError(fetchError.message || "Failed to load trader.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrader();
  }, [id]);

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(buildApiUrl(`/traders/${id}`), {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      navigate("/admin/traders");
    } catch (deleteError: any) {
      setError(deleteError.message || "Failed to delete trader.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-[18px] border border-stroke bg-white p-6 shadow-1 dark:border-strokedark dark:bg-boxdark">
        Loading trader...
      </div>
    );
  }

  return (
    <section className="rounded-[18px] border border-stroke bg-white p-6 shadow-1 dark:border-strokedark dark:bg-boxdark">
      <h1 className="text-2xl font-semibold text-black dark:text-white">Delete Trader</h1>

      {trader && (
        <div className="mt-6 flex items-center gap-4 rounded-[18px] bg-gray-50 p-5 dark:bg-gray-800/70">
          {trader.avatarUrl ? (
            <img src={trader.avatarUrl} alt={trader.name} className="h-16 w-16 rounded-2xl object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
              {getTraderInitials(trader.name)}
            </div>
          )}
          <div>
            <div className="text-lg font-semibold text-black dark:text-white">{trader.name}</div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              @{trader.handle} · {trader.specialization} · {formatMarkets(trader.markets, trader.marketCategory)}
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Minimum balance: ${Number(trader.minimumBalance).toLocaleString("en-US")} · {Number(trader.copyCount || 0)} copier(s)
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={submitting}
          className="rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Deleting..." : "Delete trader"}
        </button>
        <Link
          to="/admin/traders"
          className="rounded-lg border border-stroke px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-strokedark dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Cancel
        </Link>
      </div>
    </section>
  );
}
