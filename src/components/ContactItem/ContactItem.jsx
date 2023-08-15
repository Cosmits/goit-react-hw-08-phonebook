import PropTypes from 'prop-types';

import {
  ContactItem,
  ContactName,
  ContactNumber,
} from './ContactItem.styled';
import { useDelContactMutation } from 'redux/rtkAPI/contactsApi';
import { useSelector } from 'react-redux';
import { selectToken } from 'redux/selectors';
import { useEffect } from 'react';
import { Box, Button, Icon, useDisclosure } from '@chakra-ui/react';
import { FiTrash2, FiEdit } from "react-icons/fi";
import ModalWindow from 'components/ModalWindow/ModalWindow';
import ContactForm from 'components/_Forms/ContactForm/ContactForm';

const ContactsItem = ({ id, name, number }) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = useSelector(selectToken);
  
  const [deleteContact, { data, error, isError }] = useDelContactMutation();
  // const [editContact, { data: EditData, error: EditError, isError: EditIsError }] = useEditContactMutation();

  const handleEditContact = (editUser) => {
    // setSelectedContact(contact);
    // editContact({ token, editUser })
    onOpen();
  };

  useEffect(() => {
    if (isError) alert(error);
    if (data) console.log(" data:", data)
  }, [data, error, isError])

  return (
    <ContactItem key={id}>
      <ContactName>
        {name}:<ContactNumber>{number}</ContactNumber>
      </ContactName>
      <Box>
        <Button onClick={() => handleEditContact({ id, name, number })} mr={'8px'} > <Icon as={FiEdit} /></Button>
        <Button onClick={() => deleteContact({ token, id })}> <Icon as={FiTrash2} /></Button>
      </Box>

      <ModalWindow isOpen={isOpen} onClose={onClose} title={'Edit contact'}>
        <ContactForm onClose={onClose} editContact={{id, name, number}} />
      </ModalWindow>
    </ContactItem>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactsItem