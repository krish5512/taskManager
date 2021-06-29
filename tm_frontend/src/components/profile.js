import { useState,useEffect } from 'react';

const Profile = (currentUser) => {
  const [curUser,setCurUser] = useState({});

  useEffect(() => {
    if(currentUser && Object.keys(currentUser).length > 0)
    {
      console.log('inside useEffcet',currentUser)
      setCurUser({...currentUser});
    }
  },[currentUser])
    return (
      <div>    
       {curUser ?
        <div>
        <p>Hello User</p>
        <p>{curUser.currentUser.name}</p>
        </div> : ''}
      </div>
    );
  
}

export default Profile;
