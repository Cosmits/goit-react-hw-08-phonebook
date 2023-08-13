// import Section from "./Section";
// import ContactForm from './ContactForm';
// import FilterInput from './FilterInput/FilterInput';
// import ContactsList from './ContactsList/ContactsList';
// import { selectContacts } from "redux/selectors";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getAllContacts } from "redux/thunk";

import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import { selectToken } from "redux/selectors";
import { useGetCurrentUserQuery } from "redux/auth/authApi";
import { defUser, setUserSlice } from "redux/userSlice";

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

  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  
  const { data, isError, isSuccess } = useGetCurrentUserQuery(token, {
    skip: !token,
  } );
  
  useEffect(() => {
    if (isSuccess) {
      
      const newData = {
        user: data,
        token,
        registered: true,
      }
      dispatch(setUserSlice(newData));
    }

    if (isError) {
      dispatch(setUserSlice(defUser));
      alert('Token invalid');
    }
  }, [data, dispatch, isSuccess, isError, token]);

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