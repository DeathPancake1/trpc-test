import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trpc from '../trpcClient';
import { useMutation } from 'react-query';

function Register() {
  const navigate = useNavigate();
  const [ formState, setFormState ] = useState({
    username: '',
    email: '',
    password: ''
  });

  const registerMutation = useMutation((formData: {username: string, email: string, password: string}) => trpc.auth.register.mutate({username:formData.username, email: formData.email, password: formData.password}), {
    onSuccess: () => {
      navigate(`/login`);
    }
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
    registerMutation.mutate({username: formState.username, email: formState.email, password: formState.password});
  };

  return (
    <div className="App" id='register-div'>
      <form onSubmit={handleSubmit} method='POST'>
        <label>username</label>
        <input type='text' id='username' name='username' value={formState.username} onChange={handleChange}/><br></br>
        <label>email</label>
        <input type='text' id='email' name='email' value={formState.email} onChange={handleChange}/><br></br>
        <label>password</label>
        <input type='password' id='password' name='password' value={formState.password} onChange={handleChange}/><br></br>
        <input name="Submit"  type="submit" value="Register"/>
        {registerMutation.isLoading && <div>Loading...</div>}
        {registerMutation.isError && <div>Error</div>}
      </form>
    </div>
  );
}

export default Register;
