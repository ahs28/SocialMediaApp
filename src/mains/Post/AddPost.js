import Modal from '../UI/Modal';
import { Button, Form, Container } from 'react-bootstrap';
import { useState, useContext } from 'react';

import AuthContext from '../../store/AuthContext';

import { useNavigate } from 'react-router-dom';
const AddPost = props => {
  const authCtx = useContext(AuthContext);
  const [post, setPost] = useState({
    caption: '',
  });
  const navigate = useNavigate();
  const [isUploaded, setIsUploaded] = useState(false);
  const [image, setImage] = useState();
  const getUserData = e => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const saveImage = e => {
    const file = e.target.files[0];
    setImage(file);
    setIsUploaded(true);
  };

  const postData = async event => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('image', image);
    console.log(post.caption);
    formdata.append('caption', post.caption);
    console.log(post.caption);
    const response = await fetch('http://192.168.1.241:8000/api/post', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: formdata,
    }).then(data => data.json());
    console.log(response);
    navigate('/');
    // props.onClose();
    // window.location.pathname = '/feed';
    // console.log('fix it');

    // console.log('fix it 2');
  };

  return (
    <>
      <Modal onClose={props.onClose}>
        <h5>Add Post</h5>
        <Container>
          <Form className="m-5 " onSubmit={postData}>
            <Form.Group className="m-4">
              <Form.Label>Add Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                id="image"
                placeholder="choose image"
                onChange={e => saveImage(e)}
                accept="image/jpeg, image/png ,image/avif"
              />
            </Form.Group>
            <Form.Group className="m-4">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                name="caption"
                placeholder="Enter Caption"
                onChange={e => getUserData(e)}
              />
            </Form.Group>

            <Button className="m-4" onClick={props.onClose}>
              Close
            </Button>
            {isUploaded && <Button type="submit">Save</Button>}
          </Form>
        </Container>
      </Modal>
    </>
  );
};
export default AddPost;
