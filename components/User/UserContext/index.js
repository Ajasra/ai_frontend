import { createContext, useEffect, useState } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  const [user, setUser] = useState({
    user_id: null,
    user_name: null,
    user_email: null,
    hash: null,
    page: null,
    action: null,
    conversation: null,
    document: null,
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    if (user != null) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserContext, UserDispatchContext, UserProvider };
