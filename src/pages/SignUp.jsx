import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectRegistered } from 'redux/selectors';

import Section from 'components/Section'
import SignUpForm from 'components/_Forms/SignUpForm';

const SignUp = () => {

  const registered = useSelector(selectRegistered)
  if (registered) return <Navigate to='/contacts' />
  return (
    <Section title="SignUp PhoneBook">
      <SignUpForm />
    </Section>
  )
}

export default SignUp;