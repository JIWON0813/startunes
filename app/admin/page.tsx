"use client"; // this is a client component 👈🏽

import SignInPage from './signIn';
import SongsPage from './songs';

export default function Admin() {

  return(
    <>
     {'asd'.length > 0 ? (
      <SignInPage  />
    ) : (
      <SongsPage  />
    )}
    </>
  ) ;
};
