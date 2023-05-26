import { Title, Divider, Text, Accordion } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../User/UserContext";
import { ConversationHistory } from "../ConversationHistory";
import { getConversationByIdApi } from "../../../../utils/API/conversarion_api";
import ConversationTitle from "../ConvTitle";

export function ConversationPage() {
  const userDetails = useContext(UserContext);

  const [document, setDocument] = useState(null);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    if (userDetails?.document != null) {
      // get document name and summary by id form the userDetails.documents
      const doc = userDetails.documents.filter(
        (doc) => doc.id == userDetails.document
      );
      setDocument(doc[0]);
      setConversation(null);
    }
  }, [userDetails?.document]);

  //fet conversation name by the conversdation id
  async function getConversation(conv_id) {
    if (conv_id != null) {
      const json = await getConversationByIdApi(conv_id);
      if (json["code"] == "200") {
        console.log(json["response"]);
        setConversation({
          title: json["response"]["title"],
          id: json["response"]["conv_id"],
        });
      }
    }
  }

  useEffect(() => {
    getConversation(userDetails?.conversation);
  }, [userDetails?.conversation]);

  return (
    <>
      <ConversationTitle
        conversation={conversation}
        document={document}
        updateConversation={getConversation}
      />
      <Divider mt={32} />
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
      <ConversationHistory />
    </>
  );
}
