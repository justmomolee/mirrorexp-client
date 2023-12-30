import s from './Balance.module.css'
import logo from '../../assets/fav.svg';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import Modal from '../modal/Modal'



interface BalanceProps {
  type: string;
  user: {
    deposit: number;
    interest: number;
    trade: number;
    bonus: number;
    card: string;
    username: string;
  };
}

export default function Balance({type, user}: BalanceProps) {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')



  const handleModal = (e:boolean) => {
    setShowModal(e)
  }

    
  const handleCopy = async (textToCopy:string) => {
    try {
      await navigator.clipboard.writeText(`https://mirrorexp/register/${textToCopy}`);
      alert('Text copied to clipboard');
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };


  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.left}>
          <p className={s.title}>{type === "balance"? "Total Balance" : type}</p>
          <h1 className={s.bal}>{
            type === "balance"? (user.deposit + user.interest + user.trade).toLocaleString('en-US')
            : type === "trade"? user.trade.toLocaleString('en-US')
              : type === "bonus"? user.bonus.toLocaleString('en-US')
              : user.card}<span>$</span>
          </h1>

          {type === "balance" ? 
          <div className={s.btns}>
            <Link to="/dashboard/transfer" className={s.btn}> Transfer </Link>
            <Link to="/dashboard/withdrawal" className={s.btn}> Withdraw </Link>
          </div>
          : type === "trade" ?
          <div className={s.btns}>
            <Link to="/dashboard/transfer" className={s.btn}>Transfer</Link>
          </div>
          :
          <div className={s.btns}>
            <p className={s.name}>{user.username}</p>
          </div>
          }

        </div>
        <div className={s.right}>
          <div className='flex gap-2'>
            <h3 className={s.miniBal}>
              <span className='text-[8px] text-gray-400 font-extralight'>Deposit</span>
              <span>{user.deposit.toLocaleString('en-US')}<span className="font-[Courier] text-[8px]">$</span></span>
            </h3>

            <h3 className={s.miniBal}>
              <span className='text-[8px] text-gray-400 font-thin'>Interest</span>
              <span>{user.interest.toLocaleString('en-US')}<span className="font-[Courier] text-[8px]">$</span></span>
            </h3>
          </div>

          <img src={logo} alt='logo' className="w-6" />

          {type === "trade" ? (
          <p className={s.btn} onClick={() => {setModalType('startTrade'); setShowModal(true)}}>
            Trade {">>"}
          </p>
          ) : type === "bonus" ? <div className={s.btn} onClick={() => handleCopy(user.username)}>Copy Referral Code</div> : 
          (
            <Link to="/dashboard/deposit" className={s.btn}>
              + Add Fund
            </Link>
          )}
        </div>
      </div>

      {/* {showModal && <Modal type={modalType} user={user} handleModal={handleModal}/>} */}
    </div>
  )
}
