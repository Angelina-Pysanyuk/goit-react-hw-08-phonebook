import { useState } from "react";
import PropTypes from "prop-types";
import Notiflix from "notiflix";
import { addContacts, fetchContacts } from "redux/contactSlice";
import { useDispatch } from "react-redux";
import { getContacts } from "redux/selectors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Phonebook = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleInput = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
      default:
        console.log("not correct option");
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contact = {
      name,
      number: phone,
    };

    const isExist = contacts.find(
      (item) => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      Notiflix.Notify.info("This contact already exists");
      return;
    }

    dispatch(addContacts(contact));
    setName("");
    setPhone("");
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>
            <span>Name</span>
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              value={name}
              onChange={handleInput}
              required
            />
          </FormLabel>
        </FormControl>
        <FormControl>
          <FormLabel>
            <span>Number</span>
            <Input
              type="tel"
              name="phone"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              value={phone}
              onChange={handleInput}
              required
            />
          </FormLabel>
        </FormControl>
        <FormControl>
          <Button type="submit">Add contact</Button>
        </FormControl>
      </form>
    </Box>
  );
};

Phonebook.propTypes = {
  onAddContact: PropTypes.func,
  onRemoveContact: PropTypes.func,
};

export default Phonebook;
