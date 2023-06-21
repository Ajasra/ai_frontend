import { AppShell } from "@mantine/core";
import { AppShellLayout } from "../../components/UI/Layout/AppShell";
import { useRouter } from "next/router";
import {ConversationPage} from "../../components/UI/Conversations/ConversationPage";

export default function ConversationSlug() {
  //   get the slug from the url
    const router = useRouter();
    const { slug } = router.query;
    console.log(slug);


  return (
    <AppShellLayout>
      <ConversationPage />
    </AppShellLayout>
  );
}
