import { Accordion, Divider, Navbar, rem, Text } from "@mantine/core";

import styles from "../../../../styles/Navbar.module.css";
import UserInfo from "../../UserInfo";
import { useContext } from "react";
import { UserContext } from "../../../User/UserContext";
import { UploadDocument } from "../../Forms/UploadDocument";
import DocumentList from "../../Documents/DocumentList";
import { IconFolder, IconMessageChatbot, IconUser } from "@tabler/icons-react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import ConversationsList from "../../Conversations/ConversationsList";
import {AdminPanelNav} from "../../../Admin/Panel";

export default function AppNavbar(props) {
  const { opened, setOpened } = props;
  const userDetails = useContext(UserContext);

  return (
    <>
      {userDetails?.user_id && (
        <Navbar
          hiddenBreakpoint="md"
          hidden={!opened}
          width={{ md: 400, lg: 500 }}
          p="xs"
          className={styles.Navbar}
        >
          <Navbar.Section grow>
            <Accordion
              variant="separated"
              chevronPosition="left"
              disableChevronRotation
              defaultValue="conversations"
            >
              {userDetails?.user_id && (
                <>
                  <Accordion.Item value="documents">
                    <Accordion.Control icon={<IconFolder size={rem(20)} />}>
                      Documents
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Divider variant="solid" />
                      <UploadDocument />
                      <Divider variant="solid" m={16} />
                      <DocumentList />
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="conversations">
                    <Accordion.Control icon={<ChatBubbleIcon size={rem(20)} />}>
                      Conversations
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Divider variant="solid" />
                      <ConversationsList />
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="user">
                    <Accordion.Control icon={<IconUser size={rem(20)} />}>
                      User
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Divider variant="solid" />
                      <UserInfo />
                    </Accordion.Panel>
                  </Accordion.Item>
                  {userDetails.user_role == 10 && (
                    <Accordion.Item value="admin">
                      <Accordion.Control
                        icon={<IconMessageChatbot size={rem(20)} />}
                      >
                        Admin panel
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Divider variant="solid" />
                        <AdminPanelNav />
                      </Accordion.Panel>
                    </Accordion.Item>
                  )}
                </>
              )}
            </Accordion>
          </Navbar.Section>
        </Navbar>
      )}
    </>
  );
}
