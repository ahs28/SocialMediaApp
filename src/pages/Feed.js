import Post from '../mains/Post/Post';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../store/AuthContext';

const Feed = props => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState({});
  const loadData = async () => {
    const response = await fetch('http://192.168.1.241:8000/api/user', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`, // notice the Bearer before your token
      },
      body: JSON.stringify(),
    });
    const actualData = await response.json();
    setUser(actualData.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return <Post userData={user.name} />;
};
export default Feed;
