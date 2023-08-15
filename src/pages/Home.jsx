import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import Section from 'components/Section'

const Home = () => {
  return (
    <Section title="PhoneBook">
      <Box mt={'12px'}>
        <Text ml={8}>In PhoneBook  application used:</Text>
        <UnorderedList ml={'12px'}>
          <ListItem ml={'52px'}>React, React router</ListItem>
          <ListItem ml={'52px'}>Redux, Redux Toolkit, RTK Query</ListItem>
          <ListItem ml={'52px'}>Redux Persist</ListItem>
          <ListItem ml={'52px'}>Chakra UI</ListItem>
          <ListItem ml={'52px'}>React-toastify</ListItem>
        </UnorderedList>
      </Box>
    </Section>
  )
}
export default Home;