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
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ModalWindow from 'components/ModalWindow';
import ContactForm from 'components/_Forms/ContactForm';

const ContactsItem = ({ id, name, number }) => {
  
  const token = useSelector(selectToken);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [deleteContact, { data, error, isError }] = useDelContactMutation();

  useEffect(() => {
    if (isError) toast.error(error);
    if (data) console.log(" data:", data)
  }, [data, error, isError])

  return (
    <ContactItem key={id}>
      <ContactName>
        {name}:<ContactNumber>{number}</ContactNumber>
      </ContactName>
      <Box>
        <Button onClick={() => onOpen()} mr={'8px'} mt={'2px'} mb={'2px'} > <Icon as={FiEdit} /></Button>
        <Button onClick={() => deleteContact({ token, id })} mr={'2px'} mt={'2px'} mb={'2px'}> <Icon as={FiTrash2} /></Button>
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