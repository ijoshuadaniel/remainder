import React from 'react';
import './index.scss';

const Error = ({ error, retry }) => {
  if (!error.error) return null;
  return (
    <div className='error'>
      <div className='error-box'>
        <p>{error.message}</p>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Error;
