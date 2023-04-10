import Contact from 'components/Contact/Contact';
import PropTypes from 'prop-types';
import { getFilterSelector } from 'redux/contacts/selectors';
import { useSelector } from 'react-redux';
import { Box, List } from '@chakra-ui/react';

const ContactList = () => {
  const visibleContacts = useSelector(getFilterSelector);
  return (
    <Box>
      <List>
        {visibleContacts.map(contact => {
          return <Contact contact={contact} key={contact.name} />;
        })}
      </List>
    </Box>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
};

export default ContactList;
