// import { StyledContainer } from 'components/App.styled'
import { Center } from '@chakra-ui/react';
import { RotatingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <Center>
        <RotatingLines
          strokeColor={'#3f51b5'}
          strokeWidth="5"
          animationDuration="0.75"
          width="196"
          visible={true}
        />
    </Center>
  )
}

export default Loader;