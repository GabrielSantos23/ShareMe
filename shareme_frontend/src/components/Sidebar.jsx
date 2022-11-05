import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../assets/logo.png';
import { categories } from '../utils/data';
import Switcher from './Switcher';
const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out captalize dark:text-gray-400';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out captalize z-100 dark:text-gray-500';

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className='z-100 flex h-full min-w-210 flex-col  justify-between  bg-white transition-all dark:bg-gray-900'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className=' my-6 flex w-190 items-center gap-2 px-5 pt-1'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base dark:text-gray-400 2xl:text-lg'>
            {' '}
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              onClick={handleCloseSidebar}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              key={category.name}
            >
              <img src={category.image} className='h-8 w-8 rounded-full' />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='my-5 mx-3 mb-3 flex items-center gap-2 rounded-lg bg-white shadow-lg dark:bg-gray-900 dark:text-gray-400'
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            alt='user-profile-pic'
            className='h-10 w-10 rounded-full '
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
