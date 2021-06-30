import { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './headers/header';
const Profile = props => {
  const [curUser,setCurUser] = useState({});

  useEffect(() => {
    if(props.users && Object.keys(props.users).length > 0)
    {
      setCurUser({...props.users});
    }
  },[props.users])
    return (
      <div>    
       {curUser ?
        <div>
        <Header />
        <p>Hello User</p>
        <button>Logout</button>
     {curUser && curUser.user ?    <p>{curUser.user.name}</p> : alert('User not logged in')}
        </div> : ''}
      </div>
    );
  
}

const mapStateToProps = function(state) {
  return {
    users: state.userData.users,
  }
}
export default connect(mapStateToProps)(Profile);
