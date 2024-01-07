import { Button } from "@mantine/core";
import { useContext } from "react";
import { UserContext, UserDispatchContext } from "../../User/UserContext";

const tabs = [
  {
    id: "users",
    title: "Users",
  },
  {
    id: "documents",
    title: "Documents",
  },
  {
    id: "conversations",
    title: "Conversations",
  },
  {
    id: "settings",
    title: "Settings",
  },
];

export function AdminPanelNav() {
  const userDetails = useContext(UserContext);
  // const setUserDetails = useContext(UserDispatchContext);

  function SelectTab(tab) {
    // setUserDetails({
    //   ...userDetails,
    //   page: {
    //     type: "admin",
    //     content: tab,
    //   },
    // });
  }

  return (
    <>
      {tabs.map((tab) => (
        <Button
          component="a"
          target="_blank"
          rel="noopener noreferrer"
          href={`/admin/${tab.id}`}
          variant={userDetails.page?.content == tab.id ? "filled" : "subtle"}
          key={tab.id}
          w="100%"
          onClick={() => {
            SelectTab(tab.id);
          }}
        >
          {tab.title}
        </Button>
      ))}
    </>
  );
}
