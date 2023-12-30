import { lazy } from 'react';
const Trades = lazy(() => import('@/pages/Dashboard/Trades'));
const LiveTrades = lazy(() => import('@/pages/Dashboard/LiveTrades'));
const Profile = lazy(() => import('@/pages/Dashboard/Profile'));
const Transactions = lazy(() => import('@/pages/Dashboard/Transactions'));
const Ranking = lazy(() => import('@/pages/Dashboard/Ranking'));
const MFA = lazy(() => import('@/pages/Dashboard/MFA'));
const KYC = lazy(() => import('@/pages/Dashboard/KYC'));
const Settings = lazy(() => import('@/pages/Dashboard/Settings'));
const Bonus = lazy(() => import('@/pages/Dashboard/Bonus'));

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
