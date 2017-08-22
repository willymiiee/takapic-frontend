import React from 'react';

function photoProfile(props) {
  return (
    <div style={{width: '100%', textAlign: 'center'}}>
      <img alt="Profile" src={props.src} className="img-circle"
        style={{width: props.size, height: props.size, marginLeft:'auto', marginRight: 'auto'}} />
      {props.name && <h3>{props.name}</h3>}
      {props.motto && <p>{props.motto}</p>}
    </div>
  )
}

export default photoProfile;