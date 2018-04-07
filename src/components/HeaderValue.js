import React from 'react';

const HeaderValue = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <div style={viewStyle}>
      <span style={textStyle}>{props.label}: </span>
      <span style={textStyle}>{props.value}</span>
    </div>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 14
  }
};

export default HeaderValue;
