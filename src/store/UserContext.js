import React from 'react';

const UserContext = React.createContext({
  userData: {},
  setUserData: () => {},
  receiver: {},
  setReceiver: () => {},
  delMsgId: {},
  setDelMsgId: () => {},
});
export const UserContextProvider = props => {
  const [userData, setUserData] = React.useState();
  const [receiver, setReceiver] = React.useState();
  const [delMsgId, setDelMsgId] = React.useState();

  const contextValue = {
    userData,
    setUserData,
    receiver,
    setReceiver,
    delMsgId,
    setDelMsgId,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
