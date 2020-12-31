import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import '../bootstrap.css';
import './register.css';
import SearchLocationInput from '../APIs/googlemaps/searchlocationinput/SearchLocationInput';
import { useForm } from '../util/hooks';
import { Redirect } from 'react-router-dom';

function Register(props: any) {
  const [errors, setErrors]: any = useState({});

  const { onChange, onSubmit, values }: any = useForm(registerUser, {
    firstname: '',
    lastname: '',
    username: '',
    currentCity: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      props.history.push('/');
      <Redirect to="/" />;
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors);
    },
    variables: {
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      currentCity: values.currentCity,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    },
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="videos pageNoMargin">
      <div className="container pageNoMargin">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form className="user" onSubmit={onSubmit} noValidate>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className={
                            errors.firstname
                              ? 'form-control form-control-user errorRed'
                              : 'form-control form-control-user'
                          }
                          placeholder="First Name"
                          name="firstname"
                          value={values.firstname}
                          onChange={onChange}
                        />
                      </div>

                      <div className="col-sm-6">
                        <input
                          type="text"
                          className={
                            errors.lastname
                              ? 'form-control form-control-user errorRed'
                              : 'form-control form-control-user'
                          }
                          placeholder="Last Name"
                          name="lastname"
                          value={values.lastname}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className={
                            errors.username
                              ? 'form-control form-control-user errorRed'
                              : 'form-control form-control-user'
                          }
                          placeholder="Username"
                          name="username"
                          value={values.username}
                          onChange={onChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <SearchLocationInput
                          placeholder={'Current city'}
                          styles={
                            errors.username
                              ? 'form-control form-control-user errorRed'
                              : 'form-control form-control-user'
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className={
                          errors.email
                            ? 'form-control form-control-user errorRed'
                            : 'form-control form-control-user'
                        }
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          className={
                            errors.password
                              ? 'form-control form-control-user errorRed'
                              : 'form-control form-control-user'
                          }
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          onChange={onChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="password"
                          className={
                            errors.confirmPassword
                              ? 'form-control form-control-user errorRed'
                              : 'form-control form-control-user'
                          }
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                      onClick={onSubmit}
                    >
                      Create ↪
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $firstname: String!
    $lastname: String!
    $username: String!
    $currentCity: String!
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
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
