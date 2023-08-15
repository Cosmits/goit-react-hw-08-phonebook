import { Box, Button, useDisclosure } from '@chakra-ui/react';
import ContactsList from 'components/ContactsList';
import FilterInput from 'components/FilterInput';
import ModalWindow from 'components/ModalWindow';
import Section from 'components/Section'
import ContactForm from 'components/_Forms/ContactForm';

const Contacts = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Section title="Contacts PhoneBook">
      <FilterInput />
      <Box marginTop={4}><Button onClick={onOpen}>Add new contact</Button></Box>
      <ContactsList />

      
      <ModalWindow isOpen={isOpen} onClose={onClose} title={'Add new contact'}>
        <ContactForm onClose={onClose} />
      </ModalWindow>
    </Section>
  )
}

export default Contacts;
