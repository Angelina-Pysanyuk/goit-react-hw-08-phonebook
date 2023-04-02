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
import { createUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export default function Registration() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    dispatch(createUser(data));
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
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" {...register('name', Rules.name)} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
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
          <Button type="submit">Sign Up</Button>
        </form>
      </Box>
    </Box>
  );
}
