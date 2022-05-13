import { useState, useEffect, useContext } from 'react';

import { socket } from '../../components/Socket';
import AuthContext from '../../store/AuthContext';

import Display from './Display';

const Post = props => {
  // const postCollectionRef = collection(db, 'post');
  // const [displayPost, setDisplayPost] = useState([]);
  const authCtx = useContext(AuthContext);
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postCollectionRef);
  //     setDisplayPost(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getPosts();
  // }, []);
  const [post, setPost] = useState([]);

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
  useEffect(() => {
    socket.on('posts', data => {
      if (data.action === 'create') {
        setPost(prevData => {
          return [data.data, ...prevData];
        });
      }
    });
  }, [socket]);

  return (
    <Display post={post} setPost={setPost} />
    // <ImageList variant="masonry" style={{ marginTop: '5rem' }} cols={1}>
    //   <div className={classes.imageGallery}>
    //     {count
    //       ? post.map(item => {
    //           return (
    //             <ImageListItem
    //               key={item._id}
    //               className={classes.pics}
    //               // onClick={() => {
    //               //   getImgSrc(`${imgPath}${item.image}`);
    //               // }}
    //             >
    //               <img
    //                 src={`${imgPath}${item.image}`}
    //                 alt={item.title}
    //                 loading="lazy"
    //                 style={{ borderRadius: '10px' }}
    //               />

    //               <ImageListItemBar
    //                 position="top"
    //                 subtitle={
    //                   <div>
    //                     <span>
    //                       <DeletePost post={item} setPost={setPost} />
    //                     </span>
    //                   </div>
    //                 }
    //                 style={{
    //                   background: 'transparent',
    //                   textAlign: 'end',
    //                   borderRadius: '10px',
    //                   marginRight: 0,
    //                   marginLeft: 'auto',
    //                 }}
    //               ></ImageListItemBar>

    //               <ImageListItemBar
    //                 title={
    //                   <div style={{ textAlign: 'left' }}>
    //                     <div
    //                       style={{
    //                         display: 'flex',
    //                         padding: '5px',
    //                         justifyContent: 'space-between',
    //                       }}
    //                     >
    //                       <span
    //                         style={{
    //                           display: 'flex',
    //                         }}
    //                       >
    //                         <span>
    //                           <Like itemId={item._id} isLike={item.isLike} />
    //                         </span>
    //                       </span>

    //                       <span>
    //                         <AddCommentOutlinedIcon />
    //                       </span>
    //                     </div>
    //                     <span style={{ fontWeight: 900 }}>
    //                       @{item.creator.name}
    //                     </span>
    //                     {'    '}
    //                     {item.caption}
    //                   </div>
    //                 }
    //                 subtitle={
    //                   <div
    //                     style={{
    //                       display: 'flex',
    //                       justifyContent: 'flex-end',
    //                     }}
    //                   >
    //                     <span>
    //                       {new Date(item.createdAt).toLocaleString('en-us', {
    //                         month: 'short',
    //                         day: 'numeric',
    //                       })}
    //                     </span>
    //                     &nbsp; &nbsp; &nbsp;
    //                     <span> {item.postTime}</span>
    //                   </div>
    //                 }
    //                 position="below"
    //                 style={{ borderRadius: '10px', height: '5rem' }}
    //               />
    //             </ImageListItem>
    //           );
    //         })
    //       : null}
    //   </div>
    // </ImageList>
  );
};
export default Post;
