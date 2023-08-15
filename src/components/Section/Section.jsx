import { Container, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => {
  return (
    <Container
      maxWidth={['sm', 'md', 'lg', 'xl', '2xl']}
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      transform='translate(-50%, -50%)'
      paddingTop={'40px'}
      paddingBottom={'40px'}
      sx={{
        backgroundColor:  'hsla(0, 0%, 10%, 0.5)',
        backdropFilter: 'blur(8px)',
        border: '2px solid',
        borderRadius: '1rem',
      }}
    >
      <Heading pl={8}>{title}</Heading>
      {children}
    </Container>
  )
};

Section.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
}

export default Section;