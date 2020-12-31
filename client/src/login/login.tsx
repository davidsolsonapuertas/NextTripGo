import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import '../bootstrap.css';
import './login.css';
import { useForm } from '../util/hooks';

function Login(props: any) {
  const [errors, setErrors]: any = useState({});

  const { onChange, onSubmit, values }: any = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      props.history.push('/');
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors);
    },
    variables: {
      username: values.username,
      password: values.password,
    },
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="videos pageNoMargin">
      <div className="container pageNoMargin">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-login-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome back!</h1>
                  </div>
                  <form className="user" onSubmit={onSubmit} noValidate>
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
                    <div className="form-group">
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
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                      onClick={onSubmit}
                    >
                      Login ↪
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
