import { Button, Container, Group, Input, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";
import {
  deleteConversationAPI,
  updateConversationAPI,
} from "../../../../utils/API/conversarion_api";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import {
  IconAdjustmentsCancel,
  IconBellCancel,
  IconCheck,
  IconCross,
  IconEdit,
  IconHttpDelete,
  IconMessage2Cancel,
} from "@tabler/icons-react";
import { CheckIcon, CrumpledPaperIcon, ResetIcon } from "@radix-ui/react-icons";

export default function ConversationTitle(props) {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const { conversation, document, updateConversation } = props;

  const [title, setTitle] = useState();
  const [newTitle, setNewTitle] = useState();

  console.log(conversation)

  async function updateTitle() {
    const json = await updateConversationAPI(conversation.id, newTitle);
    if (json["code"] == "200") {
      if (json["response"] == true) {
        updateConversation(conversation.id);
        setUserDetails({
          ...userDetails,
          action: "updateConversation",
        });
      }
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
          action: "updateConversation",
        });
      }
    }
  }

  useEffect(() => {
    if (conversation != null) {
      setTitle(conversation.title);
      setNewTitle(conversation.title);
    }else{
        setTitle('New conversation');
        setNewTitle('New conversation');
    }
  }, [conversation]);

  return (
    <Group position="apart" grow>
      <Input
        value={newTitle}
        variant="unstyled"
        size="xl"
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <Group position="right">
        {title != newTitle && (
          <>
            <Button onClick={updateTitle} variant="Unstyled">
              <CheckIcon />
            </Button>
            <Button onClick={() => setNewTitle(title)} variant="Unstyled">
              <ResetIcon />
            </Button>
          </>
        )}
        <Button onClick={deleteConversation} variant="Unstyled">
          <CrumpledPaperIcon />
        </Button>
      </Group>
    </Group>
  );
}
