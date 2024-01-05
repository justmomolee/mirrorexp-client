import s from './StockSlide.module.css';
import textBg from "../../assets/textBg.png"
import netflixImg from '../../assets/stocksLogos/netflix.svg'
import bitcoinImg from '../../assets/stocksLogos/bitcoin.svg'
import coffeeImg from '../../assets/stocksLogos/coffee.svg'
import cornImg from '../../assets/stocksLogos/corn.svg'
import ethereumImg from '../../assets/stocksLogos/ethereum.svg'
import goldImg from '../../assets/stocksLogos/gold.svg'
import googleImg from '../../assets/stocksLogos/google.svg'
import litecoinImg from '../../assets/stocksLogos/litecoin.svg'
import mcdonaldsImg from '../../assets/stocksLogos/mcdonalds.svg'
import metalImg from '../../assets/stocksLogos/metal.svg'
import microsoftImg from '../../assets/stocksLogos/microsoft.svg'
import openaiImg from '../../assets/stocksLogos/openai.svg'
import rippleImg from '../../assets/stocksLogos/ripple.svg'
import teslaImg from '../../assets/stocksLogos/tesla.svg'
import { useEffect, useState } from 'react';


interface StockData {
  name: string;
  symbol: string;
  buy: string;
  sell: string;
  img: any;
}[]


const stockData = [
  {
    name: "bitcoin",
    symbol: "BTC",
    buy: "9.99",
    sell: "10.99",
    img: bitcoinImg,
  },
  {
    name: "coffee",
    symbol: "COFF",
    buy: "9.99",
    sell: "10.99",
    img: coffeeImg,
  },
  {
    name: "corn",
    symbol: "CORN",
    buy: "9.99",
    sell: "10.99",
    img: cornImg,
  },
  {
    name: "ethereum",
    symbol: "ETH",
    buy: "9.99",
    sell: "10.99",
    img: ethereumImg,
  },
  {
    name: "gold",
    symbol: "GOLD",
    buy: "9.99",
    sell: "10.99",
    img: goldImg,
  },
  {
    name: "google",
    symbol: "GOOGL",
    buy: "9.99",
    sell: "10.99",
    img: googleImg,
  },
  {
    name: "litecoin",
    symbol: "LTC",
    buy: "9.99",
    sell: "10.99",
    img: litecoinImg,
  },
  {
    name: "mcdonalds",
    symbol: "MCD",
    buy: "9.99",
    sell: "10.99",
    img: mcdonaldsImg,
  },
  {
    name: "metal",
    symbol: "MTL",
    buy: "9.99",
    sell: "10.99",
    img: metalImg,
  },
  {
    name: "microsoft",
    symbol: "MSFT",
    buy: "9.99",
    sell: "10.99",
    img: microsoftImg,
  },
  {
    name: "netflix",
    symbol: "NFLX",
    buy: "9.99",
    sell: "10.99",
    img: netflixImg,
  },
  {
    name: "openai",
    symbol: "OPEN",
    buy: "9.99",
    sell: "10.99",
    img: openaiImg,
  },
  {
    name: "ripple",
    symbol: "XRP",
    buy: "9.99",
    sell: "10.99",
    img: rippleImg,
  },
  {
    name: "tesla",
    symbol: "TSLA",
    buy: "9.99",
    sell: "10.99",
    img: teslaImg,
  },
];



export default function StockSlide()  {
  const [newStocksData, setNewStocksData] = useState<null|StockData[]>(null)

  
  const fetchRealTimePrices = async (symbols:string[]) => {
    try {
      const symbolsString = symbols.join(',');
  
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbolsString}&vs_currencies=usd`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();

        stockData.forEach(stock => {
        const price = data[stock.name]?.usd || getRandomDummyPrice();
  
        stock.buy = price.toFixed(2);
        stock.sell = (price - (price * 0.01)).toFixed(2);
      });
  
      console.log('Real-time prices updated:', stockData);
      setNewStocksData(stockData)
    } catch (error) {
      console.error('Error fetching real-time prices:', error);
    }
  };
  
  const getRandomDummyPrice = () => {
    return Math.random() * 100;
  };
  

  

  useEffect(() => {
    const symbolsToFetch = stockData.map(stock => stock.name);
    fetchRealTimePrices(symbolsToFetch);
  }, []);




  return (
    <section className={s.ctn} id='slide'>
      <h1 className="pl-3 w-full max-w-lg text-center m-auto font-semibold text-3xl max-md:text-2xl text-black mb-6">
        Trade Our Top Performing {" "}
        <span className="bg-cover bg-center bg-no-repeat px-4 text-white" style={{ backgroundImage: `url(${textBg})`}}>
          Products.
        </span>
      </h1>
      <div className={s.wrp}>
        {!newStocksData ? ["1", "2", "3"].map(() => stockData.map((stock, i) => (
          <div key={i} className='w-[200px] flex flex-col shadow-md'>
            <div className="flex items-center justify-around h-[90px] bg-black">
              <img src={stock.img} alt={`${stock.name} Logo`} className='w-[50px] shadow-sm'/>
              <p className='text-white font-medium text-base'>{stock.name}</p>
            </div>

            <div className="w-full flex justify-between p-5">
              <div className='flex flex-col items-center gap-3'>
                <p className='text-xs text-green-700'>{stock.buy}</p>
                <button className='py-1 px-5 bg-green-600 text-white font-semibold text-[10px]'>Buy</button>
              </div>

              <div className='flex flex-col items-center gap-3'>
                <p className='text-xs text-green-600'>{stock.sell}</p>
                <button className='py-1 px-5 bg-red-700 text-white font-semibold text-[10px]'>Sell</button>
              </div>
            </div>
          </div>
        ))) : ["1", "2", "3"].map(() => newStocksData.map((stock, i) => (
          <div key={i} className='w-[200px] flex flex-col shadow-md'>
            <div className="flex items-center justify-around h-[90px] bg-black">
              <img src={stock.img} alt={`${stock.name} Logo`} className='w-[50px] shadow-sm'/>
              <p className='text-white font-medium text-base'>{stock.name}</p>
            </div>

            <div className="w-full flex justify-between p-5">
              <div className='flex flex-col items-center gap-3'>
                <p className='text-xs text-green-700'>{stock.buy}</p>
                <button className='py-1 px-5 bg-green-600 text-white font-semibold text-[10px]'>Buy</button>
              </div>

              <div className='flex flex-col items-center gap-3'>
                <p className='text-xs text-green-600'>{stock.sell}</p>
                <button className='py-1 px-5 bg-red-700 text-white font-semibold text-[10px]'>Sell</button>
              </div>
            </div>
          </div>
        )))}
      </div>
    </section>
  );
};