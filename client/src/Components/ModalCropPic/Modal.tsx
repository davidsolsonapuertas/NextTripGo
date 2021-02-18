import React from 'react';
import { Modal as ProfileModal } from 'react-bootstrap';

import StyledDemo from './ImgCropper';

interface IProps {
  show: boolean;
  onCancel: () => void;
  file: string;
}

const Modal = ({ show, onCancel, file }: IProps) => {
  return (
    <div>
      <ProfileModal
        size="lg"
        show={show}
        onHide={onCancel}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ProfileModal.Header closeButton>
          <ProfileModal.Title id="example-modal-sizes-title-lg">
            Crop picture
          </ProfileModal.Title>
        </ProfileModal.Header>
        <ProfileModal.Body>
          <StyledDemo imageLink={file} />
        </ProfileModal.Body>
      </ProfileModal>
    </div>
  );
};

export default Modal;
