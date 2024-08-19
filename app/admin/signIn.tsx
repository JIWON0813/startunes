"use client";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

 // this is a client component 👈🏽

export default function SignInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return(
    <>
      <div>SignIn...</div>
      <Input 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      label="email"
      type="email"
      className="w-full rounded-sm"
      />
      <Input 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      label="password"
      type="password"
      className="w-full rounded-sm"
      />
      {/* <Button>
        onClick={() =>{
            console.log('asd')
        }}

      </Button> */}
    </>
  ) ;
};
