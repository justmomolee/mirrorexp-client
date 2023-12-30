import logo from "../../assets/logo2.svg"
import s from "./Login.module.css"
import { useEffect, useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { Link, useNavigate } from "react-router-dom"
import { MdVisibility } from "react-icons/md"
import Otp from "@/components/Otp"
import { contextData } from "@/context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;  
  const { user } = contextData()
  const navigate = useNavigate()

  useEffect(() => {
    if(user) return navigate('/dashboard')
  }, [])



  const handleChange = (e:any) => {
    if(e.target.type === 'email') {
      setEmail(e.target.value.toLowerCase())
      if(e.target.value.length > 7 && e.target.value.includes('@') && password.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }

    if(e.target.type === 'password' || e.target.type === 'text') {
      setPassword(e.target.value)
      if(email.length > 7 && email.includes('@') && e.target.value.length > 7)
        setShowButton(true)
      else setShowButton(false)
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }


  const handleSubmit = async(e:any) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try{
      // send info to server
      const res = await fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
      }
      else throw new Error(data.message)
      setLoading(false)
    } catch(err:any) {
      setError(err.message)
      setLoading(false)
    }
  }

  if(success) {
    return (
    <Otp username={""} referredBy={""} email={email} password={password}/>
    )
  }

  return (!user &&
    <div className={s.ctn}>
      <div className={s.formWrp}>
          <Link to="/" className="w-full mb-6">
            <img className="m-auto" alt="logo" src={logo} />
          </Link>

          <div className={s.formLinks}>
            <Link to="/login"  style={{borderBottom: '2px solid #031C6E'}}>Sign <span>In</span></Link>
            <Link to="/register">Sign <span>Up</span></Link>
          </div>

          <input value={email} onChange={handleChange} className={s.formInput} type='email' placeholder='Email' autoComplete="off"/>
          <div className={s.inputWrp}>
            {
              showPassword ?
              <input value={password} onChange={handleChange} className={s.formInput} type='text' placeholder='Password' autoComplete="new-password"/>
            : <input value={password} onChange={handleChange} className={s.formInput} type='password' placeholder='Password' autoComplete="new-password"/>
            }
            <MdVisibility onClick={handleShowPassword} className={s.visibility}/>
          </div>

          {showButton && <button onClick={handleSubmit} className={`w-full ${s.slideAnim} bigBtn`}>{loading? <ImSpinner8 className="spin" /> : 'Sign In'}</button>}

          <div className={s.formLinks}> 
            <Link className="m-auto" to="/password-reset">Forgot <span>Password?</span></Link>
          </div>
          {error && <p className={s.formError}>{error}</p>}
          {success && <p className={s.formSuccess}>A Verification Mail Was Sent To Your Mail</p>}
      </div>
    </div>
  )
}
