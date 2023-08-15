import { Box, Text } from '@chakra-ui/react';
import { List } from './ContactsList.styled';
import ContactsItem from 'components/ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllContactsQuery } from 'redux/rtkAPI/contactsApi';
import { selectToken, selectVisibleContacts } from 'redux/selectors';
import Loader from 'components/Loader';
import { useEffect } from 'react';
import { setContactSlice } from 'redux/contactsSlice';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ContactsList = () => {

  const token = useSelector(selectToken);
  const filteredContacts = useSelector(selectVisibleContacts)
  
  const dispatch = useDispatch();
  
  const { data: contacts, isSuccess, isFetching, isError } = useGetAllContactsQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setContactSlice(contacts));
    }

    if (isError) {
      // dispatch(setUserSlice(defUser));
      toast.warn('Please enter a valid email or password');
    }
  }, [contacts, dispatch, isError, isSuccess]);

  return (
    <Box>
      {isFetching && <Loader />}
      <List>
        {filteredContacts.length === 0 && <Text>There are no contacts found!</Text>}
        {filteredContacts && filteredContacts.map(({ name, number, id }) => (
          <ContactsItem
            key={id}
            id={id}
            name={name}
            number={number}
          />
        ))}
      </List>
    </Box>
  );
};

export default ContactsList;