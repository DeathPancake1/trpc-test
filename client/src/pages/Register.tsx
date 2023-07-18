import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trpc from '../trpcClient';

function Register() {
  const navigate = useNavigate();
  let node = <></>;
  const [ formState, setFormState ] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      await trpc.auth.register.mutate({username: formState.username, email: formState.email, password: formState.password});
      navigate('/login');
    }
    catch(e){
      node = <h1>Wrong info</h1>
      console.log(e);
    }
    
  };

  return (
    <div className="App" id='register-div'>
      <form onSubmit={handleSubmit} method='POST'>
        <label>username</label>
        <input type='text' id='username' name='username' value={formState.username} onChange={handleChange}/><br></br>
        <label>email</label>
        <input type='text' id='email' name='email' value={formState.email} onChange={handleChange}/><br></br>
        <label>password</label>
        <input type='password' id='pass' name='pass' value={formState.password} onChange={handleChange}/><br></br>
        <input name="Submit"  type="submit" value="Register"/>
        { node }
      </form>
    </div>
  );
}

export default Register;
