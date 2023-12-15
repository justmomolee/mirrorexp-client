const listItems = ['Raw spreads means really from 0.0 pips*', 'Our diverse and proprietary liquidity mix keeps spreads tight 24/5']
import textBg from "../assets/textBg.svg"
import CheckList from "./CheckList";

const SpreadSteps = () => {

  return (
    <section>
      <div className="max-ctn flex flex-wrap gap-x-10 gap-y-20 justify-between py-12">
        <div className="w-full p-8 bg-gray-50">
          <h2 className="text-[2rem] font-bold mb-4">
            Spreads from {' '}
            <span className="bg-cover bg-center bg-no-repeat px-4 text-white" style={{ backgroundImage: `url(${textBg})`}}>
              0.0
            </span>
            {' '} Pips
          </h2>
          <ul className="list mb-5 text-[1rem]">
            {listItems.map((item, i) => (
            <li key={i} className="flex space-x-3">
              <CheckList />

              <span className="text-sm sm:text-base text-gray-500">
                {item}
              </span>
            </li>
            ))}
          </ul>
          <a href="#" className="primaryBtn" >
            Pricing Overview <span className="ml-3">&rarr;</span>
          </a>
        </div>

        <div className="bg-gray-50 p-8 w-full max-w-[580px]">
          <h2 className="text-[2rem] font-bold mb-4">
            <span className="bg-cover bg-center bg-no-repeat px-4 text-white" style={{ backgroundImage: `url(${textBg})`}}>
              Fast
            </span>
            {' '} Order Execution
          </h2>
          <ul className="list mb-5 text-[1rem]">
            <li className="flex space-x-3">
              <CheckList />

              <span className="text-sm sm:text-base text-gray-500">
                Average execution speeds of under 40ms***
              </span>
            </li>

            <li className="flex space-x-3">
              <CheckList />

              <span className="text-sm sm:text-base text-gray-500">
                Low latency fibre optic and Equinix NY4 server
              </span>
            </li>

            <li className="flex space-x-3">
              <CheckList />

              <span className="text-sm sm:text-base text-gray-500">
                Free Low latency collocated VPS available
              </span>
            </li>
          </ul>
          <a href="#" className="primaryBtn" >
            Get your Free VPS <span className="ml-3">&rarr;</span>
          </a>
        </div>

        <div className="bg-gray-50 p-8 w-full max-w-[580px]">
          <h2 className="text-[2rem] font-bold mb-4">
            Grade {' '}
            <span className="bg-cover bg-center bg-no-repeat px-4 text-white" style={{ backgroundImage: `url(${textBg})`}}>
              Trading
            </span>
          </h2>
          <ul className="list mb-5 text-[1rem]">
            <li className="flex space-x-3">
              <CheckList />

              <span className="text-sm sm:text-base text-gray-500">
                Real, deep and diverse liquidity you can trade on
              </span>
            </li>

            <li className="flex space-x-3">
              <CheckList />

              <span className="text-sm sm:text-base text-gray-500">
                Over 29 Billion USD in FX trades processed daily
              </span>
            </li>

            <li className="flex space-x-3">
              <CheckList />

              <span className="text-sm sm:text-base text-gray-500">
                Copied Trades have 100% success rates
              </span>
            </li>
          </ul>
          <a href="#" className="primaryBtn" >
            Raw Pricing Benefits <span className="ml-3">&rarr;</span>
          </a>
        </div>
      </div>

    </section>
  );
};

export default SpreadSteps;
