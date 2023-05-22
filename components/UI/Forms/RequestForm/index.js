import {Button, Container, Input, Text, Title} from "@mantine/core";
import {useState} from "react";
import {getApiResponse} from "../../../../utils/API/conversarion_api";


export default function RequestForm() {

    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    async function getResponse() {

        const json = await getApiResponse(question)
        if(json['response']['status'] == 'success'){
            setResponse(json['response']['message'])
        }else if(json['response']['status'] == 'error'){
            setResponse(json['response']['message'])
        }
        console.log(json['response']['status'])

    }

    return (
        <Container>
            <Input
                label="Your question"
                placeholder="What is the meaning of life?"
                required
                variant="filled"
                size="lg"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
            />
            <Button
                size="lg"
                onClick={getResponse}
            >
                Submit
            </Button>
            <Container>
                <Title order={3}>Response</Title>
                <Text>{response}</Text>
            </Container>
        </Container>
    )
}