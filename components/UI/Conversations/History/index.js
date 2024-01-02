import {
  Container,
  Title,
  Text,
  Accordion,
  Divider,
  Button,
  Tooltip,
} from "@mantine/core";
import {
  getApiResponse,
  MarkHistoryApi,
} from "../../../../utils/API/conversarion_api";
import { getRandomIntSeed } from "../../../../utils/functions";
import {
  ShowError,
  ShowInfo,
  ShowSuccess,
} from "../../../../utils/Notifications/nt_show";
import ReactMarkdown from "react-markdown";
import { CircleBackslashIcon, Cross1Icon } from "@radix-ui/react-icons";

export function ShowHistory(props) {
  const {
    history,
    setHistory,
    addResponse,
    user_id,
    document_id,
    conv_id,
    processing,
    setProcessing,
  } = props;

  async function request(question) {
    let continueRequest = true;

    if (continueRequest) {
      setProcessing(true);
      ShowInfo("Please wait", "Getting response...");
      const json = await getApiResponse(
        question,
        user_id,
        document_id,
        conv_id
      );
      if (json["response"]["status"] == "success") {
        addResponse(question, json["response"]);
      } else if (json["response"]["status"] == "error") {
        addResponse(question, json["response"]["message"], true);
      }
      setProcessing(false);
    }
  }

  async function MarkAnswer(hist_id, feedback) {
    const json = await MarkHistoryApi(hist_id, 1 - feedback);
    if (json["code"] == 200) {
      ShowSuccess("Success", "Answer marked as bad");
      //   change feedback for the history with this id in the list
      let newHistory = history.map((item) => {
        if (item.id == hist_id) {
          item.feedback = 1 - feedback;
        }
        return item;
      });
      setHistory(newHistory);
    } else {
      ShowError("Error", "Could not mark answer as bad");
    }
  }

  return (
    <>
      {history?.map((item, hist_ind) => (
        <>
          {" "}
          <Container
            key={"hist_" + +getRandomIntSeed(10000, hist_ind)}
            mt={32}
            style={{ position: "relative" }}
          >
            <Container className="question-prompt">
              <Text order={3}>
                <ReactMarkdown>{item.question}</ReactMarkdown>
              </Text>
            </Container>

            <Tooltip label="Bad answer" className="mark-answer">
              <Button
                variant="outline"
                color={item.feedback ? "red" : "blue"}
                onClick={() => {
                  MarkAnswer(item.id, item.feedback);
                }}
              >
                {item.feedback ? <Cross1Icon /> : <CircleBackslashIcon />}
              </Button>
            </Tooltip>
            <Text>
              <ReactMarkdown>{item.answer}</ReactMarkdown>
            </Text>
            {(item.followup.length > 0 && item.followup !== "") && (
              <Container>
                <Title order={5} mt={16}>
                  Follow up questions:
                </Title>
                {item.followup.map((followup, followIndex) => (
                  <Text
                    mt={8}
                    key={
                      "followup_" +
                      getRandomIntSeed(10000, followIndex) +
                      "_" +
                      hist_ind
                    }
                    onClick={() => {
                      request(followup);
                    }}
                    fw={500}
                    style={{ cursor: "pointer" }}
                    color={"blue"}
                  >
                    {followup}
                  </Text>
                ))}
              </Container>
            )}
            {item.source.length > 0 && (
              <Container>
                <Title order={5} mt={16}>
                  Sources:
                </Title>
                <Accordion>
                  {item.source?.map((source, index) => (
                    <>
                      <Accordion.Item
                        key={
                          "source_" +
                          getRandomIntSeed(10000, index) +
                          "_" +
                          hist_ind
                        }
                        value={`${source.title}_${index}`}
                      >
                        <Accordion.Control>
                          <Title order={5} p={0} m={0}>
                            {source.title}
                          </Title>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Text>{source.source}</Text>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </>
                  ))}
                </Accordion>
              </Container>
            )}
          </Container>
          <Divider mt={16} />
        </>
      ))}
    </>
  );
}
