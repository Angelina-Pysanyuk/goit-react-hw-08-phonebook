import Contact from 'components/Contact/Contact';
import PropTypes from 'prop-types';
import { StyledLi, StyledUl } from './ContactList.styled';
import { getFilterSelector } from 'redux/selectors';
import { useSelector } from 'react-redux';

const ContactList = () => {
  const visibleContacts = useSelector(getFilterSelector);

  return (
    <div>
      <StyledUl>
        {visibleContacts.map(contact => {
          return (
            <StyledLi key={contact.name}>
              <Contact contact={contact} />
            </StyledLi>
          );
        })}
      </StyledUl>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
};

export default ContactList;
