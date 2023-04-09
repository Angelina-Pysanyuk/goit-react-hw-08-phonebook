import ContactList from "components/ContactList/ContactList";
import { Container, Stack } from "@chakra-ui/react";
import Phonebook from "../components/Phonebook/Phonebook";
import Filter from "../components/Filter/Filter";
import Loader from "components/Loader/Loader";
import { useSelector } from "react-redux";

const Contacts = () => {
  const contacts = useSelector(({ contacts }) => contacts);
  return (
    <Container my="5">
      <Stack>
        <Phonebook />
      </Stack>
      <Stack>{contacts.items?.length > 1 && <Filter />}</Stack>
      <Stack>{contacts.isLoading ? <Loader /> : <ContactList />}</Stack>
    </Container>
  );
};

export default Contacts;
