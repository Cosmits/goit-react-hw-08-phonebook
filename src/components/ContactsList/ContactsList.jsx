import { Box } from '@chakra-ui/react';
import { List } from './ContactsList.styled';
import ContactsItem from 'components/ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllContactsQuery } from 'redux/rtkAPI/contactsApi';
import { selectToken } from 'redux/selectors';
import Loader from 'components/Loader';
import { useEffect } from 'react';
import { setContactSlice } from 'redux/contactsSlice';


const ContactsList = () => {

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { data: contacts, isSuccess, isFetching, isError } = useGetAllContactsQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setContactSlice(contacts));
    }

    if (isError) {
      // dispatch(setUserSlice(defUser));
      alert('Please enter a valid email or password');
    }
  }, [contacts, dispatch, isError, isSuccess]);

  return (
    <Box>
      {isFetching && <Loader />}
      <List>
        {contacts && contacts.map(({ name, number, id }) => (
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