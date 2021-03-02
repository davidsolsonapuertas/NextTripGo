import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";

import {
  SEND_FRIEND_REQUEST,
  UNDO_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
  DELETE_FRIEND,
} from "../../services/Users/FriendsMutations";
import {
  GET_USER_BY_USERNAME,
  GET_LOGGED_USER,
} from "../../services/Users/UsersQuery";
import { User } from "../../Interfaces/User";

interface IProps {
  userVisited: User;
  userVisiting: User;
}

function UserProfileFriendButton({ userVisited, userVisiting }: IProps) {
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    variables: { to: userVisited?.username },
    refetchQueries: (result) => [
      {
        query: GET_USER_BY_USERNAME,
        variables: { username: userVisited.username },
      },
      { query: GET_LOGGED_USER, variables: { userId: userVisiting?.id } },
    ],
  });

  function sendFriendRequestCallback() {
    sendFriendRequest();
  }

  const [undoFriendRequest] = useMutation(UNDO_FRIEND_REQUEST, {
    variables: { to: userVisited?.username },
    refetchQueries: (result) => [
      {
        query: GET_USER_BY_USERNAME,
        variables: { username: userVisited.username },
      },
      { query: GET_LOGGED_USER, variables: { userId: userVisiting.id } },
    ],
  });

  function undoFriendRequestCallback() {
    undoFriendRequest();
  }

  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST, {
    variables: { to: userVisited?.username },
    refetchQueries: (result) => [
      {
        query: GET_USER_BY_USERNAME,
        variables: { username: userVisited.username },
      },
      { query: GET_LOGGED_USER, variables: { userId: userVisiting.id } },
    ],
  });

  function acceptFriendRequestCallback() {
    acceptFriendRequest();
  }

  const [rejectFriendRequest] = useMutation(REJECT_FRIEND_REQUEST, {
    variables: { to: userVisited?.username },
    refetchQueries: (result) => [
      {
        query: GET_USER_BY_USERNAME,
        variables: { username: userVisited.username },
      },
      { query: GET_LOGGED_USER, variables: { userId: userVisiting.id } },
    ],
  });

  function rejectFriendRequestCallback() {
    rejectFriendRequest();
  }

  const [deleteFriend] = useMutation(DELETE_FRIEND, {
    variables: { to: userVisited?.username },
    refetchQueries: (result) => [
      {
        query: GET_USER_BY_USERNAME,
        variables: { username: userVisited.username },
      },
      { query: GET_LOGGED_USER, variables: { userId: userVisiting.id } },
    ],
  });

  function deleteFriendCallback() {
    deleteFriend();
  }

  return (
    <div className="Button w-100 h-50 d-flex justify-content-center">
      {typeof userVisiting?.friends?.find(
        (friend: User) => friend?.id === userVisited?.id
      ) === "undefined" &&
        userVisiting?.sentFriendRequests?.indexOf(userVisited?.id) === -1 &&
        userVisiting?.receivedFriendRequests?.indexOf(userVisited?.id) ===
          -1 && (
          <Button onClick={sendFriendRequestCallback} variant="primary">
            Send friend request
          </Button>
        )}
      {userVisiting?.receivedFriendRequests.indexOf(userVisited?.id) !== -1 && (
        <DropdownButton
          variant="secondary"
          id="dropdown-basic-button"
          title="Sent you a friend request"
        >
          <Dropdown.Item onClick={acceptFriendRequestCallback}>
            Accept
          </Dropdown.Item>
          <Dropdown.Item onClick={rejectFriendRequestCallback}>
            Reject
          </Dropdown.Item>
        </DropdownButton>
      )}
      {userVisiting?.sentFriendRequests.indexOf(userVisited?.id) !== -1 && (
        <DropdownButton
          variant="secondary"
          id="dropdown-basic-button"
          title="Friend request sent"
        >
          <Dropdown.Item onClick={undoFriendRequestCallback}>
            Undo
          </Dropdown.Item>
        </DropdownButton>
      )}
      {typeof userVisiting?.friends?.find(
        (friend: User) => friend?.id === userVisited?.id
      ) !== "undefined" && (
        <DropdownButton id="dropdown-basic-button" title="Friends">
          <Dropdown.Item onClick={deleteFriendCallback}>Unfriend</Dropdown.Item>
        </DropdownButton>
      )}
    </div>
  );
}

export default UserProfileFriendButton;
