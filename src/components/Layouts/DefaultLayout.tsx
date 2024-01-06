import { useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { contextData } from '@/context/AuthContext';
import PageLoader from '../PageLoader';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = contextData()
  const navigate = useNavigate()

  useEffect(() => {
    if(!user) return navigate('/login')

    if(user && user.fullName === '') return navigate('/dashboard/updateProfile')
  }, [])

  if(!user) return <PageLoader />

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
