import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Rules from '../const/Rules';
import { loginUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function LogIn() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    dispatch(loginUser(data));
  };

  return (
    <Box
      h="100%"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box maxW="400px" w="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...register('email', Rules.email)} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register('password', Rules.password)} />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit">Log in</Button>
        </form>
      </Box>
    </Box>
  );
}
