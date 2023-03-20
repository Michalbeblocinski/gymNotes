import { createContext, useState } from 'react';

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [currentUser2, setCurrentUser2] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  
  return (
    <UsersContext.Provider value={{currentUser2,accessToken,refreshToken,setCurrentUser2,setAccessToken,setRefreshToken}}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };