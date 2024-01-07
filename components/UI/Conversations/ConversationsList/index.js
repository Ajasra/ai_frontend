import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@mantine/core";
import {
  conversationCreateAPI,
  conversationGetListAPI,
} from "../../../../utils/API/conversarion_api";
import { IconLayoutGridAdd } from "@tabler/icons-react";
import { ShowError } from "../../../../utils/Notifications/nt_show";

/**
 * ConversationsList component is responsible for displaying a list of conversations
 * and providing functionality to create a new conversation.
 *
 * @returns {JSX.Element} A list of conversations and a button to create a new conversation.
 */
export default function ConversationsList() {
  const { user } = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [userConversations, setUserConversations] = useState([]);
  const [conversation, setConversation] = useState(null);

  /**
   * Fetches the list of conversations for the current user and updates the state.
   */
  async function parseConversations() {
    try {
      if (user.user_id != null) {
        const json = await conversationGetListAPI(user.user_id);
        if (json.code === 200 && json.response.length > 0) {
          const convList = json.response.map((conv) => conv);
          setUserConversations(convList);
        } else if (json.code === 400) {
          ShowError("Can't load user conversations", json.response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Creates a new conversation for the current user and updates the state.
   */
  async function createNewConversation() {
    try {
      const conv = await conversationCreateAPI(
        user.user_id,
        null,
        "New conversation"
      );
      if (conv.code === 200) {
        setConversation(conv.response);
        setUserDetails({
          type: "SET_ACTION",
          payload: "updateConversations",
        });
      } else {
        ShowError("Can't create new conversation", conv.response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Returns the document ID for the current conversation.
   *
   * @returns {string|null} The document ID for the current conversation, or null if not found.
   */
  function getCurrentDocumentId() {
    const foundConversation = userConversations?.find(
      (conv) => conv.conv_id === conversation
    );
    return foundConversation?.doc_id;
  }

  // Fetch the list of conversations when the user ID changes.
  useEffect(() => {
    parseConversations();
  }, [user.user_id]);

  // Update the list of conversations when the user action changes.
  useEffect(() => {
    if (user.action === "updateConversations") {
      parseConversations();
      setUserDetails({
        type: "SET_ACTION",
        payload: null,
      });
    }
    if (user.action === "closeConversation") {
      setConversation(null);
      setUserDetails({
        type: "SET_ALL",
        payload: {
          action: null,
          page: null,
        },
      });
    }
  }, [user.action]);

  // Update the page, document, and conversation when the conversation changes.
  useEffect(() => {
    const type = conversation ? "conversation" : null;
    setUserDetails({
      type: "SET_ALL",
      payload: {
        page: {
          type: type,
        },
        document: getCurrentDocumentId(),
        conversation: conversation,
      },
    });
  }, [conversation]);

  // Update the conversations when the user conversations change.
  useEffect(() => {
    setUserDetails({
      type: "SET_CONVERSATIONS",
      payload: userConversations,
    });
  }, [userConversations]);

  /**
   * ConversationButton component is responsible for rendering a single conversation button.
   *
   * @param {Object} props - The properties passed to the component.
   * @param {Object} props.conv - The conversation data.
   * @returns {JSX.Element} A button representing a single conversation.
   */
  function ConversationButton({ conv , conversation, setConversation}) {
    const setUserDetails = useContext(UserDispatchContext);

    /**
     * Handles the button click event.
     */
    const handleButtonClick = useCallback(() => {
      setConversation(conv.conv_id);
    }, [conv.conv_id]);

    return (
      <Button
        component="a"
        rel="noopener noreferrer"
        href={`/conversation/${conv.conv_id}`}
        variant={conversation === conv.conv_id ? "filled" : "subtle"}
        key={conv.id}
        w="100%"
        onClick={handleButtonClick}
      >
        {conv.title}
      </Button>
    );
  }

  return (
    <>
      <div>
        {userConversations.length > 0 &&
          userConversations.map((conv) => (
            <ConversationButton key={conv.conv_id} conv={conv} conversation={conversation} setConversation={setConversation} />
          ))}
      </div>
      <Button onClick={createNewConversation} variant="unstyled">
        <IconLayoutGridAdd size={24} /> &nbsp; New conversation
      </Button>
    </>
  );
}
