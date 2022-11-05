import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BiDownload } from 'react-icons/bi';
import { AiTwotoneDelete, AiOutlineArrowsAlt } from 'react-icons/ai';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const user = fetchUser();
  const [savingPost, setSavingPost] = useState(false);
  const { postedBy, image, _id, destination } = pin;
  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  );
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const savePin = (id) => {
    if (alreadySaved) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  const navigate = useNavigate();
  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=' relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg'
      >
        {image && (
          <img
            className=' w-full rounded-lg '
            src={urlFor(image).width(250).url()}
            alt='user-post'
          />
        )}
        {postHovered && (
          <div
            className='absolute top-0 flex h-full w-full flex-col justify-between p-1 pr-2 pt-2 pb-2'
            style={{ height: '100%' }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className='text-dark flex h-9 w-9 items-center justify-center rounded-full  bg-white p-2 text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md'
                >
                  <BiDownload />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type='button'
                  className='rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md'
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type='button'
                  className='rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md'
                >
                  {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className='flex items-center justify-between gap-2'>
              {destination && (
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  target='_blank'
                  rel='noreferrer'
                  className='flex items-center gap-0 rounded-full bg-white p-1 pl-2 pr-2 font-bold text-black opacity-70 hover:opacity-100 hover:shadow-md'
                  href={destination}
                >
                  <AiOutlineArrowsAlt />
                  <p className='text-xs'>{destination}</p>
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className='text-dark rounded-3xl bg-white px-5 py-1 text-base font-bold opacity-70 outline-none hover:opacity-100 hover:shadow-md '
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className='mt-2 flex items-center gap-2 dark:text-gray-300'
      >
        <img
          src={postedBy?.image}
          alt='user-profile'
          className='h-8 w-8 rounded-full object-cover'
        />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
