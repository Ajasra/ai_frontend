import { Button, Container, Group, Input, Title, Tooltip } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import {
  deleteConversationAPI,
  updateConversationAPI,
} from "../../../../utils/API/conversarion_api";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import {
  CheckIcon,
  Cross1Icon,
  CrumpledPaperIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import {
  ShowError,
  ShowSuccess,
} from "../../../../utils/Notifications/nt_show";

export default function ConversationTitle(props) {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const { conversation, document, updateConversation } = props;

  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  async function updateTitle() {
    const json = await updateConversationAPI(conversation.id, newTitle);
    if (json["code"] == "200") {
      setUserDetails({
        ...userDetails,
        action: "updateConversations",
      });
      ShowSuccess("Conversation title updated");
      updateConversation(conversation.id);
    } else {
      ShowError("Error updating conversation title");
    }
  }

  async function deleteConversation() {
    const json = await deleteConversationAPI(conversation.id);
    if (json["code"] == "200") {
      if (json["response"] == true) {
        updateConversation(conversation.id);
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

  function closeConversation() {
    setUserDetails({
      ...userDetails,
      conversation: null,
      document: null,
      action: "closeConversation",
    });
  }

  useEffect(() => {
    if (conversation != null) {
      setTitle(conversation.title);
      setNewTitle(conversation.title);
    } else {
      setTitle("New conversation");
      setNewTitle("New conversation");
    }
  }, [conversation]);

  return (
    <div style={{ position: "relative" }}>
      <Group
        sx={(theme) => ({
          position: "absolute",
          right: "2em",
          top: "1em",
          zIndex: "1",
          "@media (max-width: 48em)": {
            top: "0em",
            right: "-1em",
          },
        })}
      >
        {title != newTitle && (
          <>
            <Button onClick={updateTitle} variant="Unstyled">
              <Tooltip label="Update title">
                <CheckIcon />
              </Tooltip>
            </Button>
            <Button onClick={() => setNewTitle(title)} variant="Unstyled">
              <Tooltip label="Cancel changes">
                <ResetIcon />
              </Tooltip>
            </Button>
          </>
        )}
        <Button onClick={deleteConversation} variant="Unstyled">
          <Tooltip label="Delete conversation">
            <CrumpledPaperIcon />
          </Tooltip>
        </Button>
        <Button onClick={closeConversation} variant="Unstyled">
          <Tooltip label="Close conversation">
            <Cross1Icon />
          </Tooltip>
        </Button>
      </Group>
      <Input
        value={newTitle}
        variant="unstyled"
        size="xl"
        onChange={(event) => setNewTitle(event.target.value)}
        sx={(theme) => ({
          maxWidth: "65%",
          "@media (max-width: 48em)": {
            paddingTop: "2em",
            maxWidth: "100%",
          },
        })}
      />
    </div>
  );
}
