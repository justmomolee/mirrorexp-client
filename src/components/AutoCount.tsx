import { useEffect, useState } from 'react';

const AutoCount = () => {
  const [startCount, setStartCount] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);

  const handleScroll = () => {
    const element = document.getElementById('counterSection');
    if (
      element &&
      window.scrollY > element.offsetTop - window.innerHeight / 2 &&
      window.scrollY < element.offsetTop + element.offsetHeight
    ) {
      setStartCount(true);
      window.removeEventListener('scroll', handleScroll);
    } else {
      setStartCount(false);
      setTotalDeposits(0);
    }
  };

  const startCountAnimation = () => {
    let counter = 0;
    const intervalId = setInterval(() => {
      counter += 1;
      setTotalUsers(counter > 540 ? 540 : counter);
      if (counter >= 540) clearInterval(intervalId);
    }, 20);

    let counter2 = 0;
    const intervalId2 = setInterval(() => {
      counter2 += 1;
      setTotalProfits(counter2 > 740 ? 740 : counter2);
      if (counter2 >= 740) clearInterval(intervalId2);
    }, 20);

    let counter3 = 0;
    const intervalId3 = setInterval(() => {
      counter3 += 1;
      setTotalDeposits(counter3 > 969 ? 969 : counter3);
      if (counter3 >= 969) clearInterval(intervalId3);
    }, 20);

    let counter4 = 0;
    const intervalId4 = setInterval(() => {
      counter4 += 1;
      setTotalWithdrawal(counter4 > 513 ? 513 : counter4);
      if (counter4 >= 513) clearInterval(intervalId4);
    }, 20);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (startCount) startCountAnimation();
  }, [startCount]);

  return (
    <section id='counterSection'>
      <div className="max-ctn py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-5 lg:py-[100px] justify-evenly items-center">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>

        
        <div className="flex flex-col items-center w-full max-md:mb-20">
          <p className="text-sm mb-8 text-gray-500">Active Users</p>
          <h2 className="hd-text text-white font-[4rem]">{totalUsers}k</h2>
        </div>
        <div className="flex flex-col items-center w-full max-md:mb-20">
          <p className="text-base mb-8 text-gray-500">Total Deposits</p>
          <h2 className="hd-text text-white font-[4rem]">
            <span className='text-xl mb-6 text-gray-500'>$</span>
            {totalDeposits}
            <span className='text-xl mb-6 text-gray-500'>M</span>
          </h2>
        </div>
        <div className="flex flex-col items-center w-full max-md:mb-20">
          <p className="text-base mb-8 text-gray-500">Total Profits</p>
          <h2 className="hd-text text-white font-[4rem]">
            <span className='text-xl mb-6 text-gray-500'>$</span>
            {totalProfits}
            <span className='text-xl mb-6 text-gray-500'>M</span>
          </h2>
        </div>
        <div className="flex flex-col items-center w-full max-md:mb-20">
          <p className="text-base mb-8 text-gray-500">Total Withdrawal</p>
          <h2 className="hd-text text-white font-[4rem]">
            <span className='text-xl mb-6 text-gray-500'>$</span>
            {totalWithdrawal}
            <span className='text-xl mb-6 text-gray-500'>M</span>
          </h2>
        </div>
      </div>
    </div>
    </section>
  );
};

export default AutoCount;
