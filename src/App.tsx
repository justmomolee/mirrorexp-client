import { Route, Routes, Navigate  } from 'react-router-dom';

//importing pages
import Home from './pages/Home';
import Copytrade from './pages/Copytrade';
import WhyMirrorExp from './pages/WhyMirrorExp';
import Regulations from './pages/Regulations';
import Contact from './pages/Contact';
import Traders from './pages/Traders';
import Label from './pages/Label';
import Insurance from './pages/Insurance';
import { Server } from 'lucide-react';
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
import { contextData } from './context/AuthContext'
import UpdateProfile from './components/UpdateProfile';
import routes from './routes';
import Dashboard from './pages/Dashboard/Dashboard';
import DefaultLayout from './components/Layouts/DefaultLayout';

function App() {
  const { fetching, user } = contextData();



  if (fetching) return ( <PageLoader /> )
  

  if (!fetching) return (
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
      <Route path="/company/servers" element={<Server />} />
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


      {user ? (
        <>
          <Route path="/dashboard/" element={<DefaultLayout />}>
            {user.fullName === "" ? (
              <Route path="/dashboard/updateProfile" element={<UpdateProfile />} />
            ) : (
              <Route path="/dashboard/home" element={<Dashboard />} />
            )}

            <Route index element={<Dashboard />} />
            <Route path="/dashboard/home" element={<Dashboard />} />
            
            {routes.map((route, i) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
          </Route>

          {/* Redirect users from login or register to dashboard */}
          <Route path="/login" element={<Navigate to="/dashboard/home" />} />
          <Route path="/register" element={<Navigate to="/dashboard/home" />} />
          <Route path="/register/:ref" element={<Navigate to="/dashboard/home" />} />
        </>
      ) : (
        <>

          {/* Redirect users from dashboard to login */}
          <Route path="/dashboard/*" element={<Navigate to="/login" />} />

          {/* Routes for non-authenticated users continued */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:ref" element={<Register />} />
          <Route path="/password-reset" element={<PasswordReset />} />
        </>
      )}
  </Routes>
  );
}

export default App;