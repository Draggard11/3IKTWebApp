import { useState } from 'react';
import { registerUser, loginUser } from '../services/user';
import { useState } from 'react';
import { registerUser, loginUser } from '../services/user';
import '../styles/Login.css';
import { useUsername } from '../components/UserContext';
import { useNavigate } from 'react-router';

function Login() {
  const [login, setLogin] = useState<boolean>(true);
  const { refreshUser } = useUsername(); // ✅ called at top level of component
  const navigate = useNavigate();

  async function sign(formData: any) {
  async function sign(formData: any) {
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      alert("please enter a valid username and password");
      alert("please enter a valid username and password");
      return;
    }

    if (login) {
      loginUser(username, password).then(() => {
        refreshUser(); // ✅ update username in navbar after login
        navigate('/');
        alert(`Welcome back, ${username}`);
      }, (reason) => {
        alert(`Failed login, ${reason}`);
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
      <h1 id='heading'>Đăng nhập</h1>
      <button id='account' onClick={() => setLogin(!login)}>
        {!login ? 'Already have an account? Sign in' : `Don't have an account? Sign up`}
      </button>
      <form action={sign} id="login-or-register">
        <label>Username: </label>
        <input type='text' name="username" />
        <br /><br />
        <label>Password: </label>
        <input type='password' name="password" />
        <br /><br />
        <label>Last time traveled to Vietnam: </label>
        <input type='datetime-local' name="traveledToVietnam" />
        <br /><br />
        <button type="submit">{login ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
  return (
    <div id="container">
      <h1 id='heading'>Đăng nhập</h1>
      <button id='account' onClick={() => setLogin(!login)}>
        {!login ? 'Already have an account? Sign in' : `Don't have an account? Sign up`}
      </button>
      <form action={sign} id="login-or-register">
        <label>Username: </label>
        <input type='text' name="username" />
        <br /><br />
        <label>Password: </label>
        <input type='password' name="password" />
        <br /><br />
        <label>Last time traveled to Vietnam: </label>
        <input type='datetime-local' name="traveledToVietnam" />
        <br /><br />
        <button type="submit">{login ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
}

export default Login;

export default Login;