import React, { FormEvent } from 'react';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8000/trpc',
    }),
  ],
});

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const passwordInput = document.getElementById("pass") as HTMLInputElement ;
  const emailInput = document.getElementById("email") as HTMLInputElement ;
  trpc.register.mutate({username: usernameInput?.value, email: emailInput?.value, password: passwordInput?.value});
};


function Register() {
  return (
    <div className="App">
      <form onSubmit={handleSubmit} method='POST'>
        <label>username</label>
        <input type='text' id='username' name='username' value="value"/><br></br>
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