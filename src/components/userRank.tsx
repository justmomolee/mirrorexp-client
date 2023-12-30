import { contextData } from '@/context/AuthContext';
import React from 'react';

interface UserRankProps {
  rank: string;
  imageSrc: string;
}

const UserRank: React.FC<UserRankProps> = ({ rank, imageSrc }) => {
  const { user } = contextData()


  return (
    <div className="">
      <div className="w-30 h-30 p-7 bg-gray-300/20 rounded-[50px] overflow-hidden transition-transform transform-gpu hover:scale-105">
        <img
          src={imageSrc}
          alt={rank}
          className={`w-full h-full object-cover grayscale hover:grayscale-0 ${user.rank === rank? 'grayscale-0': ''}`}
        />
      </div>
      <h3 className="w-fit m-auto mt-2 text-gray-800 font-normal capitalize text-base font-satoshi dark:text-gray-100">
        {rank}
      </h3>
    </div>
  );
};

export default UserRank;
