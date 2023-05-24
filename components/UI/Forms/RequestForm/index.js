import { Button, Container, Input, Text, Title } from "@mantine/core";
import { useState } from "react";
import { getApiResponse } from "../../../../utils/API/conversarion_api";

export default function RequestForm(props) {
  const { user_id, document_id, conv_id, setConversationId, addResponse } =
    props;

  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [processing, setProcessing] = useState(false);

  async function getResponse() {
    let continueRequest = true;

    if (question == "") {
      setQuestionError("Please enter a question");
      continueRequest = false;
      return;
    } else {
      setQuestionError("");
    }

    if (continueRequest) {
      setProcessing(true);
      const json = await getApiResponse(
        question,
        user_id,
        document_id,
        conv_id
      );
      if (json["response"]["status"] == "success") {
        addResponse(question, json["response"]);
        setConversationId(json["response"]["data"]["conversation_id"]);
        setQuestion("");
      } else if (json["response"]["status"] == "error") {
        addResponse(question, json["response"]["message"], true);
      }
      setProcessing(false);
    }
  }

  return (
    <Container mt={32}>
      <Title order={3}>Ask a question</Title>
      <Input
        label="Your question"
        placeholder="What is the meaning of life?"
        required
        variant="filled"
        size="lg"
        value={question}
        mt={16}
        error={questionError}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <Button onClick={getResponse} mt={16} disabled={processing}>
        Ask
      </Button>
    </Container>
  );
}
