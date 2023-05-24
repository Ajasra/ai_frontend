import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { getDocumentListApi } from "../../../../utils/API/docs_api";
import { Container, Select, Text, Title } from "@mantine/core";

export default function DocumentList() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [userDocuments, setUserDocuments] = useState([]);
  const [document, setDocument] = useState(null);
  const [docName, setDocName] = useState(null);
  const [docSummary, setDocSummary] = useState(null);

  async function parseDocuments() {
    if (userDetails.user_id != null) {
      const docs = await getDocumentListApi(userDetails.user_id);
      if (docs["code"] == "200") {
        if (docs["response"].length > 0) {
          // setUserDocuments(docs["data"]);
          let docList = [];
          for (let i = 0; i < docs["response"].length; i++) {
            docList.push({
              id: docs["response"][i]["doc_id"],
              name: docs["response"][i]["name"],
              summary: docs["response"][i]["summary"],
              updated: docs["response"][i]["updated"],
            });
          }
          setUserDetails({
            ...userDetails,
            documents: docList,
          });
        }
      }
    }
  }

  function getDocumentSummary() {
    if (userDetails.documents != null) {
      for (let i = 0; i < userDetails.documents.length; i++) {
        if (userDetails.documents[i].id == document) {
          setDocName(userDetails.documents[i].name);
          // set the summary to a short version of the summary (200 characters)
          if (userDetails.documents[i].summary.length > 200) {
            setDocSummary(
              userDetails.documents[i].summary.substring(0, 200) + "..."
            );
          } else {
            setDocSummary(userDetails.documents[i].summary);
          }
        }
      }
    }
  }

  useEffect(() => {
    parseDocuments();
  }, [userDetails.user_id]);

  useEffect(() => {
    if (userDetails.documents != null) {
      let doc_list = [];
      userDetails.documents.forEach((doc) => {
        doc_list.push({
          value: doc.id,
          label: doc.name,
        });
      });
      setUserDocuments(doc_list);
    }
  }, [userDetails.documents]);

  useEffect(() => {
    if (document != null) {
      setUserDetails({
        ...userDetails,
        document: document,
      });
    } else {
      setUserDetails({
        ...userDetails,
        document: null,
      });
    }
  }, [document]);

  useEffect(() => {
    getDocumentSummary(document);
  }, [userDetails.document]);

  return (
    <Container>
      {userDetails.user_id && userDocuments.length > 0 && (
        <Select
          data={userDocuments}
          label="Select document"
          placeholder="Select document"
          value={document}
          onChange={setDocument}
        />
      )}
      {docName && docSummary && (
        <>
          <Title order={5} mt={16}>
            {docName}
          </Title>
          <Text>{docSummary}</Text>
        </>
      )}
    </Container>
  );
}
