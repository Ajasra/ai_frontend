import { createContext, useEffect, useState } from "react";

// TODO: check where it reset user at the beginning

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser);
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }else{
        setUser({
          user_id: null,
          user_name: null,
          user_email: null,
          hash: null,
          page: null,
          action: null,
          conversation: null,
          document: null,
          user_documents: null,
        });
    }
  }, []);

  useEffect(() => {
    if (user?.user_id != null) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // localStorage.removeItem("user");
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
