import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Outlet, Link as ReachLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RouterName from '../const/RouterName';
import { logoutUser } from 'redux/user/operations';
import { getUser } from '../redux/user/selectors';

export default function Layout() {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const logout = () => {
    dispatch(logoutUser());
  };

  const LogOut = () => {
    return <Button onClick={logout}>Log out</Button>;
  };
  return (
    <Flex flexDirection="column" w="100%">
      <Flex
        justifyContent="flex-end"
        w="100%"
        py="5"
        px="5"
        backgroundColor="teal.300"
      >
        {!userData.isAuth ? (
          <>
            <Button as={ReachLink} to={RouterName.LOGIN} mr="4">
              Log in
            </Button>
            <Button as={ReachLink} to={RouterName.REGISTRATION}>
              Sign in
            </Button>
          </>
        ) : (
          <Flex alignItems="center">
            <Heading as="h3" size="md" mr="3">
              {userData.name}
            </Heading>
            <LogOut />
          </Flex>
        )}
      </Flex>
      <Box maxHeight="calc(100% - 144px)" height="100%" overflow="auto">
        <Outlet />
      </Box>

      <Flex justifyContent="center" py="5" backgroundColor="teal.500">
        Made by ANGELINA 🐧💖
      </Flex>
    </Flex>
  );
}
