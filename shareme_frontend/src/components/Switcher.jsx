import React, { useState } from 'react';
import useDarkSide from './useDarkSide';

function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div className=' flex w-16 flex-col items-center justify-center '>
        <input type='checkbox' onChange={toggleDarkMode} size={50} />
      </div>
    </>
  );
}

export default Switcher;
