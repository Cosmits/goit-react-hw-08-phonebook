import { Button, FormControl, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FiUser, FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "redux/rtkAPI/authApi";
import { defUser, setUserSlice } from "redux/userSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SignUpForm = () => {

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [loginForm, { data, isSuccess, isError }] = useSignUpMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const password1 = form.elements.password1.value;
    const password2 = form.elements.password2.value;

    if (password1 !== password2) return toast.error('Please retype a password');

    try {
      const newUser = {
        name: form.elements.fullName.value,
        email: form.elements.email.value,
        password: form.elements.password1.value,
      }
      await loginForm(newUser);

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
      toast.error('This email was registered');
    }
  }, [data, dispatch, isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      <Stack spacing={4} mt={8}>

        <FormControl isRequired >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FiUser} mr={'8px'} />
            </InputLeftElement>
            <Input type="text" name="fullName" placeholder='Full name' />
          </InputGroup>
        </FormControl>

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
              name="password1"
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

        <FormControl isRequired >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={FiLock} mr={'8px'} />
            </InputLeftElement>
            <Input
              name="password2"
              minLength='4'
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Repeat password'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button type='submit'><Icon as={FiLogIn} mr={'8px'} />Register new user</Button>

      </Stack>

    </form>
  )
}

export default SignUpForm;