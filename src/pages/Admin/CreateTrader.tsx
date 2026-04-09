import TraderForm, { emptyTraderForm } from "@/components/admin/TraderForm";
import { contextData } from "@/context/AuthContext";
import { buildApiUrl } from "@/lib/api";
import { TraderFormData } from "@/types/copyTrading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTrader() {
  const { authHeaders } = contextData();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: TraderFormData) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(buildApiUrl('/traders'), {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      navigate("/admin/traders");
    } catch (submitError: any) {
      setError(submitError.message || "Failed to create trader.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TraderForm
      error={error}
      initialValues={emptyTraderForm}
      onSubmit={handleSubmit}
      submitLabel="Create trader"
      submitting={submitting}
      title="Create Trader"
    />
  );
}
