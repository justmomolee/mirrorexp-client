import React from 'react';
import imgSrc from '../assets/copy-trade3.png'
import textBg from "../assets/textBg.png"

const LightSection2: React.FC = () => {
  return (
  <section>
    <div className="max-ctn pad-y pad-x flex flex-wrap-reverse justify-between items-center gap-16">
      <div className="w-full max-w-lg">
        <h2 className="text-[2rem] font-bold mb-4">
          When They {' '}  
          <span className="bg-cover bg-center bg-no-repeat px-4 text-white" style={{ backgroundImage: `url(${textBg})`}}>
          Trade
          </span>
          {' '} You Trade
        </h2>
        <p className="desc mb-4 md:mb-10 lg:mb-6 font-light">
        Whether you're a beginner learning the basics or you simply don't have time to watch the markets, now it's easy to leverage other traders' expertise. With MirrorExp Copy Trading, you can automatically copy top-performing traders, instantly replicating their trading in your own portfolio.
        </p>
        <button className="primaryBtn">Explore Copy Trading <span className="ml-3">&rarr;</span></button>
      </div>

      <div className='w-full max-w-md'>
        <img src={imgSrc} alt='copy trade' className='w-full'/>
      </div>
    </div>
  </section>
  );
};

export default LightSection2;
