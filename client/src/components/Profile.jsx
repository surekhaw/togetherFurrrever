import React from 'react';

const Profile = props => (
  <div>
    <div><img src={ props.profile.imageURL } /></div>
    <h3>{ props.profile.userName }</h3>
    <div>{ props.profile.email }</div>
    <div>pet: { props.profile.petBreed }</div>
    <div>attributes: { props.profile.petAttributes }</div>
    <div>iq: { props.profile.petIQ }</div>
  </div>
)
export default Profile;