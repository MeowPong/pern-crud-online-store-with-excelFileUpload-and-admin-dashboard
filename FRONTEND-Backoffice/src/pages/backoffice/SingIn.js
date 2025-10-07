import axios from "axios";
import { useState } from 'react';
import Swal from 'sweetalert2';
import config from '../../config'
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await axios.post(config.apiPath + '/user/signIn', user);

      if (res.data.token !== undefined) {
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      }
    } catch (e) {
      if (e.response.status === 401) {
        Swal.fire({
          title: 'Sign In',
          text: 'Invalid username or password',
          icon: 'warning'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: e.message,
          icon: 'error'
        });
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
        <h1 className="card-title text-center my-4 fs-2">Sign In</h1>
        <div className="card-body">
          
          
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              id="username"
              className="form-control" 
              type="text" 
              placeholder="Enter your username" 
              onChange={e => setUser({ ...user, user: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              id="password"
              className="form-control" 
              type="password" 
              placeholder="Enter your password" 
              onChange={e => setUser({ ...user, pass: e.target.value })}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="form-check-label ms-2">Remember Me</label>
            </div>
            <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
          </div>

          <button className="btn btn-primary w-100" onClick={handleSignIn}>
            Sign In
          </button>

          <p className="mt-4 text-center">
            Don't have an account? <a href="/register" className="text-decoration-none">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
