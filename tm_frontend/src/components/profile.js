import { useState,useEffect } from 'react';

const Profile = (currentUser) => {
  const [curUser,setCurUser] = useState({});

  useEffect(() => {
    if(currentUser && Object.keys(currentUser).length > 0)
    {
      setCurUser(currentUser);
    }
  },[currentUser])
    return (
      <div>    
        <p>Hello User</p>
       {curUser ? <p>{curUser.name}</p> : ''}
       {
        console.log(curUser)
      }
      </div>
    );
  
}

export default Profile;
