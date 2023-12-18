import React, { useEffect, useState } from 'react';
import s from './StockSlide.module.css';
import Vibrant from 'node-vibrant';

interface StockData {
  name: string;
  symbol: string;
  currentPrice: number;
  logoUrl: string;
  palette: any;
}

const StockSlide: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }

        const data: any[] = await response.json();

        const stocks: StockData[] = await Promise.all(
          data.map(async (stock: any) => {
            const palette = await getVibrantPalette(stock.image);
            const logoUrl = `https://cors-anywhere.herokuapp.com/${stock.image}`;
            return {
              name: stock.name,
              symbol: stock.symbol.toUpperCase(),
              currentPrice: stock.current_price,
              logoUrl,
              palette,
            };
          })
        );

        setStockData(stocks);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  const getVibrantPalette = async (imageUrl: string): Promise<string> => {
    return new Promise<string>((resolve) => {
      Vibrant.from(imageUrl)
        .getPalette()
        .then((palette) => {
          resolve(palette.Vibrant?.hex || '#ffffff');
        });
    });
  };

  return (
    <section className={s.ctn} id='slideSection'>
      <div className={s.wrp}>
        {stockData.map((stock, i) => (
          <div key={i} style={{ backgroundColor: stock.palette }}>
            <div className={s.topPart}>
              <img src={stock.logoUrl} alt={`${stock.symbol} Logo`} />
              <p>{stock.name}</p>
            </div>
            <div className={s.bottomPart}>
              <p>Buy Price: ${stock.currentPrice.toFixed(2)}</p>
              {/* Add additional pricing information as needed */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StockSlide;
