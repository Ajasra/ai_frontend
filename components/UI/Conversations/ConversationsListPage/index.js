import { Accordion, Button, Container, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import {
  deleteConversationAPI,
  getConversationsListApi,
} from "../../../../utils/API/conversarion_api";
import {
  ShowError,
  ShowSuccess,
} from "../../../../utils/Notifications/nt_show";

export default function ConversationsListPage() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [userConversations, setUserConversations] = useState([]);
  const [conversation, setConversation] = useState(null);

  async function deleteConversation(conv_id) {
    const json = await deleteConversationAPI(conv_id);
    if (json["code"] == "200") {
      if (json["response"] == true) {
        // updateConversation(conversation.id);
        setUserDetails({
          ...userDetails,
          conversation: null,
          document: null,
          action: "updateConversations",
        });
      }
      ShowSuccess("Conversation deleted");
    } else {
      ShowError("Error deleting conversation");
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
    setUserDetails({
      ...userDetails,
      conversation: conversation,
      document: getDocumentId(),
    });
  }, [conversation]);

  useEffect(() => {
    if (userDetails.userConversations != null) {
      setUserConversations(userDetails.userConversations);
    }
  }, [userDetails.user_id, userDetails.userConversations]);

  return (
    < >
      <Title mt={32}>Your conversations</Title>
      <Accordion>
        {userConversations != null &&
          userConversations.map((conv) => (
            <Accordion.Item value={conv.id} key={conv.id}>
              <Accordion.Control>
                <Title order={4}>{conv.title}</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <Button
                  mt={8}
                  onClick={() => {
                    setConversation(conv.id);
                  }}
                >
                  Select
                </Button>
                <Button
                  color="red"
                  variant="outline"
                  ml="2em"
                  onClick={() => {
                    deleteConversation(conv.id);
                  }}
                >
                  Delete
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
      </Accordion>
    </>
  );
}