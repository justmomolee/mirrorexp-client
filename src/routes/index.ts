import Pricing from "@/components/pricing/Pricing";
import Bonus from "@/pages/Dashboard/Bonus";
import CopyTraders from "@/pages/Dashboard/CopyTraders";
import Deposit from "@/pages/Dashboard/Deposit";
import KYC from "@/pages/Dashboard/KYC";
import LiveTrades from "@/pages/Dashboard/LiveTrades";
import MFA from "@/pages/Dashboard/MFA";
import Profile from "@/pages/Dashboard/Profile";
import Ranking from "@/pages/Dashboard/Ranking";
import Settings from "@/pages/Dashboard/Settings";
import Transactions from "@/pages/Dashboard/Transactions";
import Withdraw from "@/pages/Dashboard/Withdraw";

const coreRoutes = [
  {
    path: 'copy-traders',
    title: 'Copy Traders',
    component: CopyTraders,
  },
  {
    path: 'liveTrades',
    title: 'LiveTrades',
    component: LiveTrades,
  },
  {
    path: 'deposit',
    title: 'Deposit',
    component: Deposit,
  },
  {
    path: 'withdrawal',
    title: 'Withdrawal',
    component: Withdraw,
  },
  {
    path: 'transactions',
    title: 'Transactions',
    component: Transactions,
  },
  {
    path: 'profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: 'ranking',
    title: 'Ranking',
    component: Ranking,
  },
  {
    path: 'pricing',
    title: 'Pricing',
    component: Pricing,
  },
  {
    path: 'bonus',
    title: 'Bonus',
    component: Bonus,
  },
  {
    path: '2fa',
    title: '2FA',
    component: MFA,
  },
  {
    path: 'kyc',
    title: 'KYC',
    component: KYC,
  },
  {
    path: 'settings',
    title: 'Settings',
    component: Settings,
  },
];

const routes = [...coreRoutes];
export default routes;
