import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "@mantine/core";
import {
  conversationCreateAPI,
  conversationGetListAPI,
} from "../../../../utils/API/conversarion_api";
import { IconLayoutGridAdd } from "@tabler/icons-react";

export default function ConversationsList() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [userConversations, setUserConversations] = useState([]);
  const [conversation, setConversation] = useState(null);

  async function parseConversations() {
    if (userDetails.user_id != null) {
      const convs = await conversationGetListAPI(userDetails.user_id);
      if (convs["code"] == "200") {
        if (convs["response"].length > 0) {
          // setUserDocuments(docs["data"]);
          let convList = [];
          for (let i = 0; i < convs["response"].length; i++) {
            convList.push({
              id: convs["response"][i]["conv_id"],
              doc_id: convs["response"][i]["doc_id"],
              title: convs["response"][i]["title"],
            });
          }
          setUserConversations(convList);
        }
      }
    }
  }

  async function createNewConversation() {
    // TODO: create new conversation
    if (userDetails.user_id != null) {
      const conv = await conversationCreateAPI(
        userDetails.user_id,
        null,
        "New conversation"
      );
      if(conv["code"] == "200"){
        setConversation(conv["response"]);
        setUserDetails({
          ...userDetails,
          action: "updateConversations",
        });
      }
    }
  }

  function getDocumentId() {
    if (userConversations != null) {
      for (let i = 0; i < userConversations.length; i++) {
        if (userConversations[i].id == conversation) {
          return userConversations[i].doc_id;
        }
      }
    }
  }

  useEffect(() => {
    parseConversations();
  }, [userDetails.user_id]);

  useEffect(() => {
    if (userDetails.action == "updateConversations") {
      console.log("updateConversations");
      parseConversations();

      setUserDetails({
        ...userDetails,
        action: null,
      });
    }
    if (userDetails.action == "closeConversation") {
      setConversation(null);
      setUserDetails({
        ...userDetails,
        action: null,
        page: {
          type: null,
        },
      });
    }
  }, [userDetails.action]);

  useEffect(() => {
    let type = "conversation";
    if (conversation == null) {
      type = null;
    }
    setUserDetails({
      ...userDetails,
      conversation: conversation,
      document: getDocumentId(),
      page: {
        type: type,
      },
    });
  }, [conversation]);

  useEffect(() => {
    setUserDetails({
      ...userDetails,
      userConversations: userConversations,
    });
  }, [userConversations]);

  return (
    <>
      <div>
        {userConversations.length > 0 &&
          userConversations.map((conv) => (
            <Button
              component="a"
              rel="noopener noreferrer"
              href={`/conversation/${conv.id}`}
              variant={conversation == conv.id ? "filled" : "subtle"}
              key={conv.id}
              w="100%"
              onClick={() => {
                setConversation(conv.id);
              }}
            >
              {conv.title}
            </Button>
          ))}
      </div>
      <Button onClick={createNewConversation} variant="unstyled">
        <IconLayoutGridAdd size={24} /> &nbsp; New conversation
      </Button>
    </>
  );
}
