import { useState } from 'react';
import '../styles/Login.css';

function Login() {

  function sign(formData:any) {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {return;}
    alert(`${email} & ${password}`);
  }

  const [login, setLogin] = useState<boolean>(true);

    return (
      <div id="container">
        <h1 id='heading'>Đăng nhập</h1>
        <button id='account' onClick={() => setLogin(!login)}>{!login ? 'Already have an account? Sign in' : `Don't have an account? Sign up`}</button>
        <form action={sign} id="login-or-register">
          <label>Email: </label>
          <input type='email' name="email" />
          <br /><br />
          <label>Password: </label>
          <input type='password' name="password" />
          <br /><br />
          <label>Last date traveled to Vietnam: </label>
          <input type='datetime-local' name="traveledToVietnam" />
          <br /><br />
          <button type="submit">{login ? 'Login' : 'Register'}</button>
        </form>
      </div>
    )
}
export default Login