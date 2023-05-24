import { Accordion, Button, Divider, Title, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";

export default function DocumentListPage() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [documents, setDocuments] = useState([]);

  function SelectDocument(doc_id) {
    setUserDetails({
      ...userDetails,
      document: doc_id,
    });
  }

  useEffect(() => {
    if (userDetails != null) {
      if (userDetails.documents != null) {
        setDocuments(userDetails.documents);
      }
    }
  }, [userDetails?.documents]);

  return (
    <>
      <Title>Your documents</Title>
      <Accordion>
        {documents.map((doc) => (
          <Accordion.Item value={doc.id} key={doc.id}>
            <Accordion.Control>
              <Title order={4}>{doc.name}</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Divider variant="solid" />
              <Text>{doc.summary}</Text>
              <Button
                mt={8}
                onClick={() => {
                  SelectDocument(doc.id);
                }}
              >
                Select
              </Button>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
