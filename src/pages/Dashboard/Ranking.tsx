import welcome from '../../assets/ranks/welcome.png'
import silver from '../../assets/ranks/silver.png'
import silverPro from '../../assets/ranks/silverPro.png'
import gold from '../../assets/ranks/gold.png'
import goldPro from '../../assets/ranks/goldPro.png'
import diamond from '../../assets/ranks/diamond.png'
import ambassador from '../../assets/ranks/ambassador.png'
import UserRank from '@/components/userRank'


export default function Ranking() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-14 p-5 mb-4 rounded-[40px] bg-gray-50 dark:bg-gray-800">
      <UserRank imageSrc={welcome} rank="welcome" />
      <UserRank imageSrc={silver} rank="silver" />
      <UserRank imageSrc={silverPro} rank="silver pro" />
      <UserRank imageSrc={gold} rank="gold" />
      <UserRank imageSrc={goldPro} rank="gold pro" />
      <UserRank imageSrc={diamond} rank="diamond" />
      <UserRank imageSrc={ambassador} rank="ambassador" />
    </div>
  )
}
