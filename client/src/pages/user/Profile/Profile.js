import React from 'react'
import { useSelector } from 'react-redux';
import PageTitle from '../../../components/PageTitle';

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
        <PageTitle title="My Profile" />
        <div className="divider"></div>
        <h2>- {user.name}</h2>
        <h2>- {user.email}</h2>
        <div className="divider"></div>
    </div>
  )
}

export default Profile
