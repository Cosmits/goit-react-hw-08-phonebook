import { Box, Flex } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";

const NoAuthMenu = () => {
  return (
    <Box>
      <Flex direction={['column', 'row', 'row', 'row']} alignItems={'center'} gap={['12px', '12px', '32px', '32px']} >
        <Box><Link as={NavLink} to="/login">Log In</Link></Box>
        <Box><Link as={NavLink} to="/signup">Sign Up</Link></Box>
      </Flex>
    </Box>
  )
}

export default NoAuthMenu;