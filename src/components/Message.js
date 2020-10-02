import React from 'react';

const Message = (props) => {
  return (
    <div className="ui error message">
      <div className="header">{props.header}</div>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
