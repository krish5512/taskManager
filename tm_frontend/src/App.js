import './App.css';
import {
  useState
} from 'react';


function App() {

  const [signInDiv, setSignInDiv] = useState(false);
  const [signUpDiv, setSignUpDiv] = useState(false);

  const handleSign = e => {
    if (e === 'in') {
      setSignInDiv(true);
      setSignUpDiv(false);
    } else {
      setSignInDiv(false);
      setSignUpDiv(true);
    }
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
      <p>Password : </p>
      <button>Log In</button>
      </div>
    }
    {
      signUpDiv && 
      <div>
      <div>Sign Up</div>
      <p>Name : </p>
      <p>Email ID :</p>
      <p>Password : </p>
      <p>Age : </p>
      <button>Create my account</button>
      </div>
    }
    </div>
  );
}

export default App;