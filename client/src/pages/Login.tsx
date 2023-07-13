import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import trpc from '../trpcClient';

function Login() {
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const passwordInput = document.getElementById("pass") as HTMLInputElement ;
    const emailInput = document.getElementById("email") as HTMLInputElement ;
    try{
      const user = await trpc.auth.login.query({ email: emailInput?.value, password: passwordInput?.value});
      if(user !== null){
        navigate(`/todo/${user?.id}`);
      }
    }
    catch(e){
      const node = document.createElement("p");
      const textnode = document.createTextNode("Account doesn't match");
      node.appendChild(textnode);
      document.getElementById('login-div')?.appendChild(node);
      console.log(e)
    }
  };

  return (
    <div className="App" id='login-div'>
      <form onSubmit={handleSubmit} method='POST'>
        <label>Email</label>
        <input type='text' id='email' name='email'/><br></br>
        <label>password</label>
        <input type='password' id='pass' name='pass'/><br></br>
        <input name="Submit"  type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default Login;
