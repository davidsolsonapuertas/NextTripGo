import { gql } from '@apollo/client';

export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($to: String!) {
    sendFriendRequest(to: $to)
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest($to: String!) {
    acceptFriendRequest(to: $to)
  }
`;

export const REJECT_FRIEND_REQUEST = gql`
  mutation rejectFriendRequest($to: String!) {
    rejectFriendRequest(to: $to)
  }
`;

export const UNDO_FRIEND_REQUEST = gql`
  mutation undoFriendRequest($to: String!) {
    undoFriendRequest(to: $to)
  }
`;

export const DELETE_FRIEND = gql`
  mutation deleteFriend($to: String!) {
    deleteFriend(to: $to)
  }
`;
