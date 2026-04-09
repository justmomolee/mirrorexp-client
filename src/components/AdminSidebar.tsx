import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { CiGrid42, CiCreditCard2, CiCreditCardOff, CiLogout, CiMail } from 'react-icons/ci';
import { PiPresentationChart, PiUsersFourLight } from 'react-icons/pi';
import { BsShieldPlus } from 'react-icons/bs';
import { HiOutlineKey } from 'react-icons/hi2';
import { RxChevronDown } from 'react-icons/rx';
import { contextData } from '@/context/AuthContext';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const itemClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
    isActive ? 'bg-graydark dark:bg-meta-4' : ''
  }`;

const subItemClass = ({ isActive }: { isActive: boolean }) =>
  `group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
    isActive ? '!text-white' : ''
  }`;

const groupButtonClass = (active: boolean) =>
  `text-sm group relative flex w-full items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
    active ? 'bg-graydark dark:bg-meta-4' : ''
  }`;

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { logout } = contextData();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [usersOpen, setUsersOpen] = useState(true);
  const [depositsOpen, setDepositsOpen] = useState(true);
  const [withdrawalsOpen, setWithdrawalsOpen] = useState(true);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setSidebarOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black text-sm duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      onClick={() => setSidebarOpen(false)}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            <li>
              <NavLink to="/admin" end className={itemClass}>
                <CiGrid42 className="text-xl" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/traders" className={itemClass}>
                <PiUsersFourLight className="text-xl" />
                Manage Traders
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/live-trades" className={itemClass}>
                <PiPresentationChart className="text-xl" />
                Live Trades
              </NavLink>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setUsersOpen((current) => !current)}
                className={groupButtonClass(usersOpen)}
              >
                <PiUsersFourLight className="text-xl" />
                Manage Users
                <RxChevronDown className={`ml-auto transition-transform ${usersOpen ? 'rotate-180' : ''}`} />
              </button>
              {usersOpen && (
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink to="/admin/active-users" className={subItemClass}>
                      Active Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/banned-users" className={subItemClass}>
                      Banned Users
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                type="button"
                onClick={() => setDepositsOpen((current) => !current)}
                className={groupButtonClass(depositsOpen)}
              >
                <CiCreditCard2 className="text-xl" />
                Manage Deposits
                <RxChevronDown className={`ml-auto transition-transform ${depositsOpen ? 'rotate-180' : ''}`} />
              </button>
              {depositsOpen && (
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink to="/admin/approved-deposits" className={subItemClass}>
                      Approved Deposits
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/pending-deposits" className={subItemClass}>
                      Pending Deposits
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/rejected-deposits" className={subItemClass}>
                      Rejected Deposits
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button
                type="button"
                onClick={() => setWithdrawalsOpen((current) => !current)}
                className={groupButtonClass(withdrawalsOpen)}
              >
                <CiCreditCardOff className="text-xl" />
                Manage Withdrawals
                <RxChevronDown className={`ml-auto transition-transform ${withdrawalsOpen ? 'rotate-180' : ''}`} />
              </button>
              {withdrawalsOpen && (
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                  <li>
                    <NavLink to="/admin/pending-withdrawals" className={subItemClass}>
                      Pending Withdrawals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/approved-withdrawals" className={subItemClass}>
                      Approved Withdrawals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/rejected-withdrawals" className={subItemClass}>
                      Rejected Withdrawals
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <ul className="mb-6 flex flex-col gap-1.5">
            <li>
              <NavLink to="/admin/sendmail" className={itemClass}>
                <CiMail className="text-xl" />
                Send Mail
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/activity" className={itemClass}>
                <PiPresentationChart className="text-xl" />
                Activity Logs
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/kyc" className={itemClass}>
                <BsShieldPlus className="text-xl" />
                Manage Kyc
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/settings" className={itemClass}>
                <HiOutlineKey className="text-xl" />
                Settings
              </NavLink>
            </li>
          </ul>

          <NavLink
            to="#"
            className="text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
            onClick={() => logout()}
          >
            <CiLogout className="text-xl" />
            Sign out
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
