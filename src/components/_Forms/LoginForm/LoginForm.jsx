import {
  Button,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { defUser, setUserSlice } from "redux/userSlice";

import { useLoginMutation } from "redux/rtkAPI/authApi";


const LoginForm = () => {

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [loginForm, { data, isSuccess, isError }] = useLoginMutation();
  const dispatch = useDispatch();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      const logIn = {
        email: form.elements.email.value,
        password: form.elements.password.value,
      }
      await loginForm(logIn);

      // if (isSuccess) form.reset();
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    if (isSuccess) {
      const newData = {
        user: data.user,
        token: data.token,
        registered: true,
      }
      dispatch(setUserSlice(newData));
    }

    if (isError) {
      dispatch(setUserSlice(defUser));
      alert('Please enter a valid email or password');
    }
  }, [data, dispatch, isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      <Stack spacing={4} mt={8}>
        <FormControl isRequired >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FiMail} mr={'8px'} />
            </InputLeftElement>
            <Input type="email" name="email" placeholder='Enter e-mail...' />
          </InputGroup>
        </FormControl>

        <FormControl isRequired >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FiLock} mr={'8px'} />
            </InputLeftElement>
            <Input
              name="password"
              minLength='4'
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button type='submit'><Icon as={FiLogIn} mr={'8px'} />Log In</Button>

      </Stack>

    </form>
  )
}

export default LoginForm;