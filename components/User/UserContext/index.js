import { createContext, useReducer, useEffect, useMemo } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

const initialState = {
  user_id: null,
  user_name: null,
  email: null,
  hash: null,
  page: null,
  action: null,
  conversation: null,
  user_conversations: null,
  document: null,
  user_documents: null,
  user_role: null,
};

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "SET_ACTION":
      return { ...state, action: action.payload };
    case "SET_DOCUMENT":
      return { ...state, document: action.payload };
    case "SET_DOCUMENTS":
      return { ...state, user_documents: action.payload };
    case "SET_CONVERSATION":
      return { ...state, conversation: action.payload };
    case "SET_CONVERSATIONS":
      return { ...state, user_conversations: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_ALL":
      return { ...state, ...action.payload };
    case "RESET_USER":
      return initialState;
    default:
      return state;
  }
}

function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      dispatch({ type: "SET_USER", payload: JSON.parse(loggedInUser) });
    }
  }, []);

  useEffect(() => {
    if (user?.user_id != null) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const contextValue = useMemo(() => ({ user }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export { UserContext, UserDispatchContext, UserProvider };
