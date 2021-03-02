import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";

import { UPLOAD_FILE } from "../../services/Users/UsersAccessMutation";
import Modal from "./Modal";

interface IProps {
  children: JSX.Element;
}

function DropZone({ children }: IProps) {
  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState<string>("");

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "image/jpeg, image/png",
    onDrop: async (files) => {
      if (files.length) {
        const picture = files[0];

        await uploadFile({
          variables: { file: picture },
          update(_, { data }) {
            setDraft(data?.uploadFile.url);
          },
        });
        setShowModal(true);
      }
    },
  });

  return (
    <div>
      <section className="container border-0">
        <div {...getRootProps({ className: "dropzone" })}>
          <input className="border-0" hidden={true} {...getInputProps()} />
          {children}
        </div>
      </section>
      <Modal
        show={showModal}
        file={draft}
        onCancel={() => setShowModal(false)}
      ></Modal>
    </div>
  );
}
export default DropZone;
