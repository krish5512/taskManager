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
      <p>Hello User</p>
         <button onClick={() => signoutuser()}>Logout</button>
       {curUser ?
        <div>    
     {curUser && curUser.user ? <p>Name : {curUser.user.name}</p> : ''}
     {curUser && curUser.user ? <p>Email : {curUser.user.email}</p> : ''}
     {curUser && curUser.user ? <p>Age : {curUser.user.age}</p> : ''}

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
