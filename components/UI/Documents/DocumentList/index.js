import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { docGetListAPI } from "../../../../utils/API/docs_api";
import { Button, Container, Select, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";

/**
 * DocumentList component is responsible for displaying a list of documents
 * and providing functionality to select a document.
 *
 * @returns {JSX.Element} A list of documents and a select input to choose a document.
 */
export default function DocumentList() {
  const { user } = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [userDocuments, setUserDocuments] = useState([]);
  const [document, setDocument] = useState(null);

  const route = useRouter();

  /**
   * Fetches the list of documents for the current user and updates the state.
   */
  async function parseDocuments() {
    try {
      if (user.user_id != null) {
        const json = await docGetListAPI(user.user_id);
        if (json.code === 200 && json.response.length > 0) {
          const docList = json.response.map((doc) => doc);
          setUserDetails({
            type: "SET_DOCUMENTS",
            payload: docList,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function getDocumentById(doc_id) {
    const foundDocument = user.user_documents?.find(
      (doc) => doc.doc_id === doc_id
    );
    return foundDocument;
  }

  function updateSelectedDocument(doc_id) {
    const foundDocument = getDocumentById(doc_id);
    if (foundDocument.summary.length > 200) {
      foundDocument.summary = foundDocument.summary.substring(0, 200) + "...";
    }
    if (foundDocument) {
      setDocument(foundDocument);
    }
  }

  // Fetch the list of documents when the user ID changes.
  useEffect(() => {
    parseDocuments();
  }, [user.user_id]);

  // Update the list of documents when the user documents change.
  useEffect(() => {
    if (user.user_documents != null) {
      const doc_list = user.user_documents.map((doc) => ({
        value: doc.doc_id,
        label: doc.name,
      }));
      setUserDocuments(doc_list);
    }
  }, [user.user_documents]);

  // Update the document, page, and conversation when the document changes.
  function handleButtonClick() {
    const payload = document
      ? {
          document: document,
          page: {
            type: "conversation",
          },
          conversation: null,
        }
      : {
          document: null,
          page: {
            type: null,
          },
          conversation: null,
        };

    setUserDetails({
      type: "SET_ALL",
      payload: payload,
    });

    if (document) {
      route.push("/conversation/new");
    }
  }

  // Update the documents when the user action changes.
  useEffect(() => {
    if (user.action === "updateDocuments") {
      parseDocuments();
      setUserDetails({
        type: "SET_ACTION",
        payload: null,
      });
    }
  }, [user.action]);

  console.log(document);

  return (
    <Container>
      {user.user_id && userDocuments.length > 0 && (
        <Select
          data={userDocuments}
          label="Select document"
          placeholder="Select document"
          value={document?.doc_id}
          onChange={updateSelectedDocument}
        />
      )}
      {document && (
        <>
          <Title order={5} mt={16}>
            {document.name}
          </Title>
          <Text>{document.summary}</Text>
          <Button w="100%" onClick={handleButtonClick}>
            Start conversation
          </Button>
        </>
      )}
    </Container>
  );
}
