import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../../store/AuthContext';
import { useContext } from 'react';

const RemoveAchat = props => {
  const authCtx = useContext(AuthContext);

  const deleteAchat = async () => {
    await fetch(
      `http://192.168.1.241:8000/api/message/delete/chat/${props.messageContent.messageId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${authCtx.token}`, // notice the Bearer before your token
        },
        body: JSON.stringify(),
      }
    );
  };

  return (
    <>
      <div
        onClick={() => {
          deleteAchat();
        }}
        style={{ postion: 'fixed ', marginTop: '1rem' }}
      >
        <DeleteIcon />
      </div>
    </>
  );
};
export default RemoveAchat;
