import './App.css';
import { useState } from 'react';
import Profile from './components/profile';

const App = () => {
  const [signInDiv, setSignInDiv] = useState(false);
  const [signUpDiv, setSignUpDiv] = useState(false);
  const [screenData, setScreenData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
  });
  const handleSign = (e) => {
    if (e === 'in') {
      setSignInDiv(true);
      setSignUpDiv(false);
    } else {
      setSignInDiv(false);
      setSignUpDiv(true);
    }
  };
  const handleChange = (e, type) => {
    let screenVal = {};
    switch (type) {
      case 'email':
        screenVal = {
          ...screenData,
          email: e.target.value,
        };
        break;
      case 'name':
        screenVal = {
          ...screenData,
          name: e.target.value,
        };
        break;
      case 'password':
        screenVal = {
          ...screenData,
          password: e.target.value,
        };
        break;
      case 'age':
        screenVal = {
          ...screenData,
          age: e.target.value,
        };
        break;
      default:
        screenVal = screenData;
    }
    setScreenData(screenVal);
  };
  const signIn = () => {
    console.log('Sign In Clicked');
    const { password, email } = screenData;
    console.log({
      password,
      email,
    });
  };

  const signUp = () => {
    console.log('Sign Up Clicked');
    const { password, email, age, name } = screenData;
    console.log({
      password,
      email,
      age,
      name,
    });
  };
  return (
    <div className="App">
    <div className="App-header">
      <h1> Task Manager App</h1>{' '}
      
      </div>
      <h5  className="subheader">
        Add your tasks at ease.{' '}
        <button className="button" onClick={() => handleSign('in')}> Sign In </button>{' '}
        <button className="button" onClick={() => handleSign('up')}> Sign Up </button>{' '}
      </h5>{' '}
      {signInDiv && (
        <div>
          <div> Sign In </div>{' '}
          <p>
            Email ID:{' '}
            <input
              type="email"
              value={screenData.email}
              onChange={(e) => handleChange(e, 'email')}
            ></input>{' '}
          </p>{' '}
          <p>
            Password:{' '}
            <input
              type="password"
              value={screenData.password}
              onChange={(e) => handleChange(e, 'password')}
            ></input>{' '}
          </p>{' '}
          <br />
          <button className="button" onClick={signIn}> Log In </button>{' '}
        </div>
      )}{' '}
      {signUpDiv && (
        <div>
          <div> Sign Up </div>{' '}
          <p>
            Name:{' '}
            <input
              type="name"
              value={screenData.name}
              onChange={(e) => handleChange(e, 'name')}
            ></input>{' '}
          </p>{' '}
          <p>
            Email ID:{' '}
            <input
              type="email"
              value={screenData.email}
              onChange={(e) => handleChange(e, 'email')}
            ></input>{' '}
          </p>{' '}
          <p>
            Password:{' '}
            <input
              type="password"
              value={screenData.password}
              onChange={(e) => handleChange(e, 'password')}
            ></input>{' '}
          </p>{' '}
          <p>
            Age:{' '}
            <input
              type="age"
              value={screenData.age}
              onChange={(e) => handleChange(e, 'age')}
            ></input>{' '}
          </p>{' '}
          <br />
          <button className="button" onClick={signUp}> Create Account </button>{' '}
        </div>
      )}{' '}
      <Profile />
    </div>
  );
};

export default App;
