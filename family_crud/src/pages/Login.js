import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');

  
    const register = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:5000/register", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.message) {
            setRegisterStatus(response.data.message);
          } else {
            setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
          }
        });
    };
  
    const login = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:5000/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            setLoginStatus(response.data.message[0].username);
          }
        });
    };
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f2f2f2",
          }}
        >
          <form
            style={{
              backgroundColor: "white",
              padding: "70px",
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 #ccc",
            }}>
          <h4 style={{ margin: '0 0 20px 0' }}>Login Here</h4>
          <label htmlFor='username' style={{ display: 'block', margin: '10px 0' }}>Username</label>
          <input
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
            type='text'
            name='username'
            placeholder='Enter Username'
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='password' style={{ display: 'block', margin: '10px 0' }}>Password</label>
          <input
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
            type='password'
            name='password'
            placeholder='Enter Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            style={{
              display: 'block',
            
                  width: '100%',
                  padding: '10px',
                  margin: '20px 0',
                  backgroundColor: '#333',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                type='submit'
                onClick={login}
                value='Login'
              />
         <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{loginStatus}</h1>


         </form>
            <div className='registerform'>
                <form>
                    <h4 style={{textAlign: 'center'}}>Create an Account</h4>
                    <label htmlFor='username' style={{marginTop: '10px'}}>Username</label>
                    <input 
                        className="textInput" 
                        type="text" 
                        name="username" 
                        placeholder="Enter Username" 
                        required 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <label htmlFor='password' style={{marginTop: '10px'}}>Password</label>
                    <input 
                        className="textInput" 
                        type="password" 
                        name="password" 
                        placeholder="Enter Password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <label htmlFor='confirmPassword' style={{marginTop: '10px'}}>Confirm Password</label>
                    <input 
                        className="textInput" 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password" 
                        required 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <input 
                        className="button" 
                        type="submit" 
                        value="Sign Up"
                        style={{marginTop: '10px'}}
                    />
                    <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
                </form>
            </div>

        </div>
    
          
        );
      };
      
      export default Login;
