import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getLoadingStatus } from 'redux/selectors';
// import ContactList from './ContactList/ContactList';
// import Phonebook from './Phonebook/Phonebook';
// import Filter from './Filter/Filter';
// import Loader from './Loader/Loader';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Contacts from '../views/Contacts';
import LogIn from '../views/LogIn';
import Registration from '../views/Registration';
import ProtectedRouter from '../hoc/ProtectedRouter';
import RouterName from '../const/RouterName';
import { Box } from '@chakra-ui/react';

import Loader from './Loader/Loader';
import { currentUser } from 'redux/userSlice';

const App = () => {
  const isAuth = useSelector(({ user }) => user.isAuth);
  const loader = useSelector(({ loader }) => loader);
  console.log(loader);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) dispatch(currentUser(token));
    };
    checkToken();
  }, [dispatch]);

  if (loader) return <Loader />;
  return (
    <Box w="100%" h="100vh" display="flex">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="*"
            element={<ProtectedRouter redirectTo={RouterName.CONTACTS} />}
          />
          <Route
            path={RouterName.CONTACTS}
            element={
              <ProtectedRouter isProtect={isAuth}>
                <Contacts />
              </ProtectedRouter>
            }
          />
          <Route
            path={RouterName.LOGIN}
            element={
              <ProtectedRouter
                redirectTo={isAuth ? RouterName.CONTACTS : null}
                isProtect={!isAuth}
              >
                <LogIn />
              </ProtectedRouter>
            }
          />
          <Route
            path={RouterName.REGISTRATION}
            element={
              <ProtectedRouter
                redirectTo={isAuth ? RouterName.CONTACTS : null}
                isProtect={!isAuth}
              >
                <Registration />
              </ProtectedRouter>
            }
          />
        </Route>
      </Routes>
      {/* <h2>Phonebook</h2>
      <Phonebook />
      <Filter />
      <h2>Contacts</h2>
      {isLoading && <Loader />}
      <ContactList /> */}
    </Box>
  );
};

export default App;
