import React from 'react';
import { Navigate } from 'react-router-dom';
import RouterName from '../const/RouterName';
import { getUser } from '../redux/user/selectors';
import { useSelector } from 'react-redux';

export default function ProtectedRouter({ children, redirectTo, isProtect }) {
  const userData = useSelector(getUser);
  if (redirectTo) return <Navigate to={redirectTo} />;
  return (
    <>
      {isProtect ? (
        children
      ) : (
        <Navigate
          to={userData.name ? RouterName.LOGIN : RouterName.REGISTRATION}
        />
      )}
    </>
  );
}
