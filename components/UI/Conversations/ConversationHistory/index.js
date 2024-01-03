import { Container } from "@mantine/core";
import RequestForm from "../../Forms/RequestForm";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { ShowHistory } from "../History";
import { userLoginAPI } from "../../../../utils/API/user_api";
import { historyGetByConversationAPI } from "../../../../utils/API/conversarion_api";
import { ShowError } from "../../../../utils/Notifications/nt_show";

function splitString(str) {
  if (str == null || str == "" || str == "None" || str == "[]") {
    return [];
  } else {
    return str.split("\n");
  }
}

export function ConversationHistory(props) {
  const { conversation, setConv } = props;

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [history, setHistory] = useState([]);
  const [conv_id, setConv_id] = useState(null);
  const [processing, setProcessing] = useState(false);

  function addResponse(question, response, error = false) {
    try {
      let sources = response["data"]["source"];

      setHistory([
        ...history,
        {
          // id: response["data"]["id"],
          question: question,
          answer: response["data"]["response"],
          error: error,
          source: SourcesToArray(sources),
          followup: response["data"]["follow_up_questions"],
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  }

  function SourcesToArray(sources) {
    let result = [];
    if (
      sources != null &&
      sources != "" &&
      sources != "None" &&
      sources != "[]"
    ) {
      result = JSON.parse(sources);
    }
    return result;
  }

  async function getHistory(conv_id) {
    // get the conversation history
    const json = await historyGetByConversationAPI(conv_id);
    if (json["code"] == "200") {
      let hist = [];
      // reverse the order of the history
      const resp = json["response"].reverse();

      resp?.map((item) => {
        hist.push({
          id: item["hist_id"],
          question: item["prompt"],
          answer: item["answer"],
          error: false,
          source: SourcesToArray(item["sources"]),
          followup: splitString(item["followup"]),
          feedback: item["feedback"],
        });
      });
      setHistory(hist);
    } else {
      ShowError("Error", "Cannot get conversation history");
    }
  }

  useEffect(() => {
    if (userDetails?.conversation != null) {
      setConv_id(userDetails.conversation);
      getHistory(userDetails.conversation);
    } else {
      setConv_id(null);
      setHistory([]);
      setUserDetails({
        ...userDetails,
        conversation: null,
      });
    }
  }, [userDetails?.conversation]);

  return (
    <Container>
      <ShowHistory
        history={history}
        setHistory={setHistory}
        user_id={userDetails?.user_id}
        document_id={userDetails?.document}
        conv_id={conv_id}
        addResponse={addResponse}
        processing={processing}
        setProcessing={setProcessing}
      />
      <RequestForm
        user_id={userDetails?.user_id}
        document_id={userDetails?.document}
        conv_id={conv_id}
        addResponse={addResponse}
        processing={processing}
        setProcessing={setProcessing}
        conversation={conversation}
        setConv={setConv}
      />
    </Container>
  );
}
