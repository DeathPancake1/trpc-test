import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trpc from '../trpcClient';
import { useMutation } from 'react-query';

function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  let state = <></>;
  const loginMutation = useMutation((formData: {email: string, password: string}) => trpc.auth.login.query({email: formData.email, password: formData.password}), {
    onSuccess: (user) => {
      if (user !== undefined) {
        navigate(`/todo/${user?.id}`);
      }else{
        state = <h1>Wrong credintials</h1>;
      }
    }
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ email: formState.email, password: formState.password });
  };

  return (
    <div className="App" id='login-div'>
      <form onSubmit={handleSubmit} method='POST'>
        <label>Email</label>
        <input type='text' id='email' name='email' value={formState.email} onChange={handleChange} /><br></br>
        <label>Password</label>
        <input type='password' id='pass' name='password' value={formState.password} onChange={handleChange} /><br></br>
        <input name="Submit" type="submit" value="Login" />
        {loginMutation.isLoading && <div>Loading...</div>}
        {loginMutation.isError && <div>Error</div>}
        {state}
      </form>
    </div>
  );
}

export default Login;
