import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/contactSlice';
import { DeleteButton } from './Contact.styled';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const onRemoveClick = () => {
    dispatch(deleteContacts(contact.id));
  };

  return (
    <>
      {contact.name}: {contact.phone}
      <DeleteButton onClick={onRemoveClick} type="button">
        Delete
      </DeleteButton>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.object,
};

export default Contact;
