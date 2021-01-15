import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPLOAD_FILE } from '../../services/mutationService';

interface Event<T = EventTarget> {
  target: T;
}

function Profile() {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const handleFileChange = (e: Event<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e?.target?.files[0];
      if (!file) return;
      uploadFile({ variables: { file } });
    }
  };
  return (
    <div>
      <div>
        <h1>Upload File</h1>
        <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
}

export default Profile;
