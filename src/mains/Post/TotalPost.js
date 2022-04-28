import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
// import { storage } from '../store/firebase-config';

// import { ref } from 'firebase/storage';

const TotalPost = props => {
  const authCtx = useContext(AuthContext);

  let count = 0;
  const [post, setPost] = useState({
    name: '',
  });
  const loadData = async () => {
    const response = await fetch('http://192.168.1.241:8000/api/post', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`, // notice the Bearer before your token
      },
      body: JSON.stringify(),
    });
    const actualData = await response.json();

    setPost(actualData.posts);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {post.length
        ? post.map(item => {
            if (item.creator.name === props.userData) {
              count = count + 1;
            }
          })
        : null}
      {count}
    </>
  );
};
export default TotalPost;
