import React, { FormEvent } from 'react';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server';
import { useNavigate } from 'react-router-dom';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000/trpc',
    }),
  ],
});


function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("pass") as HTMLInputElement ;
    const emailInput = document.getElementById("email") as HTMLInputElement ;
    try{
      await trpc.log.register.mutate({username: usernameInput?.value, email: emailInput?.value, password: passwordInput?.value});
      navigate('/login');
    }
    catch(e){
      const node = document.createElement("p");
      const textnode = document.createTextNode("The account is already used or information is incorrect");
      node.appendChild(textnode);
      document.getElementById('register-div')?.appendChild(node);
    }
    
  };

  return (
    <div className="App" id='register-div'>
      <form onSubmit={handleSubmit} method='POST'>
        <label>username</label>
        <input type='text' id='username' name='username'/><br></br>
        <label>email</label>
        <input type='text' id='email' name='email'/><br></br>
        <label>password</label>
        <input type='password' id='pass' name='pass'/><br></br>
        <input name="Submit"  type="submit" value="Register"/>
      </form>
    </div>
  );
}

export default Register;
