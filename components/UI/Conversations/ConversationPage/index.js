import { Title, Divider, Text, Accordion } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../User/UserContext";
import {ConversationHistory} from "../ConversationHistory";

export function ConversationPage() {
  const userDetails = useContext(UserContext);

  const [document, setDocument] = useState(null);

  useEffect(() => {
    if (userDetails?.document != null) {
      // get document name and summary by id form the userDetails.documents
      const doc = userDetails.documents.filter(
        (doc) => doc.id == userDetails.document
      );
      setDocument(doc[0]);
    }
  }, [userDetails?.document]);

  console.log(userDetails);

  return (
    <>
      <Title>Conversation over document:</Title>
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
