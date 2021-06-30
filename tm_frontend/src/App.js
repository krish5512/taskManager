import './App.css';
import { useState } from 'react';
import {  useHistory} from "react-router-dom";
import Header from './components/header';
import { connect, useDispatch } from 'react-redux';
import  getUsers  from './redux/actions/users';

const App = props => {
  const history = useHistory();
  const [signInDiv, setSignInDiv] = useState(false);
  const [signUpDiv, setSignUpDiv] = useState(false);
  const [screenData, setScreenData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
  });
  const dispatch = useDispatch();
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
    const req ={
      email , password
    }
    dispatch(
      getUsers(req)
    )
    history.push("/profile");
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
          <Header/>   
        <button className="button" onClick={() => handleSign('in')}> Sign In </button>{' '}
        <button className="button" onClick={() => handleSign('up')}> Sign Up </button>{' '}  
      {signInDiv && (
        <div>
          <div> Sign In </div>{' '}
          <br/>
          <div className="loginDiv">
          <label className="label">
            Email ID:{' '}
            </label>
            <input
              type="email"
              className="input"
              value={screenData.email}
              onChange={(e) => handleChange(e, 'email')}
            ></input>{' '}
          </div>{' '}
          <div>
          <label className="label">
            Password:{' '}
            </label>
            <input
              type="password"
              className="input"
              value={screenData.password}
              onChange={(e) => handleChange(e, 'password')}
            ></input>{' '}
         </div>{' '}
          <br />
          <button className="button" onClick={() => signIn()}> Log In </button>{' '}
        </div>
      )}{' '}
      {signUpDiv && (
        <div>
          <div> Sign Up </div>{' '}
          <br/>
          <div>
           <label className="label">Name:{' '}</label>
            <input
              type="name"
              className="input"
              value={screenData.name}
              onChange={(e) => handleChange(e, 'name')}
            ></input>{' '}
          </div>{' '}
          <div>
          <label className="label">
            Email ID:{' '}
            </label>
            <input
              type="email"
              className="input"
              value={screenData.email}
              onChange={(e) => handleChange(e, 'email')}
            ></input>{' '}
          </div>{' '}
          <div>
          <label className="label">
            Password:{' '}
            </label>
            <input
              type="password"
              className="input"
              value={screenData.password}
              onChange={(e) => handleChange(e, 'password')}
            ></input>{' '}
            </div>{' '}
            <div>
          <label className="label">
            Age:{' '}
            </label>
            <input
              type="age"
              className="input"
              value={screenData.age}
              onChange={(e) => handleChange(e, 'age')}
            ></input>{' '}
            </div>{' '}
          <br />
          <button className="button" onClick={signUp}> Create Account </button>{' '}
        </div>
      )}{' '}
      
     </div>
  );
};

const mapStateToProps = function(state) {
  return {
    users: state.userData.users,
  }
}
export default connect(mapStateToProps)(App);
