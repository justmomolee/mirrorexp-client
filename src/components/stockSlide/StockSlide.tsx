import s from './StockSlide.module.css';
import textBg from "../../assets/textBg.png"

interface StockData {
  name: string;
  buy: string;
  sell: string;
  img: string;
}

export default function StockSlide({ stockData }: { stockData: StockData[] })  {

  return (
    <section className={s.ctn} id='slide'>
      <h1 className="pl-3 w-full max-w-lg text-center m-auto font-semibold text-3xl max-md:text-2xl text-black mb-6">
        Trade Our Top Performing {" "}
        <span className="bg-cover bg-center bg-no-repeat px-4 text-white" style={{ backgroundImage: `url(${textBg})`}}>
          Products.
        </span>
      </h1>
      <div className={s.wrp}>
        {["1", "2", "3"].map(() => stockData.map((stock, i) => (
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