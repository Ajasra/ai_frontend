import { Button, Container, FileInput, Group, Title } from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext } from "../../../User/UserContext";
import { uploadDocumentApi } from "../../../../utils/API/docs_api";

export function UploadDocument() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const userDetails = useContext(UserContext);

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

    console.log(file);

    if (continueUpload) {
      setUploading(true);

      // convert file to a blob
      let formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("user_id", userDetails.user_id);
      formData.append("force", false);

      const json = await uploadDocumentApi(formData);
      console.log(json);
      if (json["code"] == "200") {
        setUploading(false);
        setFile(null);
      } else {
        if (json["result"]["message"] != null) {
          setFileError(json["result"]["message"]);
        } else {
          setFileError("Upload failed");
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
        Upload
      </Button>
    </Container>
  );
}
