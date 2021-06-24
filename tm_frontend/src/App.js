import './App.css';
import {
  useState
} from 'react';
import Profile from './components/profile'

function App() {

  const [signInDiv, setSignInDiv] = useState(false);
  const [signUpDiv, setSignUpDiv] = useState(false);
  const [screenData,setScreenData] = useState({
    email : '',password : '',name : '',age : ''
  });
  const handleSign = e => {
    if (e === 'in') {
      setSignInDiv(true);
      setSignUpDiv(false);
    } else {
      setSignInDiv(false);
      setSignUpDiv(true);
    }
  }

  const handleChange = (e,type) => {
    let screenVal = {};
    console.log(e,type)
    switch(type)
    {
      case 'email' : screenVal = {...screenData , email : e.target.value};
                      break;
      case 'name' : screenVal = {...screenData , name : e.target.value};
                      break;
      case 'password' : screenVal = {...screenData , password : e.target.value};
                       break;
      case 'age' : screenVal = {...screenData , age : e.target.value};
                        break;
      default : screenVal = screenData;
    }
    setScreenData(screenVal)

  }
  const signIn = () => {

  }

  return (
    <div className="App">     
    <h1>Task Manager</h1>
    <h5>Add your tasks for ease.</h5>    
  <button onClick={() => 
    handleSign('in')}>Sign In</button>
  <button onClick={() => 
    handleSign('up')}>Sign Up</button>
    {
      signInDiv && 
      <div>
      <div>Sign In</div>
      <p>Email ID : </p>
      <input type="email" value={screenData.email} onBlur={(e) => handleChange(e,'email')}></input>
      <p>Password : </p>
      <input type="password" value={screenData.password} onBlur={(e) => handleChange(e,'password')}></input>
      <button onClick={signIn}>Log In</button>
      </div>
    }
    {
      signUpDiv && 
      <div>
      <div>Sign Up</div>
      <p>Name : </p>
      <input type="name" value={screenData.name} onBlur={(e) => handleChange(e,'name')}></input>
      <p>Email ID :</p>
      <input type="email" value={screenData.email} onBlur={(e) => handleChange(e,'email')}></input>
      <p>Password : </p>
      <input type="password" value={screenData.password} onBlur={(e) => handleChange(e,'password')}></input>
      <p>Age : </p>
      <input type="age" value={screenData.age} onBlur={(e) => handleChange(e,'age')}></input>
      <button>Create my account</button>
      </div>
    }
    <Profile/>
    </div>
  );
}

export default App;