import React from 'react';
const UserContext = React.createContext({
  userData: {},
  setUserData: () => {},
  receiver: {},
  setReceiver: () => {},
});
export const UserContextProvider = props => {
  const [userData, setUserData] = React.useState();
  const [receiver, setReceiver] = React.useState();

  const contextValue = {
    userData,
    setUserData,
    receiver,
    setReceiver,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
