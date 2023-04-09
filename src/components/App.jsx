import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Contacts from "../views/Contacts";
import LogIn from "../views/LogIn";
import Registration from "../views/Registration";
import ProtectedRouter from "../hoc/ProtectedRouter";
import RouterName from "../const/RouterName";
import { Box } from "@chakra-ui/react";

import Loader from "./Loader/Loader";
import { currentUser } from "redux/userSlice";

const App = () => {
  const userData = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) dispatch(currentUser(token));
    };
    checkToken();
  }, [dispatch]);

  if (userData.loader)
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Loader />
      </Box>
    );
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
              <ProtectedRouter isProtect={userData.isAuth}>
                <Contacts />
              </ProtectedRouter>
            }
          />
          <Route
            path={RouterName.LOGIN}
            element={
              <ProtectedRouter
                redirectTo={userData.isAuth ? RouterName.CONTACTS : null}
                isProtect={!userData.isAuth}
              >
                <LogIn />
              </ProtectedRouter>
            }
          />
          <Route
            path={RouterName.REGISTRATION}
            element={
              <ProtectedRouter
                redirectTo={userData.isAuth ? RouterName.CONTACTS : null}
                isProtect={!userData.isAuth}
              >
                <Registration />
              </ProtectedRouter>
            }
          />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
