import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Avatar, Grid, ListItemText } from '@mui/material';

const DisplayMessage = props => {
  // const checkMessage = () => {
  //   if (userCtx.delMsgId === props.messageContent.messageId) {
  //     return true;
  //   }
  // };
  return (
    <List>
      <ListItem>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText
              align={props.sideData}
              primary={
                <>
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: props.flexSide,
                    }}
                  >
                    {props.sideData === 'left' ? (
                      <span>
                        <Avatar alt={props.name} src={props.image} />
                      </span>
                    ) : null}
                    <span
                      style={{
                        marginTop: '0.5rem',
                        margin: '0.5rem',
                      }}
                    >
                      {props.messageContent.message}
                    </span>
                    {props.sideData === 'right' ? (
                      <span>
                        <Avatar alt={props.name} src={props.image} />
                      </span>
                    ) : null}
                  </span>
                </>
              }
            ></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText
              align={props.sideData}
              secondary={
                <>
                  <span>
                    {new Date(props.messageContent.time).toLocaleString(
                      'en-us',
                      {
                        minute: 'numeric',
                        hour: 'numeric',
                      }
                    )}
                  </span>
                  &nbsp;
                  {/* <span>Me</span> */}
                </>
              }
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export default DisplayMessage;
