import {Button, Container, Input, Loader, Text, Textarea, Title} from "@mantine/core";
import { useContext, useState } from "react";
import {
  createConversationApi,
  getApiResponse, getSimpleApiResponse,
} from "../../../../utils/API/conversarion_api";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import {ShowError, ShowInfo} from "../../../../utils/Notifications/nt_show";

export default function RequestForm(props) {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const {
    user_id,
    document_id,
    addResponse,
    processing,
    setProcessing,
    conversation,
    setConv,
  } = props;

  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");

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
      let conv_id = conversation?.id;
      if (conversation?.id == null || conversation == null) {
        const conv = await createConversationApi(
          user_id,
          document_id,
          conversation.title
        );
        setConv(conv["response"]);
        conv_id = conv["response"];
      }

      setProcessing(true);
      ShowInfo("Please wait", "Getting response...");
      let json;
      if (document_id == null || document_id == "None") {
        json = await getSimpleApiResponse(
            question,
            user_id,
            conv_id
        )
      }else{
        json = await getApiResponse(
            question,
            user_id,
            document_id,
            conv_id
        );
      }
      if (json["response"]["status"] == "success") {
        addResponse(question, json["response"]);
        // setConversationId(json["response"]["data"]["conversation_id"]);
        setQuestion("");
        // setUserDetails({
        //   ...userDetails,
        //   action: "updateConversation",
        // });
      } else if (json["response"]["status"] == "error") {
        addResponse(question, json["response"]["message"], true);
        ShowError("Error", json["response"]["message"]);
      }
      window.scrollTo(0, document.body.scrollHeight, { behavior: "smooth" });
      setProcessing(false);
    }
  }

  return (
    <Container mt={32}>
      <Title order={3}>Ask a question</Title>
      <Textarea
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
        {processing ? <Loader size="sm" /> : "Ask" }
      </Button>
    </Container>
  );
}
