import { Container } from "@mantine/core";
import RequestForm from "../../Forms/RequestForm";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { ShowHistory } from "../History";
import { loginUser } from "../../../../utils/API/user_api";
import { getConversationHistory } from "../../../../utils/API/conversarion_api";

export function ConversationHistory() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [history, setHistory] = useState([]);
  const [conv_id, setConv_id] = useState(null);

  function addResponse(question, response, error = false) {
    setHistory([
      ...history,
      {
        question: question,
        answer: response["data"]["response"],
        error: error,
        source: response["data"]["source"],
        followup: response["data"]["follow_up_questions"],
      },
    ]);
  }

  async function getHistory(conv_id) {
    // get the conversation history
    const json = await getConversationHistory(conv_id);
    if (json["code"] == "200") {
      let hist = [];
      json["response"]?.map((item) => {
        hist.push({
          question: item["prompt"],
          answer: item["answer"],
          error: false,
          source: [],
          followup: [],
        });
      });
      setHistory(hist);
    }
  }

  function updateConversation(conv_id) {
    setUserDetails({
      ...userDetails,
      conversation: conv_id,
    });
  }

  useEffect(() => {
    if (userDetails?.conversation != null) {
      setConv_id(userDetails.conversation);
      getHistory(userDetails.conversation);
    }
  }, [userDetails?.conversation]);

  return (
    <Container>
      <ShowHistory history={history} />
      <RequestForm
        user_id={userDetails.user_id}
        document_id={userDetails.document}
        conv_id={conv_id}
        setConversationId={updateConversation}
        addResponse={addResponse}
      />
    </Container>
  );
}
