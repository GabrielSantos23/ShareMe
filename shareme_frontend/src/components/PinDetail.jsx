import Pin from './Pin';
import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import { BiBorderRadius } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';
const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState();
  const [comment, setcomment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: 'postedBy', _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setcomment('');
          setAddingComment(false);
        });
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetails(data[0]);
        console.log(data);
        if (data[0]) {
          const query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetails) return <Spinner massage='Loading pin...' />;

  return (
    <>
      <div
        className='m-auto flex flex-col bg-white xl:flex-row'
        style={{ maxWidth: '1500px', borderRadius: '32px' }}
      >
        <div className=' justify-center md:items-start'>
          <img
            src={pinDetails?.image && urlFor(pinDetails.image).url()}
            className=' rounded-t-3xl rounded-b-lg'
            alt='user-post'
          />
        </div>
        <div className='w-full flex-1 p-5 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <a
                href={`${pinDetails.image?.asset?.url}?dl=`}
                download
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className='text-dark flex h-9 w-9 items-center justify-center rounded-full bg-white p-2 text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetails.destination} target='_blank' rel='noreferrer'>
              {pinDetails.destination}
            </a>
          </div>
          <div>
            <h1 className='mt-3 break-words text-4xl font-bold capitalize'>
              {pinDetails.title}
            </h1>
            <p className='mt-3'> {pinDetails.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetails.postedBy?._id}`}
            className='mt-5 flex items-center gap-2 rounded-lg bg-white'
          >
            <img
              src={pinDetails.postedBy?.image}
              alt='user-profile'
              className='h-8 w-8 rounded-full object-cover'
            />
            <p className='font-semibold capitalize'>
              {pinDetails.postedBy?.userName}
            </p>
          </Link>
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div>
            {pinDetails?.comments?.map((comment, i) => (
              <div
                className='mt-5 flex items-center gap-2 rounded-lg bg-white'
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt='user-profile'
                  className='h-10 w-10 cursor-pointer rounded-full'
                />
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment.postedBy?.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Link to={`user-profile/${pinDetails.postedBy?._id}`}>
              <img
                src={pinDetails.postedBy?.image}
                alt='user-profile'
                className=' h-10 w-10 rounded-full bg-red-500 object-cover'
              />
            </Link>
            <input
              type='text'
              placeholder='Add a comment'
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              className='flex-1 rounded-2xl border-2 border-gray-100 p-2 outline-none focus:border-gray-300'
            />
            <button
              type='button'
              className='rounded-full bg-red-500 px-6 py-2 text-base font-semibold text-white outline-none'
              onClick={addComment}
            >
              {addingComment ? 'Posting the comment... ' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins?.lenght > 0 && <></>}
      {pins ? (
        <>
          <h2 className='mt-8 mb-4 text-center text-2xl font-bold'>
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner massage='Loading more pins' />
      )}
    </>
  );
};

export default PinDetail;
