import { contextData } from "@/context/AuthContext";
import { TraderFormData } from "@/types/copyTrading";
import { getTraderInitials } from "@/lib/copyTrading";
import { uploadTraderAvatar } from "@/lib/cloudinary";
import { FormEvent, useEffect, useState } from "react";

interface TraderFormProps {
  error?: string | null;
  initialValues: TraderFormData;
  onSubmit: (values: TraderFormData) => Promise<void>;
  submitLabel: string;
  submitting: boolean;
  title: string;
}

export const emptyTraderForm: TraderFormData = {
  name: "",
  handle: "",
  specialization: "",
  markets: [],
  riskLevel: "Moderate",
  minimumBalance: 0,
  winRate: 0,
  roi: 0,
  bio: "",
  avatarUrl: "",
  avatarPublicId: "",
  isActive: true,
};

export default function TraderForm({
  error = null,
  initialValues,
  onSubmit,
  submitLabel,
  submitting,
  title,
}: TraderFormProps) {
  const { authHeaders } = contextData();
  const [values, setValues] = useState<TraderFormData>(initialValues);
  const [marketsInput, setMarketsInput] = useState(initialValues.markets.join(", "));
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setValues(initialValues);
    setMarketsInput(initialValues.markets.join(", "));
  }, [initialValues]);

  const updateField = <K extends keyof TraderFormData>(field: K, value: TraderFormData[K]) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  const handleMarketsChange = (value: string) => {
    setMarketsInput(value);
    updateField(
      "markets",
      value
        .split(",")
        .map((market) => market.trim())
        .filter(Boolean),
    );
  };

  const handleAvatarUpload = async (file?: File) => {
    if (!file) return;

    try {
      setUploadingAvatar(true);
      setUploadError(null);
      const upload = await uploadTraderAvatar(file, authHeaders());
      setValues((current) => ({
        ...current,
        avatarUrl: upload.secureUrl,
        avatarPublicId: upload.publicId,
      }));
    } catch (avatarError: any) {
      setUploadError(avatarError.message || "Failed to upload trader avatar.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[18px] border border-stroke bg-white p-6 shadow-1 dark:border-strokedark dark:bg-boxdark"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-black dark:text-white">{title}</h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-[18px] bg-gray-50 p-4 dark:bg-gray-800/70">
        {values.avatarUrl ? (
          <img
            src={values.avatarUrl}
            alt={values.name || "Trader avatar"}
            className="h-16 w-16 rounded-2xl object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF4FF] text-lg font-semibold text-[#3C50E0]">
            {getTraderInitials(values.name || "Trader")}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer rounded-lg bg-[#3C50E0] px-5 py-3 text-sm font-medium text-white hover:bg-[#3143C7]">
            {uploadingAvatar ? "Uploading..." : "Upload avatar"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleAvatarUpload(event.target.files?.[0])}
            />
          </label>
          {values.avatarUrl && (
            <button
              type="button"
              onClick={() =>
                setValues((current) => ({
                  ...current,
                  avatarUrl: "",
                  avatarPublicId: "",
                }))
              }
              className="rounded-lg bg-red-50 px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-500 hover:text-white"
            >
              Remove avatar
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black dark:text-white">Trader name</span>
          <input
            type="text"
            required
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            placeholder="Amara Cole"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black dark:text-white">Handle</span>
          <input
            type="text"
            required
            value={values.handle}
            onChange={(event) => updateField("handle", event.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            placeholder="amarafx"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black dark:text-white">Specialization</span>
          <input
            type="text"
            required
            value={values.specialization}
            onChange={(event) => updateField("specialization", event.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            placeholder="Scalping"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black dark:text-white">Markets</span>
          <input
            type="text"
            required
            value={marketsInput}
            onChange={(event) => handleMarketsChange(event.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
            placeholder="Forex, Crypto"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black dark:text-white">Risk level</span>
          <select
            value={values.riskLevel}
            onChange={(event) => updateField("riskLevel", event.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black dark:text-white">Minimum balance</span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={values.minimumBalance}
            onChange={(event) => updateField("minimumBalance", Number(event.target.value))}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black dark:text-white">Win rate (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            step="0.01"
            value={values.winRate}
            onChange={(event) => updateField("winRate", Number(event.target.value))}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black dark:text-white">ROI (%)</span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={values.roi}
            onChange={(event) => updateField("roi", Number(event.target.value))}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-black dark:text-white">Trader note</span>
        <textarea
          rows={4}
          value={values.bio}
          onChange={(event) => updateField("bio", event.target.value)}
          className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none focus:border-primary dark:border-strokedark dark:text-white"
          placeholder="Tight risk management, short intraday setups, and a clear bias on liquid majors."
        />
      </label>

      <label className="mt-5 flex items-center gap-3 text-sm font-medium text-black dark:text-white">
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(event) => updateField("isActive", event.target.checked)}
          className="h-4 w-4 rounded border-stroke"
        />
        Trader is visible to users
      </label>

      {(error || uploadError) && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error || uploadError}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={submitting || uploadingAvatar || values.markets.length === 0}
          className="rounded-lg bg-[#3C50E0] px-5 py-3 text-sm font-medium text-white hover:bg-[#3143C7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
