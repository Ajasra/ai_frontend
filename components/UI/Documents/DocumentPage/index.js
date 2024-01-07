import { Accordion, Button, Divider, Title, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { docDeleteAPI } from "../../../../utils/API/docs_api";
import {
  ShowError,
  ShowSuccess,
} from "../../../../utils/Notifications/nt_show";

export default function DocumentListPage(props) {
  const { user } = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const { type = "my" } = props;

  const [documents, setDocuments] = useState([]);

  function SelectDocument(doc_id) {
    setUserDetails({
      type: 'SET_USER',
      payload: {
        ...user,
        document: doc_id,
        page: {
          type: "conversation",
        },
      }
    });
  }

  async function DeleteDocument(doc_id) {
    console.log("Delete document " + doc_id);
    const res = await docDeleteAPI(doc_id);
    if (res["code"] == "200") {
      console.log("Document deleted");
      setUserDetails({
        type: 'SET_USER',
        payload: {
          ...user,
          action: "updateDocuments",
        }
      });
      ShowSuccess("Document deleted");
    } else {
      ShowError("Error deleting document");
    }
  }

  useEffect(() => {
    if (user != null) {
      if (user.documents != null) {
        setDocuments(user.documents);
      }
    }
  }, [user?.documents]);

  return (
    <>
      <Title>{type === "my" ? "My documents" : "All documents"}</Title>
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
                component="a"
                rel="noopener noreferrer"
                href={`/conversation/new`}
                mt={8}
                onClick={() => {
                  SelectDocument(doc.id);
                }}
              >
                Select
              </Button>
              <Button
                color="red"
                variant="outline"
                ml="2em"
                onClick={() => {
                  DeleteDocument(doc.id);
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
