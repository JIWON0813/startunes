"use client"; // this is a client component 👈🏽

import { useState } from 'react';
import ReactQueryClientProviders from '../config/ReactQueryClientProvider';
import SignInPage from './components/signIn';
import AdminHomePage from './home/page';
import AdminHomeLayout from './home/layout';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  return(
    <ReactQueryClientProviders>
     {isLoggedIn ? (
      <AdminHomeLayout>
        <AdminHomePage />
      </AdminHomeLayout>
    ) : (
      <SignInPage setLogin={setIsLoggedIn}/>
    )}
    </ReactQueryClientProviders>
  ) ;
};
