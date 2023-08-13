// import Section from "./Section";
// import ContactForm from './ContactForm';
// import FilterInput from './FilterInput/FilterInput';
// import ContactsList from './ContactsList/ContactsList';
// import { selectContacts } from "redux/selectors";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getAllContacts } from "redux/thunk";

import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));
const Contacts = lazy(() => import("pages/Contacts"));

export default function App() {

  // const contacts = useSelector(selectContacts);
  // const dispatch = useDispatch();

  // const [titleContacts, setTitleContacts] = useState('');

  // useEffect(() => {
  //   dispatch(getAllContacts());
  // }, [dispatch]);

  // useEffect(() => {
  //   let title = contacts?.length > 0 ? "Contacts" : "NO Contacts";
  //   setTitleContacts(title);

  // }, [contacts]);

  // return (
  //   <>
  //     <Section title="PhoneBook">
  //       <ContactForm />
  //     </Section>
  //     <Section title={titleContacts}>
  //       <FilterInput />
  //       <ContactsList />
  //     </Section>
  //   </>)


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );



}