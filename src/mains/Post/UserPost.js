import { useState, useEffect, useContext } from 'react';

import AuthContext from '../../store/AuthContext';

import Display from './Display';
import { socket } from '../../components/Socket';
const UserPost = props => {
  // const postCollectionRef = collection(db, 'post');
  // const [displayPost, setDisplayPost] = useState([]);
  const authCtx = useContext(AuthContext);

  const [post, setPost] = useState([]);

  const loadData = async () => {
    const response = await fetch('http://192.168.1.241:8000/api/getUserPost', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`, // notice the Bearer before your token
      },
      body: JSON.stringify(),
    });
    const actualData = await response.json();

    setPost(actualData.posts);

    socket.on('posts', data => {
      if (data.action === 'create') {
        setPost(prevData => {
          return [...prevData, data.data];
        });
      }
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  return <Display post={post} setPost={setPost} />;
};
export default UserPost;
