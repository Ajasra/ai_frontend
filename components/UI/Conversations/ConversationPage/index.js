import { Title, Divider, Text, Accordion } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { ConversationHistory } from "../ConversationHistory";
import { getConversationByIdApi } from "../../../../utils/API/conversarion_api";
import ConversationTitle from "../ConvTitle";

export function ConversationPage() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [document, setDocument] = useState(null);
  const [conversation, setConversation] = useState(null);

  function SetNewConversation(conv_id) {
    setConversation({
      ...conversation,
      id: conv_id,
    });
    setUserDetails({
      ...userDetails,
      conversation: conv_id,
      action: "updateConversations",
    });
  }

  useEffect(() => {
    if (userDetails?.document != null && userDetails?.document != "None") {
      // get document name and summary by id form the userDetails.documents
      const doc = userDetails.documents.filter(
        (doc) => doc.id == userDetails.document
      );
      if (doc.length > 0) {
        setDocument(doc[0]);
        setConversation({
          title: "New: " + doc[0].name.split(".")[0],
          id: null,
        });
      } else {
        setDocument(null);
        setUserDetails({
          ...userDetails,
          document: null,
        });
      }
    } else if (userDetails?.document == "None") {
      setDocument(null);
    } else {
      setDocument("");
    }
  }, [userDetails?.document]);

  //fet conversation name by the conversdation id
  async function getConversation(conv_id) {
    if (conv_id != null) {
      const json = await getConversationByIdApi(conv_id);
      if (json["code"] == "200") {
        setConversation({
          title: json["response"]["title"],
          id: json["response"]["conv_id"],
          model: json["response"]["model"],
          summary: json["response"]["summary"],
        });
      }
    }
  }

  useEffect(() => {
    getConversation(userDetails?.conversation);
  }, [userDetails?.conversation]);
  
  console.log(conversation);

  return (
    <>
      <ConversationTitle
        conversation={conversation}
        document={document}
        updateConversation={getConversation}
      />
      <Divider mt={32} />
      {document !== null && (
        <Accordion label="Document">
          <Accordion.Item value="document_name">
            <Accordion.Control>
              <Title order={4}>{document?.name}</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>{document?.summary}</Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}
      <Accordion label="Settings">
        <Accordion.Item value="document_name">
          <Accordion.Control>
            <Title order={4}>Conversation settings</Title>
          </Accordion.Control>
          <Accordion.Panel>
          
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <ConversationHistory
        conversation={conversation}
        setConv={SetNewConversation}
      />
    </>
  );
}
