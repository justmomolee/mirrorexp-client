import React from 'react';
import imgSrc from '../assets/copy-trade2.png'
import textBg from "../assets/textBg.svg"

const LightSection: React.FC = () => {
  return (
  <section>
    <div className="max-ctn pad-y pad-x flex flex-wrap-reverse justify-between items-center gap-16">
      <div className="w-full max-w-md">
        <h2 className="text-[2rem] font-bold mb-4">
          Copy Trading {' '}
          <span className="bg-cover bg-center bg-no-repeat px-4 text-white" style={{ backgroundImage: `url(${textBg})`}}>
            Simplified
          </span>
        </h2>
        <p className="desc mb-4 md:mb-10 lg:mb-6 font-light">
          Discover the power of copy trading with our transparent platform. Follow successful traders and replicate their strategies seamlessly.
        </p>
        <button className="primaryBtn">Explore Copy Trading <span className="ml-3">&rarr;</span></button>
      </div>

      <div className='w-full max-w-lg'>
        <img src={imgSrc} alt='copy trade' className='w-full'/>
      </div>
    </div>
  </section>
  );
};

export default LightSection;
