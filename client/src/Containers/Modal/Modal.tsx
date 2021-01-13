import React, { FunctionComponent, useState } from 'react';
import { Button, Modal as DeleteModal } from 'react-bootstrap';

interface IProps {
  header: string;
  acceptButtonStyle: string;
  acceptButtonText: string;
  body: string;
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: FunctionComponent<IProps> = (props) => {
  const {
    header,
    acceptButtonStyle,
    acceptButtonText,
    body,
    show,
    onCancel,
    onConfirm,
  } = props;

  return (
    <div>
      <DeleteModal show={show} onHide={onCancel}>
        <DeleteModal.Header closeButton>
          <DeleteModal.Title>{header}</DeleteModal.Title>
        </DeleteModal.Header>
        <DeleteModal.Body>{body}</DeleteModal.Body>
        <DeleteModal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
          <Button variant={acceptButtonStyle} onClick={onConfirm}>
            {acceptButtonText}
          </Button>
        </DeleteModal.Footer>
      </DeleteModal>
    </div>
  );
};

export default Modal;
