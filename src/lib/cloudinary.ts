import { buildApiUrl } from "@/lib/api";

export interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
}

interface CloudinarySignatureResponse {
  apiKey: string;
  cloudName: string;
  folder: string;
  signature: string;
  timestamp: number;
}

export const uploadTraderAvatar = async (
  file: File,
  authHeaders: HeadersInit = {},
): Promise<CloudinaryUploadResult> => {
  const signatureResponse = await fetch(buildApiUrl("/traders/avatar-signature"), {
    method: "POST",
    headers: authHeaders,
  });
  const signatureData: CloudinarySignatureResponse & { message?: string } =
    await signatureResponse.json();

  if (!signatureResponse.ok) {
    throw new Error(signatureData.message || "Cloudinary upload is not configured yet.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signatureData.apiKey);
  formData.append("folder", signatureData.folder);
  formData.append("signature", signatureData.signature);
  formData.append("timestamp", String(signatureData.timestamp));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Trader avatar upload failed.");
  }

  return {
    publicId: data.public_id,
    secureUrl: data.secure_url,
  };
};
