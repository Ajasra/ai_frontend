import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { useContext, useEffect, useState } from "react";
import { Button, Tooltip } from "@mantine/core";
import { getConversationsListApi } from "../../../../utils/API/conversarion_api";
import { IconLayoutGridAdd } from "@tabler/icons-react";

export default function ConversationsList() {
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [userConversations, setUserConversations] = useState([]);
  const [conversation, setConversation] = useState(null);

  async function parseConversations() {
    if (userDetails.user_id != null) {
      const convs = await getConversationsListApi(userDetails.user_id);
      if (convs["code"] == "200") {
        if (convs["response"].length > 0) {
          // setUserDocuments(docs["data"]);
          let convList = [];
          for (let i = 0; i < convs["response"].length; i++) {
            convList.push({
              id: convs["response"][i]["conv_id"],
              doc_id: convs["response"][i]["doc_id"],
              title: convs["response"][i]["title"],
            });
          }
          setUserConversations(convList);
        }
      }
    }
  }

  async function createNewConversation() {
    // TODO: create new conversation
    if(userDetails.user_id != null){
      let cur_doc = 0;
      if(userDetails.document != null){
        cur_doc = userDetails.document;
      }else{
        // TODO: do not allow create conversation without document
        // alert('Select a document to create a conversation')
        // console.log('Select a document to create a conversation')
      }
      console.log(cur_doc)
    }
    
    
  }

  function getDocumentId() {
    if (userConversations != null) {
      for (let i = 0; i < userConversations.length; i++) {
        if (userConversations[i].id == conversation) {
          return userConversations[i].doc_id;
        }
      }
    }
  }

  useEffect(() => {
    parseConversations();
  }, [userDetails.user_id]);

  useEffect(() => {
    if (userDetails.action == "updateConversation") {
      parseConversations();

      setUserDetails({
        ...userDetails,
        action: null,
      });
    }
    if (userDetails.action == "closeConversation") {
      setConversation(null);
    }
  }, [userDetails.action]);

  useEffect(() => {
    setUserDetails({
      ...userDetails,
      conversation: conversation,
      document: getDocumentId(),
    });
  }, [conversation]);

  return (
    <>
      <div>
        {userConversations.length > 0 &&
          userConversations.map((conv) => (
            <Button
              variant={conversation == conv.id ? "filled" : "subtle"}
              key={conv.id}
              w="100%"
              onClick={() => {
                setConversation(conv.id);
              }}
            >
              {conv.title}
            </Button>
          ))}
      </div>
      {/*<Button onClick={createNewConversation} variant="unstyled">*/}
      {/*  <IconLayoutGridAdd size={24} />*/}
      {/*</Button>*/}
    </>
  );
}
