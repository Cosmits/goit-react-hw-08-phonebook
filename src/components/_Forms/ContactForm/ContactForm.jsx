import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import { Button, Form, Label, InputForm } from './ContactForm.styled';
import { useSelector } from 'react-redux';
import { selectContacts, selectToken } from 'redux/selectors';
import { Button, FormControl, Icon, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { FiUser, FiPhone, FiUserPlus } from "react-icons/fi";
import { useAddContactMutation, useEditContactMutation } from 'redux/rtkAPI/contactsApi';
// import { addContactSlice } from 'redux/contactsSlice';

export default function ContactForm({ onClose, editContact }) {

  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [number, setNumber] = useState('');
  const formReset = () => {
    setName('');
    setNumber('');
    setID('');
  };

  const token = useSelector(selectToken);
  const contacts = useSelector(selectContacts);

  const [addContactRequest,] = useAddContactMutation();
  const [editContactRequest,] = useEditContactMutation();
  //================================================================

  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setNumber(editContact.number);
      setID(editContact.id);
    }


  }, [editContact]);

  //================================================================
  const handleChangeName = event => {
    setName(event.currentTarget.value);
  };

  const handleChangeNumber = event => {
    setNumber(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // edit
    if (editContact) {
      const editUser = {
        id: id,
        name,
        number,
      }
      editContactRequest({ token, editUser });
      formReset();
      onClose();

    // add contact
    } else {
      const filterTrue = contacts.some(contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
        || contact.number.toLowerCase().trim() === number.toLowerCase().trim());

      if (filterTrue) {
        alert(`${name}: ${number} is duplicate contact or number`)
      } else {
        addContactRequest({ token, newUser: { name, number } })
        formReset();
        onClose();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      <Stack spacing={4} mt={8}>

        <FormControl isRequired >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FiUser} mr={'8px'} />
            </InputLeftElement>
            <Input type="text" name="fullName" placeholder='Enter full name'
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              onChange={handleChangeName}
              value={name}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FiPhone} mr={'8px'} />
            </InputLeftElement>
            <Input type="tel" name="number" placeholder='Enter phone number'
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              onChange={handleChangeNumber}
              value={number}
            />
          </InputGroup>
        </FormControl>
        {id ? (<Button type='submit'><Icon as={FiUserPlus} mr={'8px'} />Edit contact</Button>)
          : (<Button type='submit'><Icon as={FiUserPlus} mr={'8px'} />Add contact</Button>)}

      </Stack>

    </form>

  );
}


ContactForm.propTypes = {
  onClose: PropTypes.func,
  editContact: PropTypes.any,
}