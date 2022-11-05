import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import Switcher from './Switcher';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className='mt-5 flex w-full gap-2 pb-7 md:gap-5'>
      <div className='flex w-full items-center justify-start rounded-md border-none bg-white px-2 outline-none focus-within:shadow-sm dark:bg-gray-700'>
        <IoMdSearch fontSize={21} className='ml-1 ' />
        <input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='w-full bg-white p-2 outline-none dark:bg-gray-700'
        />
      </div>
      <div className='flex gap-3'>
        <Switcher />

        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
          <img
            src={user.image}
            alt='user image'
            className='h-12 w-14 rounded-lg'
          />
        </Link>
        <Link
          to='create-pin'
          className='flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white md:h-12 md:w-14 '
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
