import React from 'react';
import { Navigate } from 'react-router-dom';
import RouterName from '../const/RouterName';

export default function ProtectedRouter({ children, redirectTo, isProtect }) {
  const authBefore = localStorage.getItem('user');
  if (redirectTo) return <Navigate to={redirectTo} />;
  return (
    <>
      {isProtect ? (
        children
      ) : (
        <Navigate
          to={authBefore ? RouterName.LOGIN : RouterName.REGISTRATION}
        />
      )}
    </>
  );
}
