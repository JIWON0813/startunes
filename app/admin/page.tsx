"use client"; // this is a client component 👈🏽

import { useState } from 'react';
import ReactQueryClientProviders from '../config/ReactQueryClientProvider';
import SignInPage from './components/signIn';
import AdminHomePage from './home/page';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  return(
    <ReactQueryClientProviders>
     {isLoggedIn ? (
      <AdminHomePage  />
    ) : (
      <SignInPage setLogin={setIsLoggedIn}/>
    )}
    </ReactQueryClientProviders>
  ) ;
};
