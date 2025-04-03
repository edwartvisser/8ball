"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, PlusIcon, ChartBarIcon, UserIcon, ClockIcon } from '@heroicons/react/16/solid'



export const BottomNavigation = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 max-w-md mx-auto">
      <NavItem 
        href="/dashboard" 
        label="Dashboard" 
        icon="home" 
        active={isActive('/dashboard')} 
      />
      <NavItem 
        href="/newmatch" 
        label="New Match" 
        icon="plus" 
        active={isActive('/newmatch')} 
      />
      <NavItem 
        href="/playerranking" 
        label="Rankings" 
        icon="chart-bar" 
        active={isActive('/playerranking')} 
      />
      <NavItem 
        href="/playerprofile" 
        label="Profile" 
        icon="user" 
        active={isActive('/playerprofile')} 
      />
      <NavItem 
        href="/matchhistory" 
        label="History" 
        icon="clock" 
        active={isActive('/matchhistory')} 
      />
    </div>
  );
};

const NavItem = ({ href, label, icon, active }: { 
  href: string, 
  label: string, 
  icon: string, 
  active: boolean 
}) => {
  const activeClass = active ? 'text-indigo-600 font-medium' : 'text-gray-400';
  
  return (
    <Link href={href} className="flex flex-col items-center">
      <span className={`w-6 h-6 ${activeClass}`}>
        {icon === 'home' && <HomeIcon className="w-6 h-6" />}
        {icon === 'plus' && <PlusIcon className="w-6 h-6" />}
        {icon === 'chart-bar' && <ChartBarIcon className="w-6 h-6" />}
        {icon === 'user' && <UserIcon className="w-6 h-6" />}
        {icon === 'clock' && <ClockIcon className="w-6 h-6" />}
      </span>
      <span className={`text-xs mt-1 ${activeClass}`}>{label}</span>
    </Link>
  );
};

export default BottomNavigation;