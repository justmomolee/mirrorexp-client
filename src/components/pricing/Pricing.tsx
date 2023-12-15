import { BsCheck } from "react-icons/bs"
import s from "./Pricing.module.css";
// import useAuth from '../../hooks/useAuth'
import { useState } from "react"
// import { useNavigate } from "react-router-dom";


export default function Pricing({standardPlan, advancedPlan, NFP, BTC}:any) {
  const [standard, setStandard] = useState(true)
  const [advanced, setAdvanced] = useState(false)
  const [nfp, setNFP] = useState(false)
  const [btc, setBTC] = useState(false)
  // const Navigate = useNavigate()
  // const createdAt = new Date().toLocaleString()
  // const {user} = useAuth()
  // const [success, setSuccess] = useState<string|null>(null)
  // const [failed, setFailed] = useState<string|null>(null)
  // const [userDetails, setUserDetails] = useState<any>([])



    const handleInvest = (desc:any, title:any) => {
      console.log(desc, title)
    //   setSuccess(null)
    //   setFailed(null)

      // if (user) {
        // const amount = Number(window.prompt("Enter investment amount", ""))
        
        // if (amount < userDetails.bal.balance) {
        //   setSuccess("Your investment was successful")
        // }

        // if(amount > userDetails.bal.balance) {
        //   setFailed("Insufficient funds")
        // } 
      // } else {
      //   Navigate("/login")
      // }
    }

    const showStandard = () => {
      setStandard(true)
      setAdvanced(false)
      setNFP(false)
      setBTC(false)
    }

    const showAdvanced = () => {
      setStandard(false)
      setAdvanced(true)
      setNFP(false)
      setBTC(false)
    }

    const showNFP = () => {
      setStandard(false)
      setAdvanced(false)
      setNFP(true)
      setBTC(false)
    }

    const showBTC = () => {
      setStandard(false)
      setAdvanced(false)
      setNFP(false)
      setBTC(true)
    }





  return (
    <section className="pt-14">
      <div className="w-full max-w-[fit-content] m-auto flex flex-col justify-center gap-5">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Pricing</h1>
        <div className="bg-gray-100 rounded-full flex flex-wrap gap-1 p-2 transition-all">
          <button onClick={showStandard} className={`${standard ? 'bg-green-300' : 'bg-white'} text-gray-800 rounded-full px-3 py-1 text-xs font-semibold`}>Standard</button>
          <button onClick={showAdvanced} className={`${advanced ? 'bg-green-300' : 'bg-white'} text-gray-800 rounded-full px-3 py-1 text-xs font-semibold`}>Advanced</button>
          <button onClick={showNFP} className={`${nfp ? 'bg-green-300' : 'bg-white'} text-gray-800 rounded-full px-3 py-1 text-xs font-semibold`}>NFP</button>
          <button onClick={showBTC} className={`${btc ? 'bg-green-300' : 'bg-white'} text-gray-800 rounded-full px-3 py-1 text-xs font-semibold`}>BTC</button>
        </div>
      </div>

      {/* Standard Plan */}
      {standard &&
      <div className={s.ctn}>
        {standardPlan.map((plan:any, i:any)  =>
          <div className={s.card} key={i}>
            <div className={s.content1}>
              <h2>{plan.title}</h2>
              {plan.pips.max !== undefined && <h3>{plan.pips.min}<span>%</span> - {plan.pips.max}<span>%</span></h3>}
              {plan.pips.max === undefined && <h3>{plan.pips.min}<span>%</span></h3>}
              <span className={s.seperate}></span>
            </div>
            <button onClick={() => handleInvest(plan.desc, plan.title)}>Start Trade</button>
            <div className={s.content2}>
              {plan.truepoints.map((truepoint: any) => <div key={truepoint} className={s.fact1}><span><BsCheck /><p>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
      </div> 
      }

      {/* Advanced Plan */}
      {advanced &&
      <div className={s.ctn}>
        {advancedPlan.map((plan:any, i:any)  =>
          <div className={s.card} key={i}>
            <div className={s.content1}>
              <h2>{plan.title}</h2>
              {plan.pips.max !== undefined && <h3>{plan.pips.min}<span>%</span> - {plan.pips.max}<span>%</span></h3>}
              {plan.pips.max === undefined && <h3>{plan.pips.min}<span>%</span></h3>}
              <span className={s.seperate}></span>
            </div>
            <button onClick={() => handleInvest(plan.desc, plan.title)}>Start Trade</button>
            <div className={s.content2}>
              {plan.truepoints.map((truepoint: any) => <div key={truepoint} className={s.fact1}><span><BsCheck /><p>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
      </div> 
      }

      {/* NFP */}
      {nfp &&
      <div className={s.ctn}>
        {NFP.map((plan:any, i:any)  =>
          <div className={s.card} key={i}>
            <div className={s.content1}>
              <h2>{plan.title}</h2>
              {plan.pips.max !== undefined && <h3>{plan.pips.min}<span>%</span> - {plan.pips.max}<span>%</span></h3>}
              {plan.pips.max === undefined && <h3>{plan.pips.min}<span>%</span></h3>}
              <span className={s.seperate}></span>
            </div>
            <button onClick={() => handleInvest(plan.desc, plan.title)}>Start Trade</button>
            <div className={s.content2}>
              {plan.truepoints.map((truepoint: any) => <div key={truepoint} className={s.fact1}><span><BsCheck /><p>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
      </div> 
      }

      {/*BTC*/}
      {btc &&
      <div className={s.ctn}>
        {BTC.map((plan:any, i:any)  =>
          <div className={s.card} key={i}>
            <div className={s.content1}>
              <h2>{plan.title}</h2>
              {plan.pips.max !== undefined && <h3>{plan.pips.min}<span>%</span> - {plan.pips.max}<span>%</span></h3>}
              {plan.pips.max === undefined && <h3>{plan.pips.min}<span>%</span></h3>}
              <span className={s.seperate}></span>
            </div>
            <button onClick={() => handleInvest(plan.desc, plan.title)}>Start Trade</button>
            <div className={s.content2}>
              {plan.truepoints.map((truepoint: any) => <div key={truepoint} className={s.fact1}><span><BsCheck /><p>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
      </div> 
      }
    </section>
  )
}
