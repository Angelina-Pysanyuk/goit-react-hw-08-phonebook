import Contact from 'components/Contact/Contact';
import { getFilterSelector } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';

const Contacts = () => {
  const visibleContacts = useSelector(getFilterSelector);

  return (
    <Box>
      <ul>
        {visibleContacts.map(contact => {
          return (
            <li key={contact.name}>
              <Contact contact={contact} />
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default Contacts;
