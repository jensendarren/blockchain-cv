import React from 'react';

const Experience = (props) => {
  const viewStyle = styles.viewStyle;

  return (
    <div style={viewStyle}>
      <span><b>{props.title}</b>: </span>
      <span>{props.location}</span>
      <hr/>
      <span>From: {props.from}</span>
    </div>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#f6ef5b',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    position: 'relative'
  }
};

export default Experience;
