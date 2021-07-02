import { useState,useEffect } from 'react';
import Header from './headers/header';
import { useHistory} from "react-router-dom";
import logoutUsers from '../redux/actions/logout';
import { connect, useDispatch } from 'react-redux';
import '../App.css';

const Profile = props => {
  const history = useHistory();
  const [curUser,setCurUser] = useState({});
  const dispatch = useDispatch();
  const signoutuser = () => {
    console.log('Logout Clicked')
    dispatch(
      logoutUsers()
    );
    console.log('Logout successfull')
    history.push("/");
  }

  useEffect(() => {
    if(props.users && Object.keys(props.users).length > 0)
    {
      setCurUser({...props.users});
    }
  },[props.users])

    return (
      <div className="App">    
      <Header />
         <button className="button" onClick={() => signoutuser()}>Logout</button>
         <br/>
         <br/>
       {curUser ?
        <div className="userDiv">    
        <label className="text">Welcome User</label>
        <br/>
        {curUser && curUser.user ?
         <p className="text"> Name :{curUser.user.name}</p> : ''}
       
        {curUser && curUser.user ?
        <p className="text">Email :{curUser.user.email}</p> : ''}
        
        {curUser && curUser.user ? 
        <p className="text">Age :{curUser.user.age}</p> : ''}
        </div> : 'Loading....'}
      </div>
    );
  
}

const mapStateToProps = function(state) {
  return {
    users: state.userData.users,
  }
}
export default connect(mapStateToProps)(Profile);
