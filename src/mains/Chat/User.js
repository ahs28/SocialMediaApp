import classes from './User.module.css';
import React from 'react';
import { socket } from '../../components/Socket';
// import { useNavigate } from 'react-router-dom';
// import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import UserContext from '../../store/UserContext';

// import Avatar from '@mui/material/Avatar';

// import { db } from '../../store/firebase-config';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';

const User = props => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  // const navigate = useNavigate();
  const imgPath = 'http://192.168.1.241:8000';
  const [users, setUsers] = useState([]);

  useEffect(() => {
    postData();
  }, []);

  const postData = async () => {
    const response = await fetch('http://192.168.1.241:8000/api/getallUser', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`, // notice the Bearer before your token
      },
      body: JSON.stringify(),
    });

    const actualData = await response.json();

    setUsers(actualData.data);

    socket.on('isOnline', data => {
      console.log(data.data);
      setUsers(data.data);
    });
  };
  // window.onload = async () => {
  //   navigate('/home/feed');
  // await fetch('http://192.168.1.241:8000/api/logout', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${authCtx.token}`,
  //   },
  //   body: JSON.stringify(),
  // });
  // authCtx.logout();
  // };
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
    <div style={{ marginTop: '4rem ' }}>
      <div
        style={{ height: '45rem' }}
        className="h-screen w-full flex antialiased text-gray-800 bg-inherit overflow-hidden fixed "
      >
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <section className="flex flex-col flex-none overflow-auto w-100 hover:w-50 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
              <div className="search-box p-4 flex-none ">
                <form onSubmit="">
                  <div className="relative">
                    <label>
                      <input
                        className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-200 focus:border-gray-900 bg-gray-100 focus:bg-gray-100 focus:outline-none text-gray-800 focus:shadow-md transition duration-300 ease-in"
                        type="text"
                        placeholder="Search Messenger"
                      />
                      <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                          <path
                            fill="#bbb"
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                </form>
              </div>

              <div className="contacts p-2 flex-1 overflow-y-scroll">
                {users
                  ? users.map(user => {
                      if (user?._id !== userCtx.userData?._id) {
                        return (
                          <div
                            className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative hover:text-gray-800 "
                            onClick={() => handleReciver(user)}
                          >
                            <div className="w-16 h-16 relative flex flex-shrink-0  ">
                              <img
                                className="shadow-md rounded-full w-full h-full object-cover"
                                src={imgPath + user.image}
                                alt=""
                              />
                            </div>
                            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                              <p>{user.name}</p>
                              <div className="flex items-center text-sm text-gray-600">
                                <div className="min-w-0">
                                  <p className="truncate">
                                    Ok, see you at the subway in a bit.
                                  </p>
                                </div>
                                <p className="ml-2 whitespace-no-wrap">
                                  {user.isOnline === true
                                    ? 'Online'
                                    : 'Offline'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
export default User;
