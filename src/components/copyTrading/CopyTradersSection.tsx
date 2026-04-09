import { contextData } from "@/context/AuthContext";
import { buildApiUrl } from "@/lib/api";
import { formatMarkets, getTraderInitials } from "@/lib/copyTrading";
import { Trader } from "@/types/copyTrading";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { BarChart3, Repeat2, Sparkles, Wallet } from "lucide-react";

interface CopyTradersSectionProps {
  heading?: string;
  layout?: "carousel" | "grid";
  showPageLink?: boolean;
}

const scrollAmount = 360;

export default function CopyTradersSection({
  heading = "Copy Traders",
  layout = "grid",
  showPageLink = false,
}: CopyTradersSectionProps) {
  const { authHeaders, refreshUser } = contextData();
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingTraderId, setPendingTraderId] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const copiedCount = traders.filter((trader) => trader.isCopied).length;

  const fetchTraders = async () => {
    try {
      setError(null);
      const res = await fetch(buildApiUrl('/traders'), {
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setTraders(data);
    } catch (fetchError: any) {
      setError(fetchError.message || "Failed to fetch traders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  const toggleCopy = async (trader: Trader) => {
    try {
      setPendingTraderId(trader._id);
      setError(null);

      const res = await fetch(buildApiUrl(`/traders/${trader._id}/copy`), {
        method: trader.isCopied ? "DELETE" : "POST",
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      await fetchTraders();
      if (typeof refreshUser === "function") {
        await refreshUser();
      }
    } catch (toggleError: any) {
      setError(toggleError.message || "Failed to update copied trader.");
    } finally {
      setPendingTraderId(null);
    }
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const renderTraderCard = (trader: Trader) => (
    <article
      key={trader._id}
      className={`rounded-[18px] border border-stroke bg-white p-4 shadow-1 dark:border-strokedark dark:bg-boxdark ${
        layout === "carousel" ? "min-w-[270px] max-w-[300px] snap-start" : ""
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {trader.avatarUrl ? (
            <img
              src={trader.avatarUrl}
              alt={trader.name}
              className="h-12 w-12 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-xs font-semibold text-[#3C50E0]">
              {getTraderInitials(trader.name)}
            </div>
          )}
          <div>
            <h3 className="text-base font-semibold text-black dark:text-white">{trader.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">@{trader.handle}</p>
          </div>
        </div>
        <div className="flex items-start">
          {trader.isCopied && (
          <span
            className="rounded-full bg-[#E2FFD7] px-2.5 py-1 text-[11px] font-medium text-[#0F6B2F]"
          >
            Copied
          </span>
          )}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full border border-[#F3D9A6] bg-[#FFF4DE] px-2.5 py-1 text-[11px] font-medium text-[#9A5B00] dark:border-[#6B5630] dark:bg-[#3D3220] dark:text-[#F7D68A]">
          {formatMarkets(trader.markets, trader.marketCategory)}
        </span>
        <span className="rounded-full border border-[#BFE4CF] bg-[#E7F7EE] px-2.5 py-1 text-[11px] font-medium text-[#126B45] dark:border-[#2F6B4A] dark:bg-[#1E3A2E] dark:text-[#9DDFBB]">
          {trader.specialization}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-2xl bg-gray-50 px-2.5 py-2.5 dark:bg-gray-800/70">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-500">
            <Wallet className="h-3 w-3" />
            Min
          </div>
          <p className="text-xs font-semibold text-gray-900 dark:text-white">
            ${Number(trader.minimumBalance).toLocaleString("en-US")}
          </p>
        </div>
        <div className="rounded-2xl bg-gray-50 px-2.5 py-2.5 dark:bg-gray-800/70">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-500">
            <Sparkles className="h-3 w-3" />
            Win
          </div>
          <p className="text-xs font-semibold text-gray-900 dark:text-white">
            {Number(trader.winRate).toFixed(0)}%
          </p>
        </div>
        <div className="rounded-2xl bg-gray-50 px-2.5 py-2.5 dark:bg-gray-800/70">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-500">
            <BarChart3 className="h-3 w-3" />
            ROI
          </div>
          <p className="text-xs font-semibold text-gray-900 dark:text-white">
            {Number(trader.roi).toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{trader.copyCount || 0} copier(s)</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {trader.riskLevel} risk
        </span>
      </div>

      <div className="mt-3.5">
        <button
          type="button"
          onClick={() => toggleCopy(trader)}
          disabled={pendingTraderId === trader._id}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium ${
            trader.isCopied
              ? "bg-red-50 text-red-600 hover:bg-red-500 hover:text-white"
              : "bg-[#3C50E0] text-white shadow-[0_10px_30px_rgba(60,80,224,0.2)] hover:bg-[#3143C7]"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <Repeat2 className="h-3.5 w-3.5" />
          {pendingTraderId === trader._id
            ? "Saving..."
            : trader.isCopied
              ? "Uncopy trader"
              : "Copy trader"}
        </button>
      </div>
    </article>
  );

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-white">{heading}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-200">
            {traders.length} trader(s)
          </span>
          <span className="rounded-full bg-[#E2FFD7] px-3 py-2 text-sm font-medium text-[#0F6B2F]">
            {copiedCount} copied
          </span>
          {showPageLink && (
            <Link
              to="/dashboard/copy-traders"
              className="rounded-full border border-stroke px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white dark:border-strokedark dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Open full page
            </Link>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((card) => (
            <div key={card} className="h-[280px] animate-pulse rounded-[18px] bg-white dark:bg-gray-800" />
          ))}
        </div>
      ) : traders.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-stroke bg-white px-6 py-12 text-center dark:border-strokedark dark:bg-boxdark-2">
          <h3 className="text-lg font-semibold text-black dark:text-white">No traders available yet</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            The admin team has not published any copy traders yet.
          </p>
        </div>
      ) : layout === "carousel" ? (
        <>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="rounded-full border border-stroke p-2 text-gray-700 hover:bg-white dark:border-strokedark dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <HiArrowSmallLeft className="text-xl" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="rounded-full border border-stroke p-2 text-gray-700 hover:bg-white dark:border-strokedark dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <HiArrowSmallRight className="text-xl" />
            </button>
          </div>
          <div ref={sliderRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {traders.map(renderTraderCard)}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {traders.map(renderTraderCard)}
        </div>
      )}
    </section>
  );
}
