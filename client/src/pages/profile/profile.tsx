import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPLOAD_FILE } from '../../services/Users/UsersAccessMutation';

interface Event<T = EventTarget> {
  target: T;
}

function Profile() {
  const [fileSelected, setFileSelected]: any = useState(null);
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const handleFileChange = async (e: Event<HTMLInputElement>) => {
    if (e.target.files !== null) {
      if (e.target.validity.valid && e.target.files.length) {
        const file = e?.target?.files[0];
        console.log(file?.name);

        setFileSelected(e.target.files[0].name);
        if (!file) return;

        uploadFile({ variables: { file } });
      }
    }
  };
  return (
    <div>
      <div>
        <h1>Upload File</h1>
        <input type="file" accept=".png, .jpg" onChange={handleFileChange} />
      </div>
    </div>
  );
}

export default Profile;
