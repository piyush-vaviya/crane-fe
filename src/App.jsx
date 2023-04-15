import React, { useEffect } from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from './pages/LoginPage'
import MainLayout from './pages/MainLayout'
import SignUpPage from './pages/SignUpPage'
import PrivateRoute from './helper/PrivateRoute'
import PublicRoute from './helper/PublicRoute'
import ForgotPassword from './components/ForgotPassword'

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { themeStateSelector } from './redux/selectors/themeSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { LocalStorages } from './components/utils/common/localstorage'
import { themeActions } from './redux/features/themeSlice'

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

const withPrivacy = (component) => {
  return <PrivateRoute component={component} />
}

const withoutPrivacy = (component) => {
  return <PublicRoute component={component} />
}

function App() {
  const dispatch = useDispatch();
  const themeState = useSelector(themeStateSelector);


  const theme = LocalStorages.getTheme();

  useEffect(() => {
    dispatch(themeActions.setTheme({ theme: theme }));
  }, []);



  return (
    <div className='app-container' data-theme={theme ?? themeState.theme}>
      <BrowserRouter>
        <ToastContainer theme="colored" position="top-left" autoClose={2000} closeOnClick />
        <Routes>
          <Route path="/accounts/password/reset" element={withoutPrivacy(ForgotPassword)} />
          <Route path="/accounts/login" element={withoutPrivacy(LoginPage)} />
          <Route path="/accounts/emailSignup" element={withoutPrivacy(SignUpPage)} />
          <Route path="/home" element={withPrivacy(MainLayout)} />
          <Route path="*" element={withPrivacy(MainLayout)} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
