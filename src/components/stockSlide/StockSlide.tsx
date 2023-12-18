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
      <h1 className="pl-3 w-full max-w-sm m-auto font-medium text-3xl max-md:text-2xl text-black">
        Trade Our Top Performing {" "}
        <span className="bg-cover bg-center bg-no-repeat px-4 text-white" style={{ backgroundImage: `url(${textBg})`}}>
          Products.
        </span>
      </h1>
      <div className={s.wrp}>
        {["1", "2", "3"].map(() => stockData.map((stock, i) => (
          <div key={i} className='w-[200px] flex flex-col shadow-md'>
            <div className="flex items-center justify-around h-[80px] bg-gray-900">
              <img src={stock.img} alt={`${stock.name} Logo`} className='w-[40px] h-10'/>
              <p className='text-white font-medium text-normal'>{stock.name}</p>
            </div>

            <div className="w-full flex justify-between p-4">
              <div className='flex flex-col items-center gap-3'>
                <p className='text-xs text-green-600'>{stock.buy}</p>
                <button className='py-1 px-4 bg-green-500 text-white font-semibold text-[10px]'>Buy</button>
              </div>

              <div className='flex flex-col items-center gap-3'>
                <p className='text-xs text-green-600'>{stock.sell}</p>
                <button className='py-1 px-4 bg-rose-600 text-white font-semibold text-[10px]'>Sell</button>
              </div>
            </div>
          </div>
        )))}
      </div>
    </section>
  );
};