import Pricing from "@/components/pricing/Pricing";
import Bonus from "@/pages/Dashboard/Bonus";
import KYC from "@/pages/Dashboard/KYC";
import LiveTrades from "@/pages/Dashboard/LiveTrades";
import MFA from "@/pages/Dashboard/MFA";
import Profile from "@/pages/Dashboard/Profile";
import Ranking from "@/pages/Dashboard/Ranking";
import Settings from "@/pages/Dashboard/Settings";
import Trades from "@/pages/Dashboard/Trades";
import Transactions from "@/pages/Dashboard/Transactions";
import TransferToDeposit from "@/pages/Dashboard/TransferToDeposit";
import TransferToTrade from "@/pages/Dashboard/TransferToTrade";

const coreRoutes = [
  {
    path: '/dashboard/trades',
    title: 'Trades',
    component: Trades,
  },
  {
    path: '/dashboard/liveTrades',
    title: 'LiveTrades',
    component: LiveTrades,
  },
  {
    path: '/dashboard/transfer',
    title: 'Transfer',
    component: TransferToTrade,
  },
  {
    path: '/dashboard/transfer/trade',
    title: 'Transfer',
    component: TransferToTrade,
  },
  {
    path: '/dashboard/transfer/deposit',
    title: 'Transfer',
    component: TransferToDeposit,
  },
  {
    path: '/dashboard/transactions',
    title: 'Transactions',
    component: Transactions,
  },
  {
    path: '/dashboard/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/dashboard/ranking',
    title: 'Ranking',
    component: Ranking,
  },
  {
    path: '/dashboard/pricing',
    title: 'Pricing',
    component: Pricing,
  },
  {
    path: '/dashboard/bonus',
    title: 'Bonus',
    component: Bonus,
  },
  {
    path: '/dashboard/2fa',
    title: '2FA',
    component: MFA,
  },
  {
    path: '/dashboard/kyc',
    title: 'KYC',
    component: KYC,
  },
  {
    path: '/dashboard/settings',
    title: 'Settings',
    component: Settings,
  },
];

const routes = [...coreRoutes];
export default routes;
