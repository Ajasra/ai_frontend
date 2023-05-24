import { Container, Title, Text, Flex, Accordion } from "@mantine/core";

export function ShowHistory(props) {
  const { history } = props;

  console.log(history);

  return (
    <>
      {history?.map((item, index) => (
        <Container key={index} mt={16}>
          <Title order={4} color="blue.6">
            {item.question}
          </Title>
          <Text>{item.answer}</Text>
          {item.source.length > 0 && (
            <Container>
              <Title order={4}>Sources:</Title>
              <Accordion>
                {item.source?.map((source, index) => (
                  <>
                    <Accordion.Item
                      key={index}
                      value={`${source.metadata.source}_${index}`}
                    >
                      <Accordion.Control>
                        <Title order={5}>
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

          {/*<p>{item.error}</p>*/}
          {/*<p>{item.source}</p>*/}
        </Container>
      ))}
    </>
  );
}
