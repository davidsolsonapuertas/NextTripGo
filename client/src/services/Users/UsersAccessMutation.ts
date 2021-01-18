import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $username: String!
    $currentCity: LocationInput!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        firstname: $firstname
        lastname: $lastname
        username: $username
        currentCity: $currentCity
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      firstname
      lastname
      currentCity {
        formattedAddress
        latitude
        longitude
      }
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: FileUpload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
