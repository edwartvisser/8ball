"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, PlusIcon, ChartBarIcon, UserIcon, ClockIcon } from '@heroicons/react/16/solid'
import { usePlayer } from '@/context/PlayerContext';



export const BottomNavigation = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const { currentPlayer } = usePlayer();
  const player = currentPlayer || { name: '' };

  console.log(player.name);
  
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
      disabled={!currentPlayer?.id}
      />
      <NavItem 
      href="/playerranking" 
      label="Rankings" 
      icon="chart-bar" 
      active={isActive('/playerranking')} 
      />
    </div>
  );
};

const NavItem = ({ href, label, icon, active, disabled }: { 
  href: string, 
  label: string, 
  icon: string, 
  active: boolean 
  disabled: boolean
}) => {
  const activeClass = active ? 'text-indigo-600 font-medium' : 'text-gray-400';
  const disabledClass = disabled ? 'cursor-not-allowed opacity-50' : '';

  return (
    <Link href={href} className={`flex flex-col items-center ${disabledClass}`}>
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