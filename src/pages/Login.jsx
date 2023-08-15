import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectRegistered } from 'redux/selectors';

import LoginForm from 'components/_Forms/LoginForm';
import Section from 'components/Section'

const Login = () => {

  const registered = useSelector(selectRegistered)
  if (registered) return <Navigate to='/contacts' />

  return (
    <Section title="Login">
      <LoginForm />
    </Section>
  )
}

export default Login;