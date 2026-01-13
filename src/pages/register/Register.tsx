import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImSpinner8 } from 'react-icons/im';
import { MdVisibility } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../../assets/logo2.svg";
import s from './Register.module.css';
import Otp from "@/components/Otp";
import { contextData } from "@/context/AuthContext";
import {
  sanitizeInput,
  sanitizeEmail,
  validateEmail,
  validateUsername,
  validatePassword,
  getFriendlyErrorMessage
} from "@/utils/validation";

export default function Register() {
  const [accountType, setAccountType] = useState<string>('none');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [referredBy, setReferredBy] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const siteKey = import.meta.env.VITE_REACT_APP_CAPTCHA_SITE_KEY
  const isDevelopment = import.meta.env.DEV;
  const [captchaToken, setCaptchaToken] = useState<string | null>(isDevelopment ? 'dev-bypass-token' : null);

  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { user } = contextData();
  const navigate = useNavigate();
  const { ref } = useParams();

  useEffect(() => {
    if(user) return navigate('/dashboard');
    if(ref) setReferredBy(ref);
  }, []);

  const validateForm = (): boolean => {
    // Clear any previous errors
    setError('');

    if (accountType === 'none') {
      setError('Please select an account type');
      return false;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error || 'Invalid email');
      return false;
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      setError(usernameValidation.error || 'Invalid username');
      return false;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.error || 'Invalid password');
      return false;
    }

    // Skip CAPTCHA validation in development mode
    if (!isDevelopment && !captchaToken) {
      setError('Please complete the CAPTCHA verification');
      return false;
    }

    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { id, value } = e.target;

    if (id === 'accountType') {
      setAccountType(value);
      setError(''); // Clear error when user makes a selection
    }

    if (id === 'email') {
      setEmail(value); // Don't sanitize during typing for better UX
      setError('');
    }

    if (id === 'username') {
      setUsername(value);
      setError('');
    }

    if (id === 'password') {
      setPassword(value);
      setError('');
    }
  };

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Sanitize all inputs before sending
      const sanitizedEmail = sanitizeEmail(email);
      const sanitizedUsername = sanitizeInput(username);
      const sanitizedReferredBy = referredBy ? sanitizeInput(referredBy) : '';

      const res = await fetch(`${url}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: sanitizedEmail,
          username: sanitizedUsername,
          password, // Password is not sanitized to preserve special characters
          referredBy: sanitizedReferredBy,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        // Reset captcha on error (only in production)
        if (!isDevelopment) {
          recaptchaRef.current?.reset();
          setCaptchaToken(null);
        }
        throw new Error(data.message);
      }

      setLoading(false);
    } catch (err: any) {
      const friendlyError = getFriendlyErrorMessage(err);
      setError(friendlyError);
      setLoading(false);
      // Reset captcha on error (only in production)
      if (!isDevelopment) {
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      }
    }
  };

  if(success) {
    // Pass sanitized values to OTP component
    return (
      <Otp
        username={sanitizeInput(username)}
        email={sanitizeEmail(email)}
        password={password}
        referredBy={referredBy ? sanitizeInput(referredBy) : ''}
      />
    );
  }

  return (!user &&
    <div className={s.ctn}>
      <form className={s.formWrp} autoComplete="off">
        <Link to="/" className="w-full mb-6">
          <img className="m-auto" alt="logo" src={logo} />
        </Link>

        <div className={s.formLinks}>
          <Link to="/login">Sign <span>In</span></Link>
          <Link to="/register" style={{ borderBottom: '2px solid #031C6E' }}>Sign <span>Up</span></Link>
        </div>

        <select id="accountType" className={s.formInput} onChange={handleChange}>
          <option value='none'>Select Account Type</option>
          <option value='individual'>Individual</option>
          <option value='company'>Company</option>
        </select>

        <input id="email" value={email} onChange={handleChange} className={s.formInput} type='email' placeholder='Email' autoComplete="off" />
        <input id="username" value={username} onChange={handleChange} className={s.formInput} type='username' placeholder='Username' autoComplete="off" />

        <div className={s.inputWrp}>
          <input
            id="password"
            value={password}
            onChange={handleChange}
            className={s.formInput}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            autoComplete="new-password"
          />
          <MdVisibility onClick={handleShowPassword} className={s.visibility} />
        </div>

        <div style={{ gap: '10px' }}>
          <input checked disabled style={{ width: '25px' }} type='checkbox' />
          <p>MirrorExp <br /><Link to='#'><span>Terms & Condition | Privacy Policy</span></Link></p>
        </div>

        {!isDevelopment && (
          <div style={{margin: "10px 0"}}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={`${siteKey}`}
              onChange={handleCaptchaChange}
            />
          </div>
        )}

        {isDevelopment && (
          <div style={{margin: "10px 0", padding: "10px", background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: "4px"}}>
            <p style={{color: "#92400e", fontSize: "14px", margin: 0}}>🔧 Development Mode: CAPTCHA disabled</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${s.formBtn} ${s.slideAnim} bigBtn`}
        >
          {loading ? <ImSpinner8 className={s.spin} /> : 'Sign Up'}
        </button>

        {error && <p className={s.formError}>{error}</p>}
        {success && <p className={s.formSuccess}>A Verification Mail Was Sent To Your Mailbox!</p>}
      </form>
    </div>
  );
}