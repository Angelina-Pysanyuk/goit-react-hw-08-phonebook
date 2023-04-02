import React from 'react';
import { Puff } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Puff
      height="80"
      width="80"
      radius={1}
      color="rgb(87, 155, 177)"
      ariaLabel="puff-loading"
      wrapperStyle={{ justifyContent: 'center' }}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
