import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Copytrade from './pages/Copytrade';
import WhyMirrorExp from './pages/WhyMirrorExp';
import Regulations from './pages/Regulations';
import Contact from './pages/Contact';
import Traders from './pages/Traders';
import Label from './pages/Label';
import Insurance from './pages/Insurance';
import Servers from './pages/Servers';
import Tools from './pages/Tools';
import Forex from './pages/Forex';
import Commodities from './pages/Commodities';
import Bonds from './pages/Bonds';
import Indices from './pages/Indices';
import Crypto from './pages/Crypto';
import Stocks from './pages/Stocks';
import Futures from './pages/Futures';
import Conditions from './pages/Conditions';
import Spreads from './pages/Spreads';
import Hours from './pages/Hours';
import Swap from './pages/Swap';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PasswordReset from './pages/passwordReset/PasswordReset';
import PricingPage from './pages/Pricing';
import PageLoader from './components/PageLoader';
import { contextData } from './context/AuthContext';
import UpdateProfile from './components/UpdateProfile';
import routes from './routes';
import Dashboard from './pages/Dashboard/Dashboard';
import DefaultLayout from './components/Layouts/DefaultLayout';
import Admin from './pages/Admin/Admin';
import AdminLayout from './components/Layouts/AdminLayout';
import ActiveUsers from './pages/Admin/ActiveUsers';
import BannedUsers from './pages/Admin/BannedUsers';
import ApprovedDeposits from './pages/Admin/ApprovedDeposits';
import PendingDeposits from './pages/Admin/PendingDeposits';
import RejectedDeposits from './pages/Admin/RejectedDeposits';
import ApprovedWithdrawals from './pages/Admin/ApprovedWithdrawals';
import PendingWithdrawals from './pages/Admin/PendingWithdrawals';
import RejectedWithdrawals from './pages/Admin/RejectedWithdrawals';
import KYC from './pages/Dashboard/KYC';
import Settings from './pages/Admin/Settings';
import { Helmet } from 'react-helmet';
import SendMail from './pages/Admin/SendMail';
import ActivityLogs from './pages/Admin/ActivityLogs';
import ManageTraders from './pages/Admin/ManageTraders';
import CreateTrader from './pages/Admin/CreateTrader';
import EditTrader from './pages/Admin/EditTrader';
import DeleteTrader from './pages/Admin/DeleteTrader';
import AdminLiveTrades from './pages/Admin/LiveTrades';

function App() {
  const location = useLocation();
  const isPublicRoute =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/password-reset');
  const { fetching, user } = contextData();

  if (fetching) return <PageLoader />;

  return (
    <>
      <Helmet>
        {isPublicRoute ? (
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
        ) : (
          <meta name="viewport" content="width=1280, user-scalable=yes" />
        )}
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/copytrade" element={<Copytrade />} />
        <Route path="/company/why" element={<WhyMirrorExp />} />
        <Route path="/company/regulations" element={<Regulations />} />
        <Route path="/company/contact" element={<Contact />} />
        <Route path="/company/traders" element={<Traders />} />
        <Route path="/company/label" element={<Label />} />
        <Route path="/company/insurance" element={<Insurance />} />
        <Route path="/company/servers" element={<Servers />} />
        <Route path="/company/tools" element={<Tools />} />
        <Route path="/products/forex" element={<Forex />} />
        <Route path="/products/commodities" element={<Commodities />} />
        <Route path="/products/indices" element={<Indices />} />
        <Route path="/products/bonds" element={<Bonds />} />
        <Route path="/products/crypto" element={<Crypto />} />
        <Route path="/products/stocks" element={<Stocks />} />
        <Route path="/products/futures" element={<Futures />} />
        <Route path="/more/pricing" element={<PricingPage />} />
        <Route path="/more/conditions" element={<Conditions />} />
        <Route path="/more/spreads" element={<Spreads />} />
        <Route path="/more/hours" element={<Hours />} />
        <Route path="/more/swap" element={<Swap />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/password-reset/:page" element={<PasswordReset />} />

        {user ? (
          <>
            {user.isAdmin ? (
              <>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Admin />} />
                  <Route path="home" element={<Navigate to="/admin" replace />} />
                  <Route path="active-users" element={<ActiveUsers />} />
                  <Route path="traders" element={<ManageTraders />} />
                  <Route path="traders/new" element={<CreateTrader />} />
                  <Route path="traders/:id/edit" element={<EditTrader />} />
                  <Route path="traders/:id/delete" element={<DeleteTrader />} />
                  <Route path="live-trades" element={<AdminLiveTrades />} />
                  <Route path="banned-users" element={<BannedUsers />} />
                  <Route path="approved-deposits" element={<ApprovedDeposits />} />
                  <Route path="pending-deposits" element={<PendingDeposits />} />
                  <Route path="rejected-deposits" element={<RejectedDeposits />} />
                  <Route path="approved-withdrawals" element={<ApprovedWithdrawals />} />
                  <Route path="pending-withdrawals" element={<PendingWithdrawals />} />
                  <Route path="rejected-withdrawals" element={<RejectedWithdrawals />} />
                  <Route path="sendmail" element={<SendMail />} />
                  <Route path="activity" element={<ActivityLogs />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="kyc" element={<KYC />} />
                </Route>

                <Route path="/login" element={<Navigate to="/admin" replace />} />
                <Route path="/register" element={<Navigate to="/admin" replace />} />
                <Route
                  path="/register/:ref"
                  element={<Navigate to="/admin" replace />}
                />
              </>
            ) : (
              <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />
            )}

            {!user.isAdmin ? (
              <>
                <Route path="/dashboard" element={<DefaultLayout />}>
                  <Route
                    index
                    element={
                      user.fullName === '' ? (
                        <Navigate to="updateProfile" replace />
                      ) : (
                        <Dashboard />
                      )
                    }
                  />
                  <Route path="home" element={<Navigate to="/dashboard" replace />} />
                  <Route path="updateProfile" element={<UpdateProfile />} />
                  {routes.map((route, index) => (
                    <Route
                      key={`${route.path}-${index}`}
                      path={route.path}
                      element={<route.component />}
                    />
                  ))}
                </Route>

                <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                <Route path="/register" element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="/register/:ref"
                  element={<Navigate to="/dashboard" replace />}
                />
              </>
            ) : (
              <Route path="/dashboard/*" element={<Navigate to="/admin" replace />} />
            )}
          </>
        ) : (
          <>
            <Route path="/dashboard/*" element={<Navigate to="/login" replace />} />
            <Route path="/admin/*" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/:ref" element={<Register />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
