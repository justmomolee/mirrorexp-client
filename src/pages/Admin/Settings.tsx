// import { countries } from "@/lib/countries";
// import { useEffect, useState } from "react";
// import s from "../login/Login.module.css";

// export default function Settings({userData}:any) {
//   const [utils, setUtils] = useState(null)
//   const [error, setError] = useState<string|null>(null)
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const url = import.meta.env.VITE_REACT_APP_SERVER_URL;  

//   const fetchUtils = async () => {
//     try {
//       const res = await fetch(`${url}/utils`);
//       const data = await res.json();

//       if (res.ok) {
//         setUtils(data)
//       }
//       else throw new Error(data.message);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setFetching(false)
//     }
//   };

//   useEffect(() => {
//     fetchUsers()
//   }, [reFetch])

//   useEffect(() => {
//     setFullName(userData.fullName); setEmail(userData.email); setSelectedCountry(userData.country);
//     setPhoneNumber(userData.phone); setAddress(userData.address); setCity(userData.city); 
//     setState(userData.state); setZipCode(userData.zipCode);  setDeposit(userData.deposit); 
//     setInterest(userData.interest); setTrade(userData.trade); setBonus(userData.bonus);
//   }, [])



//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
//     setError(null);

//     if(fullName.length < 3) return setError("Full name must be at least 3 characters");
//     if(email.length < 7) return setError("Email must be at least 7 characters");
//     if(selectedCountry === 'none' || selectedCountry === '') return setError("No country was selected");
//     if(phoneNumber.length < 3) return setError("Invalid phone number");
//     if(address.length < 3) return setError("Address must be at least 3 characters");
//     if(state.length < 3) return setError("State must be at least 3 characters");
//     if(city.length < 3) return setError("City must be at least 3 characters");
//     if(zipCode.length < 3) return setError("Zip Code must be at least 3 characters");

//     const profileData = {
//       email, fullName,
//       country: selectedCountry,
//       phone: phoneNumber,
//       address, state, city, zipCode,
//       deposit, interest, trade, bonus
//     }


//     try {
//       setLoading(true);
//       const res = await fetch(`${url}/users/update-profile`, {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(profileData)
//       })
//       const data = await res.json()

//       if (res.ok) setSuccess(true)
//       else throw new Error(data.message)
//     } catch (error: any) {
//       setError(error.message)
//     } finally {
//       setLoading(false);
//     }
//   }



//   return (
//       <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">

//           {/* <!-- Modal header --> */}
//           <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   Edit user
//               </h3>
//           </div>

//           {/* <!-- Modal body --> */}
//           <div className="p-6 space-y-6">
//               <div className="grid grid-cols-6 gap-6">
//                   <div className="col-span-6 sm:col-span-3">
//                       <label htmlFor="full-name" className="editUserLabel">Full Name</label>
//                       <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" id="full-name" className="editUserInput" placeholder={userData.fullName} required />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                       <label htmlFor="email" className="editUserLabel">Email</label>
//                       <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="editUserInput" placeholder={userData.email} required />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                       <label htmlFor="country" className="editUserLabel">Country</label>
//                       <select id="country" value={selectedCountry} onChange={(e) => {setSelectedCountry(e.target.value)}} className="editUserInput">
//                         <option value="none">{userData.country}</option>
//                         {countries.map((country, i) => <option key={i} value={country.name}>{country.name}</option>) }
//                       </select>
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                       <label htmlFor="phone-number" className="editUserLabel">Phone Number</label>
//                       <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" id="phone-number" className="editUserInput" placeholder={userData.phone} required />
//                   </div>

//                   <div className="col-span-6 sm:col-span-3">
//                       <label htmlFor="address" className="editUserLabel">Address</label>
//                       <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" className="editUserInput" placeholder={userData.address} required />
//                   </div>

//               </div>
//               {error && <p className={s.formError}>{error}</p>}
//               {success && <p className={s.formSuccess}>User Updated SuccessFully...</p>}
//           </div>

//           {/* <!-- Modal footer --> */}
//           <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
//               <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? "Saving..." : "Save all"}</button>
//           </div>
//       </form>
//   )
// }


export default function Settings() {
  return (
    <div>Settings</div>
  )
}
