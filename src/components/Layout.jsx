import { Box, Center, Flex, Link, Stack, Text } from "@chakra-ui/react";
import Loader from "components/Loader";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { selectRegistered } from "redux/selectors";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserMenu from "./_Menu/UserMenu";
import NoAuthMenu from "./_Menu/NoAuthMenu";

const Layout = () => {

  const registered = useSelector(selectRegistered)

  return (
    <Box>
      {/* header */}
      <Stack as='header' position={'relative'} direction={['column', 'column', 'row', 'row']}
        justifyContent={'space-between'}
        padding={'24px 32px'}>

        <Flex direction={['column', 'column', 'row', 'row']} gap={['12px', '12px', '32px', '32px']}>
          <Box><Link as={NavLink} to="/">Home</Link></Box>
          <Box><Link as={NavLink} to="/contacts">Contacts</Link></Box>
          {registered ? <UserMenu /> : <NoAuthMenu />}
  
        </Flex>
      </Stack>

      {/* main */}
      <Center>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Center>

      {/* footer */}
      <Box as="footer" position="fixed" bottom={0} width={`100%`}>
        <Flex justifyContent="center" padding={'24px 32px'}        >
          <Text>All Rights Reserved || <Link href="https://github.com/Cosmits" target="_blank" rel="noreferrer">Developed by Samofal H.</Link >
            &#169; 2023</Text>
        </Flex>
      </Box>
      <ToastContainer
        theme="dark" />
    </Box>
  )
}

export default Layout;