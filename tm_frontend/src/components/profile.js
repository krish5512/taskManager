import { useState,useEffect } from 'react';
import { connect } from 'react-redux';

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
        <p>Hello User</p>
        <p>{curUser.user.name}</p>
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
