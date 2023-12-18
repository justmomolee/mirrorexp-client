import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
import { useEffect, useState } from 'react';
import PageLoader from './components/PageLoader';

function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);


  useEffect(() => {
    const images = document.querySelectorAll('img');
    const videos = document.querySelectorAll('video');

    const loadAssets = async () => {
      const imagePromises = Array.from(images).map((image) => {
        return new Promise((resolve) => {
          image.onload = resolve;
        });
      });

      const videoPromises = Array.from(videos).map((video) => {
        return new Promise((resolve) => {
          video.onloadeddata = resolve;
        });
      });

      // Wait for all image and video promises to resolve
      await Promise.all([...imagePromises, ...videoPromises]);

      // All assets are loaded, update state
      setTimeout(() => {
        setAssetsLoaded(true);
      }, 10000);
    };

    loadAssets();
  }, [])

  if (!assetsLoaded) {
    return (
      <PageLoader />
    );
  }

  if (assetsLoaded) {
    return (
      <div className="App">
        <Router>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset" element={<PasswordReset />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
