const Rules = {
  name: {
    required: 'Please enter your name',
    minLength: {
      value: 3,
      message: 'Name should consist of at least 3 letters',
    },
  },
  email: {
    required: 'Please enter your email',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter proper email',
    },
  },
  password: {
    required: 'Please enter your password',
    minLength: {
      value: 6,
      message: 'Passwod should consist of at least 8 symbols',
    },
    maxLength: {
      value: 15,
      message: 'Passwod should not consist of more than 15 symbols',
    },
  },
};

export default Rules;
