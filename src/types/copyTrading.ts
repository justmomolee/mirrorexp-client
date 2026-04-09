export interface Trader {
  _id: string;
  name: string;
  handle: string;
  specialization: string;
  markets: string[];
  marketCategory?: string;
  riskLevel: string;
  minimumBalance: number;
  winRate: number;
  roi: number;
  bio: string;
  avatarUrl: string;
  avatarPublicId?: string;
  isActive: boolean;
  copyCount?: number;
  isCopied?: boolean;
  createdAt?: string;
}

export interface TraderFormData {
  name: string;
  handle: string;
  specialization: string;
  markets: string[];
  riskLevel: string;
  minimumBalance: number;
  winRate: number;
  roi: number;
  bio: string;
  avatarUrl: string;
  avatarPublicId?: string;
  isActive: boolean;
}

export interface LiveTrade {
  _id: string;
  status: "pending" | "success" | "failed";
  amount: number;
  date: string;
  tradeData: {
    package: string;
    interest: number;
    traderId?: string;
    traderName: string;
    specialization: string;
    markets: string[];
    marketCategory?: string;
    requiredBalance: number;
    summary: string;
  };
}
