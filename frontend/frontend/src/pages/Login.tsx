import '../styles/Login.css';
import { useUsername } from '../components/UserContext';
import { useNavigate } from 'react-router';
import { loginUser, registerUser } from '../services/user';
import { useState } from 'react';

function Login() {
  const [login, setLogin] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>();
  const { refreshUser } = useUsername(); // ✅ called at top level of component
  const navigate = useNavigate();

  async function sign(formData: any) {

    setErrorMsg('');

    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      setErrorMsg('Please enter a valid username and password.')
      return;
    }

    if (login) {
      loginUser(username, password).then(() => {
        refreshUser(); // ✅ update username in navbar after login
        navigate('/');
        alert(`Welcome, ${username}`);
      }, (reason) => {
        setErrorMsg(`Failed login: ${reason}`);
      });
    } else {
      registerUser(username, password).then(() => {
        loginUser(username, password).then(() => {
          refreshUser(); // ✅ also refresh after register+login
          navigate('/');
          alert('Welcome back, ' + username);
        }, () => {
          alert('Registration successful, please log in');
        });
      }, (reason) => {
        alert(`Failed registration, ${reason}`);
      });
    }
  }

  return (
    <div id="container">
      <div id="login-or-register">
      <form action={sign} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <input className='loginInputs' type='text' name="username" placeholder='Username' />
        <input className='loginInputs' type='password' name="password" placeholder='Password'/>
        <button id='loginOrRegisterBtn' type="submit">{login ? 'Login' : 'Register'}</button>
      </form>
      <p style={{fontSize: 14, color: 'red'}}>{errorMsg}</p>
      </div>
      <div style={{margin: 8}} />
       <button id='account' onClick={() => setLogin(!login)}>
        {!login ? 'Already have an account? Sign in' : `Don't have an account? Sign up`}
      </button>
    </div>
  );
}

export default Login;