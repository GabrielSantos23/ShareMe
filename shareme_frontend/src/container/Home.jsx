import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile, Login } from '../components/index';
import { client } from '../client';
import logo from '../assets/logo.png';
import Pins from './Pins';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  console.log(userInfo);
  return (
    <div className='z-50 flex h-screen flex-col bg-gray-50 transition-height duration-75 ease-out dark:bg-gray-800 md:flex-row '>
      <div className='hidden h-screen flex-initial md:flex'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex flex-row md:hidden'>
        <div className='flex w-full flex-row items-center justify-between p-2 shadow-md'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer'
            onClick={() => setToggleSidebar(true)}
          />
          <Link to='/'>
            <img src={logo} alt='logo' className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt='logo' className='w-28 rounded-lg' />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed z-10 h-screen w-4/5 animate-slide-in overflow-y-auto bg-white shadow-md'>
            <div className='absolte flex w-full items-center justify-end p-2'>
              <AiFillCloseCircle
                fontSize={30}
                className='cursor-pointer'
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className='h-screen flex-1 overflow-y-scroll pb-2' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
