import React from 'react';

const LoadingSpinner = (props) => {
  return (
    <div className="ui active dimmer" style={{ position: 'fixed' }}>
      <div className="ui big text loader">{props.message}</div>
    </div>
  );
};

LoadingSpinner.defaultProps = {
  message: 'Loading...',
};

export default LoadingSpinner;
