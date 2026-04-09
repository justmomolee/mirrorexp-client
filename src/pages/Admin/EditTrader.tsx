import TraderForm, { emptyTraderForm } from "@/components/admin/TraderForm";
import { contextData } from "@/context/AuthContext";
import { buildApiUrl } from "@/lib/api";
import { Trader, TraderFormData } from "@/types/copyTrading";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const mapTraderToForm = (trader: Trader): TraderFormData => ({
  name: trader.name,
  handle: trader.handle,
  specialization: trader.specialization,
  markets: trader.markets?.length
    ? trader.markets
    : trader.marketCategory
      ? [trader.marketCategory]
      : [],
  riskLevel: trader.riskLevel,
  minimumBalance: trader.minimumBalance,
  winRate: trader.winRate,
  roi: trader.roi,
  bio: trader.bio,
  avatarUrl: trader.avatarUrl || "",
  avatarPublicId: trader.avatarPublicId || "",
  isActive: trader.isActive,
});

export default function EditTrader() {
  const { id } = useParams();
  const { authHeaders } = contextData();
  const [initialValues, setInitialValues] = useState<TraderFormData>(emptyTraderForm);
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
        setInitialValues(mapTraderToForm(data));
      } catch (fetchError: any) {
        setError(fetchError.message || "Failed to load trader.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrader();
  }, [id]);

  const handleSubmit = async (values: TraderFormData) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(buildApiUrl(`/traders/${id}`), {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      navigate("/admin/traders");
    } catch (submitError: any) {
      setError(submitError.message || "Failed to update trader.");
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
    <TraderForm
      error={error}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitLabel="Save trader"
      submitting={submitting}
      title="Edit Trader"
    />
  );
}
