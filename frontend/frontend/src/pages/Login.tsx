import { useState } from 'react';
import {registerUser, loginUser} from '../services/api';
import '../styles/Login.css';

function Login() {

  function sign(formData:any) {
    const username = formData.get("username");
    const password = formData.get("password");
    if (!username || !password) {
      alert("please enter a valid username and password")
      return;
    }
    if (login) {
      loginUser(username, password);
    } else {
      registerUser(username, password)
      .then(() => {
        alert(`Registered: ${registerUser}`);
      })
      .catch((err) => {
        alert(`${err} :: ${registerUser}`);
      })
    }
  }

  const [login, setLogin] = useState<boolean>(true);

    return (
      <div id="container">
        <h1 id='heading'>Đăng nhập</h1>
        <button id='account' onClick={() => setLogin(!login)}>{!login ? 'Already have an account? Sign in' : `Don't have an account? Sign up`}</button>
        <form action={sign} id="login-or-register">
          <label>Username: </label>
          <input type='username' name="username" />
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
    )
}
export default Login