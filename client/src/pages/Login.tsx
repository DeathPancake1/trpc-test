import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trpc from '../trpcClient';

function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    pass: ''
  });
  let node = <></>;
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };  

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try{
      const user = await trpc.auth.login.query({ email: formState.email, password: formState.pass });
      navigate(`/todo/${user?.id}`);
    }
    catch(e){
      node = <h1>The email or password don't match</h1>;
      console.log(e);
    }
  };

  return (
    <div className="App" id='login-div'>
      <form onSubmit={handleSubmit} method='POST'>
        <label>Email</label>
        <input type='text' id='email' name='email' value={formState.email} onChange={handleChange} /><br></br>
        <label>Password</label>
        <input type='password' id='pass' name='pass' value={formState.pass} onChange={handleChange}/><br></br>
        <input name="Submit"  type="submit" value="Login"/>
        { node }
      </form>
    </div>
  );
}

export default Login;
