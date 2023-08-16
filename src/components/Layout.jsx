import { Box, Center, Flex, HStack, Icon, Link, Stack, Switch, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Loader from "components/Loader";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { selectRegistered } from "redux/selectors";
import { FaMoon, FaSun } from 'react-icons/fa';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserMenu from "./_Menu/UserMenu";
import NoAuthMenu from "./_Menu/NoAuthMenu";

const Layout = () => {

  const registered = useSelector(selectRegistered);
  const chakraTheme = useColorModeValue('light','dark')
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      {/* header */}
      <Stack
        as={'header'}
        direction={['column', 'row', 'row', 'row']}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={'24px 32px'}>

        <Flex direction={['column', 'row', 'row', 'row']} gap={['12px', '12px', '32px', '32px']} justifyContent={'space-between'}>
          
          <HStack>
            <Icon as={FaSun} />
            <Switch
              isChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
              // colorScheme="teal"
            />
            <Icon as={FaMoon} />
          </HStack>
          <Center><Link as={NavLink} to="/">Home</Link></Center>
          {registered && <Center><Link as={NavLink} to="/contacts">Contacts</Link></Center>}
        </Flex>
        {registered ? <UserMenu /> : <NoAuthMenu />}
      </ Stack>

      {/* main */}
      <Center>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Center>

      {/* footer */}
      <Box as="footer" position="fixed" bottom={0} width={`100%`}>
        <Flex justifyContent="center" padding={'24px 32px'}        >
          <Text>All Rights Reserved || <Link textDecoration="underline" href="https://github.com/Cosmits" target="_blank" rel="noreferrer">Developed by Samofal H.</Link >
            &#169; 2023</Text>
        </Flex>
      </Box>
      <ToastContainer
        theme={chakraTheme} />
    </Box>
  )
}

export default Layout;