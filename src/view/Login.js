import React, { useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login',{ email, password});
      const {message, token, user} = response.data;
      const { role } = user;
      alert(message);
      // console.log('API Response:', response.data);
      console.log('Token:', token);
      console.log('Role:', role);

      localStorage.setItem('token', token);

      if (role === 'commuter') {
        navigate('/');
      } else if (role === 'admin') {
        navigate('/Driver')
      } else {
        navigate('../unauthorized');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <form onSubmit={handleLogin}>

    <MDBRow>

      <MDBCol col='10' md='6'>
        <img src="http://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="" />
      </MDBCol>

      <MDBCol col='4' md='6'>


        <MDBInput wrapperClass='mb-5' 
          label='Email address' 
          id='email' 
          type='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          required  
        />
        <MDBInput wrapperClass='mb-5' 
          label='Password' 
          id='password' 
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          required  
        />


        <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4 w-100" size="lg" type="submit">Sign in</MDBBtn>
        {error && <p>{error}</p>}

        {/* <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0">OR</p>
        </div>

        <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
          <MDBIcon fab icon="facebook-f" className="mx-2"/>
          Continue with facebook
        </MDBBtn>

        <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
          <MDBIcon fab icon="twitter" className="mx-2"/>
          Continue with twitter
        </MDBBtn> */}

      </MDBCol>

    </MDBRow>
    </form>

  </MDBContainer>
  );
}

export default Login