import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
const Spinner = ({ massage }) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center '>
      <InfinitySpin
        height='50'
        width='200'
        color='#EF4444'
        ariaLabel='bars-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
      <p className='px-2 text-center text-lg '>{massage}</p>
    </div>
  );
};

export default Spinner;
