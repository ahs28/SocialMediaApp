import classes from './User.module.css';
import React from 'react';
import openSocket from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import UserContext from '../../store/UserContext';
import Avatar from '@mui/material/Avatar';

// import { db } from '../../store/firebase-config';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
const socket = openSocket('http://192.168.1.241:8000');
const User = props => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const imgPath = 'http://192.168.1.241:8000';
  const [users, setUsers] = useState([]);

  useEffect(() => {
    postData();
  }, []);

  const postData = async () => {
    const response = await fetch(
      'http://192.168.1.241:8000/api/getallUser?isOnline=true',
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`, // notice the Bearer before your token
        },
        body: JSON.stringify(),
      }
    );

    const actualData = await response.json();

    setUsers(actualData.data);

    socket.on('isOnline', data => {
      if (data.action === 'check') {
        setUsers(data.data);
      }
    });
  };
  window.onload = async () => {
    navigate('/home/feed');
    // await fetch('http://192.168.1.241:8000/api/logout', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${authCtx.token}`,
    //   },
    //   body: JSON.stringify(),
    // });
    // authCtx.logout();
  };
  const handleReciver = async user => {
    userCtx.setReceiver(user);
    const values = { senderid: userCtx.userData._id, receiverid: user._id };
    const response = await fetch(
      'http://192.168.1.241:8000/api/message/getmsg',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );
    const actualData = await response.json();

    props.getSavedData(actualData);
  };

  // const getUserData = user => {
  //   console.log(user);
  //   // navigate('/home/messagebox', {
  //   //   state: { user },
  //   // });
  // };
  return (
    <div>
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>Online Users</div>
      <div style={{ fontSize: '1rem' }} className={classes.containerDiv}>
        {users
          ? users.map(user => {
              if (user._id !== userCtx.userData._id) {
                return (
                  <div key={user._id}>
                    {user.isOnline ? (
                      <div
                        className={classes.usersProfile}
                        onClick={() => handleReciver(user)}
                      >
                        <span style={{ display: 'block', padding: '1rem' }}>
                          <Avatar
                            alt="Profile"
                            src={imgPath + user.image}
                            sx={{ width: 50, height: 50 }}
                          />
                        </span>
                        <span>{user.name}</span>
                        <span>
                          {<CheckCircleTwoToneIcon style={{ fill: 'green' }} />}
                        </span>
                      </div>
                    ) : null}
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
};
export default User;
