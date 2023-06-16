import {Button, Container, FileInput, Group, Loader, Title} from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext, UserDispatchContext } from "../../../User/UserContext";
import { uploadDocumentApi } from "../../../../utils/API/docs_api";
import {
  ShowError,
  ShowSuccess,
} from "../../../../utils/Notifications/nt_show";

export function UploadDocument() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

  const [uploading, setUploading] = useState(false);

  async function Upload() {
    if (uploading) {
      return;
    }

    let continueUpload = true;
    if (file == null) {
      setFileError("Please select a file to upload");
      continueUpload = false;
    } else {
      setFileError("");
    }

    if (userDetails.user_id == null) {
      setFileError("Please login to upload");
      continueUpload = false;
    } else {
      setFileError("");
    }

    //  check if filesize less then 10mb
    if (file != null && file.size > 10485760) {
        setFileError("File size should be less than 10MB");
        continueUpload = false;
    }else {
        setFileError("");
    }

    if (continueUpload) {
      setUploading(true);

      // convert file to a blob
      let formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("user_id", userDetails.user_id);
      formData.append("force", true);

      const json = await uploadDocumentApi(formData);
      if (json["code"] == "200") {
        setUploading(false);
        setFile(null);
        ShowSuccess("File uploaded successfully", file.name);
        setUserDetails({
          ...userDetails,
          action: "updateDocuments",
        });
      } else {
        if (json["result"]["message"] != null) {
          ShowError("Upload failed", json["result"]["message"]);
        } else {
          ShowError("Upload failed", "Please try again later");
        }
        setUploading(false);
      }
    }
  }

  return (
    <Container>
      <FileInput
        placeholder="Pick file"
        label="Document to upload"
        description="Select the document to upload"
        withAsterisk
        value={file}
        onChange={setFile}
        accept=".pdf, .doc, .docx, .txt, .epub"
        error={fileError}
      />
      <Button onClick={Upload} disabled={uploading} mt={16}>
        {uploading ? <Loader size="sm" /> : "Upload" }
      </Button>
    </Container>
  );
}
