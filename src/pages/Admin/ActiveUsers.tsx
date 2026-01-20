import EditUserModal from "@/components/EditUserModal";
import PageLoader from "@/components/PageLoader";
import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { TfiSearch } from "react-icons/tfi";

const tableTitles = ["User", "Phone", "Country", "Balance", "Action"]
const USERS_PER_PAGE = 10;

export default function ActiveUsers() {
  const { user:admin, authHeaders } = contextData()
  const [users, setUsers] = useState<any>(null)
  const [filteredUsers, setFilteredUsers] = useState<any>(null)
  const [userData, setUserData] = useState(null)
  const [fetching, setFetching] = useState(true)
  const [reFetch, setReFetch] = useState(true)
  const [page, setPage] = useState(1);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${url}/users`, {
        headers: authHeaders(),
      });
      const data = await res.json();

      if (res.ok) {
        const cleaned = data.filter((user:any) => user._id !== admin._id);
        setUsers(cleaned);
        setFilteredUsers(cleaned);
        setPage(1);
      }
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false)
    }
  };

  useEffect(() => {
    fetchUsers()
  }, [reFetch])

  const handleUserData = (userObj:any) => {
    setUserData(userObj)
    setReFetch(!reFetch)
  }

  const handleSearch = (search: string) => {
    console.log(users)
    let filtered = users.filter((user:any) =>
      user.email.toLowerCase().includes(search) ||
      user.fullName.toLowerCase().includes(search)
    )
    setFilteredUsers(filtered)
    setPage(1)
  }

  const paginatedUsers = filteredUsers
    ? filteredUsers.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE)
    : [];

  const totalPages = filteredUsers ? Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE)) : 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };



  if(fetching) return <PageLoader />

  return (
    <>
    <div className="relative overflow-x-auto">

      <div className="py-3 bg-white dark:bg-transparent mb-5 flex justify-center">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <TfiSearch className="w53 h-3 text-gray-500 dark:text-gray-400"/>
            </div>
            <input onChange={(e) => handleSearch(e.target.value)} type="text" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
        </div>
      </div>

    
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {tableTitles.map(title => <th key={title} scope="col" className="px-6 py-3">{title}</th>)}
            </tr>
        </thead>

        <tbody>
            {paginatedUsers && paginatedUsers.map((user:any) => 
            <tr key={user._id} className="min-w-[150px] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-5 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                  <img className="w-10 h-10 rounded-full bg-[#E2FFD7]/10" src={`https://robohash.org/${user?._id}`} alt="Avatar" />
                    <div className="ps-3">
                        <div className="text-xs font-semibold">
                          {user.fullName.length > 17 && user.fullName.slice(0, 15) + "..."} 
                          {user.fullName.length < 17 && user.fullName}
                        </div>
                        <div className="text-xs font-medium text-gray-500">
                          {user.email.length > 17 && user.email.slice(0, 15) + "..."} 
                          {user.email.length < 17 && user.email} 
                        </div>
                    </div>  
                </th>

                <td className="min-w-[150px] px-5 py-3 text-xs">
                    {user.phone}
                </td>

                <td className="min-w-[150px] px-5 py-3 text-xs">
                    {user.country.length > 14 && user.country.slice(0, 11) + "..."} 
                    {user.country.length < 14 && user.country}
                </td>

                <td>
                  <div className="min-w-[150px] ps-4 text-xs font-semibold">
                    <div>deposit: ${user.deposit}</div>
                    <div>Interest: ${user.interest}</div>
                  </div>
                </td>

                <td className="min-w-[150px] px-5 py-3">
                    <button onClick={() => handleUserData(user)} className="font-medium text-blue-600 dark:text-blue-500">Edit user</button>
                </td>
            </tr>
              )}
        </tbody>
    </table>

      {filteredUsers && filteredUsers.length > USERS_PER_PAGE && (
        <div className="flex items-center justify-between mt-4 text-xs text-gray-700 dark:text-gray-300">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={!canPrev}
              className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-600"
            >
              Prev
            </button>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={!canNext}
              className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {userData && <EditUserModal userData={userData} handleUserData={handleUserData}/>}
  </div>
    </>
  )
}
