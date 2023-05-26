import {
  Container,
  Title,
  Text,
  Flex,
  Accordion,
  Button,
  Divider,
} from "@mantine/core";
import { getApiResponse } from "../../../../utils/API/conversarion_api";

export function ShowHistory(props) {
  const {
    history,
    addResponse,
    user_id,
    document_id,
    conv_id,
    processing,
    setProcessing,
  } = props;

  console.log(history);

  async function request(question) {
    let continueRequest = true;

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
      } else if (json["response"]["status"] == "error") {
        addResponse(question, json["response"]["message"], true);
      }
      setProcessing(false);
    }
  }

  return (
    <>
      {history?.map((item, index) => (
        <>
          {" "}
          <Container key={"hist_" + index} mt={32}>
            <Title order={3} color="blue.6">
              {item.question}
            </Title>
            <Text>{item.answer}</Text>
            {item.followup.length > 0 && (
              <Container>
                <Title order={5} mt={16}>
                  Follow up questions:
                </Title>
                {item.followup.map((followup, index) => (
                  <Text
                    mt={8}
                    key={"followup_" + index}
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
                        key={index}
                        value={`${source.metadata.source}_${index}`}
                      >
                        <Accordion.Control>
                          <Title order={5} p={0} m={0}>
                            {source.metadata.source.split("/").at(-1)} /
                            {" page: "}
                            {source.metadata.page}
                          </Title>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Text>{source.page_content}</Text>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </>
                  ))}
                </Accordion>
              </Container>
            )}
          </Container>
          <Divider mt={16}/>
        </>
      ))}
    </>
  );
}
