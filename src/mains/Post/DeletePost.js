import React from 'react';
import UserContext from '../../store/UserContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AuthContext from '../../store/AuthContext';
import { useContext } from 'react';
import { socket } from '../../components/Socket';
import { useEffect } from 'react';

const DeletePost = props => {
  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteButton, setDeleteButton] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    if (
      props.post.creator._id === userCtx.userData._id ||
      userCtx.userData.isAdmin === true
    ) {
      setDeleteButton(true);
    } else {
      setDeleteButton(false);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletePost = async () => {
    await fetch(`http://192.168.1.241:8000/api/delete/post/${props.post._id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`, // notice the Bearer before your token
      },
      body: JSON.stringify({
        senderid: props.senderid,
        receiverid: props.receiverid,
      }),
    });

    // props.setMessageList([]);
  };
  useEffect(() => {
    socket.on('posts', data => {
      if (data.action === 'delete') {
        console.log(data);
        props.setPost(() => {
          return data.data;
        });
      }
    });
  }, [socket]);
  return (
    <>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {deleteButton && (
            <MenuItem style={{ fontSize: '12px' }} onClick={() => deletePost()}>
              Delete
            </MenuItem>
          )}
          <MenuItem style={{ fontSize: '12px' }}>Report</MenuItem>
        </Menu>
      </div>
    </>
  );
};
export default DeletePost;
