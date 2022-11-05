import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
const Id = import.meta.env.VITE_GOOGLE_ID;
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { client } from '../client';
import jwt_decode from 'jwt-decode';
const login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, picture, sub } = decoded;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    console.log(decoded);
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };
  return (
    <GoogleOAuthProvider clientId={Id}>
      <div className='flex h-screen flex-col items-center justify-start'>
        <div className='relative h-full w-full'>
          <video
            src={shareVideo}
            type='video/mp4'
            loop
            controls={false}
            muted
            autoPlay
            className='h-full w-full object-cover'
          />
          <div className='absolute top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center bg-blackOverlay'>
            <div
              className='
            p-5'
            >
              <img src={logo} alt='' width={130} />
            </div>
            <div>
              <div className='shadow-2xl'>
                <GoogleLogin
                  onSuccess={responseGoogle}
                  onError={responseGoogle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default login;
