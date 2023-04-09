import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/contactSlice';
import ModalUpdate from '../Modal/ModalUpdate';
import {
  ListItem,
  Button,
  Box,
  Text,
  useDisclosure,
  ButtonGroup,
} from '@chakra-ui/react';

const Contact = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const onRemoveClick = () => {
    dispatch(deleteContacts(contact.id));
  };

  const Icon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        width="15"
        fill="teal"
      >
        <path d="M0 64C0 28.7 28.7 0 64 0H256c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm64 96v64c0 17.7 14.3 32 32 32H224c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 352a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm56-56a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm24 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM128 48c-8.8 0-16 7.2-16 16s7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H128z" />
      </svg>
    );
  };
  return (
    <>
      <ModalUpdate isOpen={isOpen} idContact={contact.id} onClose={onClose} />
      <ListItem
        w="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my="5"
      >
        <Box as="span" display="flex" alignItems="center">
          <Icon />
          <Text as="span" ml={3} color="gray.900">
            {contact.name}: {contact.number}
          </Text>
        </Box>
        <ButtonGroup>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={onOpen}
            type="button"
          >
            Update
          </Button>

          <Button
            colorScheme="orange"
            variant="outline"
            onClick={onRemoveClick}
            type="button"
          >
            Delete
          </Button>
        </ButtonGroup>
      </ListItem>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.object,
};

export default Contact;
