import { useState,useEffect } from 'react';
import Header from './headers/header';
import { useHistory} from "react-router-dom";
import logoutUsers from '../redux/actions/logout';
import { connect, useDispatch } from 'react-redux';

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
      <div>    
      <Header />
         <button className="button" onClick={() => signoutuser()}>Logout</button>
       {curUser ?
        <div className="userDiv">    
        <label className="label">Welcome User</label>
        <br/>
        {curUser && curUser.user ? <label className="label">Name :
         <p className="input">{curUser.user.name}</p></label> : ''}
         <br/>
        {curUser && curUser.user ? <label className="label">Email :
        <p className="input">{curUser.user.email}</p> </label> : ''}
        <br/>
        {curUser && curUser.user ? <label className="label">Age :
        <p className="input">{curUser.user.age}</p></label> : ''}
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
