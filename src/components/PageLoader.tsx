import { useEffect } from 'react';
import logo from '../assets/logo.svg';

export default function PageLoader() {
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  useEffect(() => {
    console.log(url)
  })

  return (
    <section className='flex items-center justify-center h-screen bg-gray-900'>
      <div className='flex flex-col gap-5'>
        <img src={logo} alt="logo" width={150}/>
        <span className='flex w-4 h-[2px] rounded-full slideLoad bg-[#E2FFD7]'></span>
      </div>
    </section>
  )
}
