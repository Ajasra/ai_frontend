import {
  Title,
  Divider,
  Text,
  Accordion,
  Select,
  Button,
  Container, Flex,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { ConversationHistory } from "../ConversationHistory";
import {
  getConversationByIdApi,
  updateConversationModelAPI,
} from "../../../../utils/API/conversarion_api";
import ConversationTitle from "../ConvTitle";
import ReactMarkdown from "react-markdown";
import { showNotification } from "@mantine/notifications";
import {
  find_model_by_name,
  getModels,
  updateModel,
} from "../../../../utils/models_helper";

export function ConversationPage() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [document, setDocument] = useState(null);
  const [conversation, setConversation] = useState(null);

  const [models, setModels] = useState([]);
  const [model, setModel] = useState(null);

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

  async function updateConversationSettings() {
    const json = await updateConversationModelAPI(conversation.id, model.value);
    if (json["code"] == "200") {
      showNotification({
        title: "Success",
        message: "Conversation updated",
        color: "blue",
      });
    } else {
      showNotification({
        title: "Error",
        message: "Conversation not updated",
        color: "red",
      });
    }
  }

  useEffect(() => {
    // call on mount
    getModels(setModels);
  }, []);

  useEffect(() => {
    if (conversation?.model != null) {
      setModel(find_model_by_name(conversation?.model, models));
    }
  }, [conversation]);

  useEffect(() => {
    getConversation(userDetails?.conversation);
  }, [userDetails?.conversation]);

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
            <Flex>
              <Container>
                <Title order={5}>Model</Title>
                <Select
                  data={models}
                  placeholder="Select model"
                  defaultValue={model?.value}
                  value={model?.value}
                  onChange={(value) => {
                    updateModel(value, setConversation, conversation, models);
                  }}
                />
                <Text>
                  <ReactMarkdown>{model?.description}</ReactMarkdown>
                </Text>
              </Container>
              <Container>
                <Title order={5}>Assistant</Title>
                <Text>
                  <ReactMarkdown>
                    This is the assistant that will be used for this
                    conversation. You can change the assistant by selecting a
                    different model.
                  </ReactMarkdown>
                </Text>
              </Container>
            </Flex>
            <Button onClick={updateConversationSettings}>Apply</Button>
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
