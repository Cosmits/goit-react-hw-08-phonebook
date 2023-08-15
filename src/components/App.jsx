import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Layout from "./Layout";
import { selectToken } from "redux/selectors";
import { useGetCurrentUserQuery } from "redux/rtkAPI/authApi";
import { defUser, setUserSlice } from "redux/userSlice";
import PrivateRoute from "./PrivateRoute";


const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));
const Contacts = lazy(() => import("pages/Contacts"));

export default function App() {

  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const { data, isError, isSuccess } = useGetCurrentUserQuery(token, {
    skip: !token,
  });

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
      toast.error('Token invalid');
      
    }
  }, [data, dispatch, isSuccess, isError, token]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/contacts' element={
          <PrivateRoute redirectTo='/login'>
            <Contacts />
          </PrivateRoute>} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );



}