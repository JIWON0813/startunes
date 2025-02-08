'use client'

import { createBrowserSupabaseClient } from "@/app/utils/supabase/client";
import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function SignInPage({setLogin} : any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const supabase = createBrowserSupabaseClient();
  const signInMutation = useMutation({
    mutationFn : async () =>{
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if(data.user != null){
        // localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
        setLogin(true)
      }

      if(error){
        alert('로그인 정보가 일치하지 않습니다.\n' + error.message)
      }
    }
  })

  return(
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        <span className="mr-2">email</span>
          <Input
          value={email}
          onChange={(e : any) => setEmail(e.target.value)}
          type="email"
          className="w-full rounded-sm" />
          <span className="mr-2">password</span>
          <Input
          value={password}
          onChange={(e : any) => setPassword(e.target.value)}
          type="password"
          className="w-full rounded-sm" />
          <Button
          onClick={() => {
            signInMutation.mutate();
          } }
          loading={signInMutation.isPending}
          color="light-blue"
          className="w-full text-md py-1 bg-black z-0" >
            로그인
          </Button>
        </div>
      </div>
  ) ;
};
